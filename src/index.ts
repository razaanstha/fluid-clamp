import postcss, { Plugin, Declaration, Result } from "postcss";
import valueParser, {
  FunctionNode,
  Node as ValueParserNode,
} from "postcss-value-parser";

/**
 * Fluid Clamp Plugin
 * Replaces @fluid(...) with calc(...) in clamp() functions.
 */
const fluidClamp = (opts = {}): Plugin => {
  const options = {
    warnings: false,
    ...opts,
  };

  return {
    postcssPlugin: "fluid-clamp",
    Declaration(decl: Declaration, { result }: { result: Result }) {
      const parsed = valueParser(decl.value);
      let hasChanges = false;

      parsed.walk((node: ValueParserNode) => {
        // Only process 'clamp' functions
        if (node.type !== "function" || node.value !== "clamp") {
          return;
        }

        const clampFunction = node;

        // Extract clamp arguments, ignoring dividers (commas)
        const clampArgs = clampFunction.nodes.filter(
          (child) => child.type !== "div"
        );

        if (clampArgs.length !== 3) {
          // Not a standard clamp function with 3 arguments
          return;
        }

        // Find @fluid(...) in the arguments
        const fluidArgIndex = clampArgs.findIndex(
          (arg) => arg.type === "function" && arg.value === "@fluid"
        );

        if (fluidArgIndex === -1) {
          // No @fluid(...) function found in clamp()
          return;
        }

        const fluidFunctionNode = clampArgs[fluidArgIndex] as FunctionNode;

        // Parse @fluid(...) arguments
        const fluidArgs: number[] = [];
        let hasInvalidArgs = false;

        fluidFunctionNode.nodes.forEach((child: ValueParserNode) => {
          if (child.type === "word") {
            const num = parseFloat(child.value);
            if (!isNaN(num) && num.toString() === child.value) {
              fluidArgs.push(num);
            } else {
              hasInvalidArgs = true;
            }
          }
        });

        // Return early if invalid arguments are found
        if (hasInvalidArgs) {
          if (options.warnings) {
            decl.warn(
              result,
              `@fluid function contains invalid numerical arguments.`
            );
          }
          return;
        }

        // Validate argument count
        if (![0, 2, 3].includes(fluidArgs.length)) {
          if (options.warnings) {
            decl.warn(
              result,
              `@fluid function requires either 0, 2, or 3 numerical arguments, but received ${fluidArgs.length}.`
            );
          }
          return;
        }

        // Validate numerical arguments
        if (
          (fluidArgs.length === 2 || fluidArgs.length === 3) &&
          fluidArgs.some((arg) => typeof arg !== "number" || isNaN(arg))
        ) {
          if (options.warnings) {
            decl.warn(
              result,
              `@fluid function contains invalid numerical arguments.`
            );
          }
          return;
        }

        // Set default values
        let minWidth = 768;
        let maxWidth = 1536;
        let baseFontSize = 16;

        if (fluidArgs.length === 2) {
          minWidth = fluidArgs[0];
          maxWidth = fluidArgs[1];
        } else if (fluidArgs.length === 3) {
          minWidth = fluidArgs[0];
          maxWidth = fluidArgs[1];
          baseFontSize = fluidArgs[2];
        }

        // Parse minFontSize and maxFontSize from clamp()
        const minFontSizeNode = clampArgs[0];
        const maxFontSizeNode = clampArgs[2];

        const minFontSize = parseSize(minFontSizeNode.value);
        const maxFontSize = parseSize(maxFontSizeNode.value);

        if (minFontSize === null || maxFontSize === null) {
          // Cannot parse font sizes, skip processing
          return;
        }

        const sizeDifference = maxFontSize - minFontSize;
        const widthDifference = maxWidth - minWidth;

        if (widthDifference === 0) {
          // Replace @fluid(...) with baseFontSize px
          const fluidValue = `${baseFontSize}px`;

          // Replace the @fluid(...) function node with the fluidValue
          // Change the node to 'word' type and set its value
          (fluidFunctionNode as any).type = "word"; // Type assertion
          fluidFunctionNode.value = fluidValue;
          delete (fluidFunctionNode as any).nodes;

          if (options.warnings) {
            decl.warn(
              result,
              `minScreen (${minWidth}px) and maxScreen (${maxWidth}px) are equal. Using minSize (${baseFontSize}px).`
            );
          }

          hasChanges = true;
          return;
        }

        // Calculate slope and intercept
        const slope = sizeDifference / widthDifference;
        const intercept = minFontSize - slope * minWidth;

        const slopeVw = parseFloat((slope * 100).toFixed(5)); // e.g., 0.02083 -> 2.08333vw
        const interceptPx = parseFloat(intercept.toFixed(5)); // e.g., 0px

        const fluidValue = `calc(${interceptPx}px + ${slopeVw}vw)`;

        // Replace the @fluid(...) function node with the fluidValue
        (fluidFunctionNode as any).type = "word"; // Type assertion
        fluidFunctionNode.value = fluidValue;
        delete (fluidFunctionNode as any).nodes;

        hasChanges = true;
      });

      if (hasChanges) {
        decl.value = parsed.toString();
      }
    },
  };
};

/**
 * Parses a size string and returns its value in pixels.
 * Supports 'px', 'rem', and 'em' units.
 * Assumes 1rem = 16px and 1em = 16px.
 * Returns null if parsing fails or unit is unsupported.
 *
 * @param {string} value - The size string to parse (e.g., '1rem', '16px').
 * @returns {number | null} The size in pixels or null if invalid.
 */
function parseSize(value: string): number | null {
  const regex = /^([\d.]+)(px|rem|em)$/;
  const match = value.trim().match(regex);
  if (!match) return null;

  const num = parseFloat(match[1]);
  const unit = match[2];

  switch (unit) {
    case "px":
      return num;
    case "rem":
    case "em":
      return num * 16; // Assuming 1rem = 16px
    default:
      return null;
  }
}

fluidClamp.postcss = true;
fluidClamp.postcssPlugin = "fluid-clamp";

export default fluidClamp;

import { Plugin } from 'postcss';

/**
 * Interface for plugin options.
 */
interface FluidClampOptions {
    /**
     * Enable or disable warnings.
     * @default false
     */
    warnings?: boolean;
    /**
     * Minimum screen width in pixels for fluid calculations.
     * @default 768
     */
    minWidth?: number;
    /**
     * Maximum screen width in pixels for fluid calculations.
     * @default 1536
     */
    maxWidth?: number;
    /**
     * Base font size in pixels.
     * @default 16
     */
    baseFontSize?: number;
}
/**
 * Fluid Clamp Plugin
 * Replaces @fluid(...) with calc(...) in clamp() functions.
 */
declare const fluidClamp: {
    (opts?: FluidClampOptions): Plugin;
    postcss: boolean;
    postcssPlugin: string;
};

export { fluidClamp as default };

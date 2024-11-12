import postcss from "postcss";
import fluidClamp from "../../dist/index";
import { describe, it, expect, beforeEach, afterEach } from "@jest/globals";

describe("Fluid Clamp Test", () => {
  // Mock console methods to suppress warnings during tests
  let consoleWarnMock: jest.SpyInstance;
  let consoleLogMock: jest.SpyInstance;

  beforeEach(() => {
    consoleWarnMock = jest.spyOn(console, "warn").mockImplementation(() => {});
    consoleLogMock = jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleWarnMock.mockRestore();
    consoleLogMock.mockRestore();
  });

  it("should process @fluid in clamp function with default options", async () => {
    const input = `
      .test {
        font-size: clamp(1rem, @fluid(), 2rem);
      }
    `;

    const expected = `
      .test {
        font-size: clamp(1rem, calc(0px + 2.08333vw), 2rem);
      }
    `;

    const result = await postcss([fluidClamp()]).process(input, {
      from: undefined,
    });

    expect(result.css.trim()).toBe(expected.trim());
    expect(result.warnings()).toHaveLength(0);
  });

  it("should handle @fluid with two arguments (custom minWidth and maxWidth)", async () => {
    const input = `
      .test {
        font-size: clamp(1rem, @fluid(320, 1024), 2rem);
      }
    `;

    const expected = `
      .test {
        font-size: clamp(1rem, calc(8.72727px + 2.27273vw), 2rem);
      }
    `;

    const result = await postcss([fluidClamp({ warnings: true })]).process(
      input,
      {
        from: undefined,
      }
    );

    expect(result.css.trim()).toBe(expected.trim());
    expect(result.warnings()).toHaveLength(0);
  });

  it("should handle @fluid with three arguments (custom minWidth, maxWidth, and baseFontSize)", async () => {
    const input = `
      .test {
        font-size: clamp(1rem, @fluid(320, 1024, 16), 2rem);
      }
    `;

    const expected = `
      .test {
        font-size: clamp(1rem, calc(8.72727px + 2.27273vw), 2rem);
      }
    `;

    const result = await postcss([fluidClamp({ warnings: true })]).process(
      input,
      {
        from: undefined,
      }
    );

    expect(result.css.trim()).toBe(expected.trim());
    expect(result.warnings()).toHaveLength(0);
  });

  it("should handle pixel values with @fluid()", async () => {
    const input = `
      .test {
        font-size: clamp(16px, @fluid(), 32px);
      }
    `;

    const expected = `
      .test {
        font-size: clamp(16px, calc(0px + 2.08333vw), 32px);
      }
    `;

    const result = await postcss([fluidClamp({ warnings: true })]).process(
      input,
      {
        from: undefined,
      }
    );

    expect(result.css.trim()).toBe(expected.trim());
    expect(result.warnings()).toHaveLength(0);
  });

  it("should handle invalid input gracefully (non-numerical arguments)", async () => {
    const input = `
      .test {
        font-size: clamp(1rem, @fluid(320, 22rq3112), 2rem);
      }
    `;

    const expected = `
      .test {
        font-size: clamp(1rem, @fluid(320, 22rq3112), 2rem);
      }
    `;

    const result = await postcss([fluidClamp({ warnings: true })]).process(
      input,
      {
        from: undefined,
      }
    );

    expect(result.css.trim()).toBe(expected.trim());
    expect(result.warnings()).toHaveLength(1);
    expect(result.warnings()[0].text).toMatch(
      /@fluid function contains invalid numerical arguments/
    );
  });

  it("should handle incorrect number of arguments in @fluid (e.g., one argument)", async () => {
    const input = `
      .test {
        font-size: clamp(1rem, @fluid(320), 2rem);
      }
    `;

    const expected = `
      .test {
        font-size: clamp(1rem, @fluid(320), 2rem);
      }
    `;

    const result = await postcss([fluidClamp({ warnings: true })]).process(
      input,
      {
        from: undefined,
      }
    );

    expect(result.css.trim()).toBe(expected.trim());
    expect(result.warnings()).toHaveLength(1);
    expect(result.warnings()[0].text).toMatch(
      /@fluid function requires either 0, 2, or 3 numerical arguments/
    );
  });

  it("should handle incorrect number of arguments in @fluid (e.g., four arguments)", async () => {
    const input = `
      .test {
        font-size: clamp(1rem, @fluid(320, 1024, 16, 24), 2rem);
      }
    `;

    const expected = `
      .test {
        font-size: clamp(1rem, @fluid(320, 1024, 16, 24), 2rem);
      }
    `;

    const result = await postcss([fluidClamp({ warnings: true })]).process(
      input,
      {
        from: undefined,
      }
    );

    expect(result.css.trim()).toBe(expected.trim());
    expect(result.warnings()).toHaveLength(1);
    expect(result.warnings()[0].text).toMatch(
      /@fluid function requires either 0, 2, or 3 numerical arguments/
    );
  });

  it("should replace multiple @fluid instances correctly", async () => {
    const input = `
      .test1 {
        font-size: clamp(1rem, @fluid(), 2rem);
      }
      .test2 {
        margin: clamp(10px, @fluid(320, 1024, 16), 20px);
      }
      .test3 {
        padding: clamp(0.5rem, @fluid(400, 1200), 1rem);
      }
    `;

    const expected = `
      .test1 {
        font-size: clamp(1rem, calc(0px + 2.08333vw), 2rem);
      }
      .test2 {
        margin: clamp(10px, calc(5.45455px + 1.42045vw), 20px);
      }
      .test3 {
        padding: clamp(0.5rem, calc(4px + 1vw), 1rem);
      }
    `;

    const result = await postcss([fluidClamp({ warnings: true })]).process(
      input,
      {
        from: undefined,
      }
    );

    expect(result.css.trim()).toBe(expected.trim());
    expect(result.warnings()).toHaveLength(0);
  });

  it("should handle edge case with minScreen equals maxScreen", async () => {
    const input = `
      .test {
        font-size: clamp(1rem, @fluid(768, 768, 16), 2rem);
      }
    `;

    // According to the plugin, if minScreen == maxScreen, use minSize
    const expected = `
      .test {
        font-size: clamp(1rem, 16px, 2rem);
      }
    `;

    const result = await postcss([fluidClamp({ warnings: true })]).process(
      input,
      {
        from: undefined,
      }
    );

    expect(result.css.trim()).toBe(expected.trim());
    expect(result.warnings()).toHaveLength(1);
    expect(result.warnings()[0].text).toMatch(
      /minScreen \(768px\) and maxScreen \(768px\) are equal\. Using minSize \(16px\)\./
    );
  });

  it("should ignore declarations without @fluid", async () => {
    const input = `
      .test {
        font-size: clamp(1rem, 1.5rem, 2rem);
      }
    `;

    const expected = `
      .test {
        font-size: clamp(1rem, 1.5rem, 2rem);
      }
    `;

    const result = await postcss([fluidClamp({ warnings: true })]).process(
      input,
      {
        from: undefined,
      }
    );

    expect(result.css.trim()).toBe(expected.trim());
    expect(result.warnings()).toHaveLength(0);
  });
});

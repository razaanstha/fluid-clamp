import { Plugin } from 'postcss';

/**
 * Fluid Clamp Plugin
 * Replaces @fluid(...) with calc(...) in clamp() functions.
 */
declare const fluidClamp: {
    (opts?: {}): Plugin;
    postcss: boolean;
    postcssPlugin: string;
};

export { fluidClamp as default };

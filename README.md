# fluid-clamp

Transform complex fluid typography into simple, elegant code 

```html
<!-- Write beautiful, intuitive code -->
<h1 class="text-[clamp(2rem,@fluid(320,1024),4rem)]">
  Clean, Maintainable Typography
</h1>

<!-- Instead of mind-bending calculations -->
<h1 class="text-[clamp(2rem,calc(8.72727px + 2.27273vw),4rem)]">
  Complex, Error-Prone Typography
</h1>
```

<!-- 
  What @fluid() handles for you:
  • Precise fluid scaling
  • Viewport-based calculations
  • Perfect typography at any screen size
-->

## What is Fluid Typography?

Fluid typography creates smooth, responsive text that automatically scales based on viewport width. Instead of using fixed breakpoints, it provides seamless scaling that maintains perfect typography at any screen size.

## Installation

```bash
# npm
npm install -D fluid-clamp

# yarn
yarn add -D fluid-clamp

# pnpm
pnpm add -D fluid-clamp

# bun
bun add -D fluid-clamp
```

## Quick Start

```js
// postcss.config.js
module.exports = {
  plugins: [
    require('postcss-import'),    // optional
    require('postcss-nested'),    // optional
    require('tailwindcss'),
    require('fluid-clamp')({
      // These are the default values
      minWidth: 768,    // default minimum viewport width
      maxWidth: 1536,   // default maximum viewport width
      baseFontSize: 16  // default base font size
    }),
    require('autoprefixer')
  ]
}
```

## Usage

### Basic Syntax
```css
/* Default viewport range (768px - 1536px) */
font-size: clamp(1rem,@fluid(),2rem);

/* Custom viewport range (320px - 1024px) */
font-size: clamp(1rem,@fluid(320,1024),2rem);

/* With custom base font size (16px) */
font-size: clamp(1rem,@fluid(320,1024,16),2rem);
```

### With Tailwind CSS

```html
<!-- Typography with default range (768px - 1536px) -->
<h1 class="text-[clamp(2rem,@fluid(),4rem)]">
  Fluid Header
</h1>

<!-- Typography with custom range -->
<h1 class="text-[clamp(2rem,@fluid(320,1024),4rem)]">
  Fluid Header
</h1>

<!-- Spacing -->
<div class="p-[clamp(1rem,@fluid(320,1024),2rem)]">
  Fluid Padding
</div>

<!-- Line Height -->
<p class="leading-[1.5] text-[clamp(1rem,@fluid(),2rem)]">
  Fluid Text
</p>

<!-- Multiple Properties -->
<section class="
  text-[clamp(1rem,@fluid(320,1024),2rem)]
  p-[clamp(1rem,@fluid(320,1024),3rem)]
  my-[clamp(2rem,@fluid(320,1024),6rem)]
">
  Fluid Everything
</section>
```

## Configuration

### Global Defaults

You can customize the default values in your PostCSS config:

```js
// postcss.config.js
module.exports = {
  plugins: [
    require('fluid-clamp')({
      // Default viewport range
      minWidth: 375,    // iPhone SE width
      maxWidth: 1920,   // Wide desktop
      baseFontSize: 16, // Browser default
      warnings: false
    })
  ]
}
```

### Per-Usage Parameters
#### minWidth (optional)
- The viewport width where fluid scaling starts
- Use unitless number (in pixels)
- Default: `768` (typical tablet breakpoint)
- Example: `@fluid(320, 1024)` starts scaling at 320 pixels

#### maxWidth (optional)
- The viewport width where fluid scaling stops
- Use unitless number (in pixels)
- Default: `1536` (typical large desktop breakpoint)
- Example: `@fluid(320, 1024)` stops scaling at 1024 pixels

#### baseFontSize (optional)
- Used for rem/em to px conversions
- Use unitless number (in pixels)
- Default: `16` (browser default)
- Example: `@fluid(320, 1024, 18)` uses 18 pixels as base

### Real-World Examples

```html
<!-- Mobile-first approach -->
<h1 class="
  text-[clamp(2rem,@fluid(375,1920),5rem)]
  md:text-[clamp(2.5rem,@fluid(768,1920),6rem)]
  xl:text-[clamp(3rem,@fluid(1280,1920),7rem)]
">
  Responsive Header
</h1>

<!-- Different ranges for different properties -->
<section class="
  px-[clamp(1rem,@fluid(375,768),2rem)]
  py-[clamp(2rem,@fluid(375,1024),4rem)]
  text-[clamp(1rem,@fluid(375,1920),1.25rem)]
">
  Content with varied fluid ranges
</section>

<!-- Custom base font size -->
<div class="
  text-[clamp(0.875rem,@fluid(375,1024,18),1rem)]
">
  Text with 18px base
</div>
```

### Common Device Breakpoints

```css
/* iPhone SE → iPad Mini */
.mobile {
  font-size: clamp(1rem, @fluid(375, 768), 1.5rem);
}

/* iPad Mini → MacBook Air */
.tablet {
  font-size: clamp(1.5rem, @fluid(768, 1366), 2rem);
}

/* MacBook Air → 4K Displays */
.desktop {
  font-size: clamp(2rem, @fluid(1366, 2560), 4rem);
}
```

### Recommended Ranges

| Device Category | minWidth | maxWidth | Use Case |
|----------------|----------|----------|----------|
| Mobile First | 375px | 1920px | General responsive design |
| Tablet Up | 768px | 1920px | Desktop-focused sites |
| Compact | 375px | 1366px | Web applications |
| Expansive | 375px | 2560px | Large-screen experiences |

## Browser Support

Works in all modern browsers that support CSS `clamp()`:
- Chrome 79+
- Firefox 75+
- Safari 13.1+
- Edge 79+

## Framework Integration

### Next.js
```js
// postcss.config.js
module.exports = {
  plugins: [
    require('postcss-import'),    // optional
    require('postcss-nested'),    // optional
    require('tailwindcss'),
    require('fluid-clamp')({
      // Using default values
      minWidth: 768,     // tablet breakpoint
      maxWidth: 1536,    // desktop breakpoint
      baseFontSize: 16   // browser default
    }),
    require('autoprefixer')
  ]
}
```

### Vite
```js
// vite.config.js
// If using TypeScript, add to your dependencies first:
// npm install -D fluid-clamp

// Using ESM import
import fluidClamp from 'fluid-clamp'
// OR using CommonJS require (note the .default)
const fluidClamp = require('fluid-clamp').default

export default {
  css: {
    postcss: {
      plugins: [
        require('postcss-import'),    // optional
        require('postcss-nested'),    // optional
        require('tailwindcss'),
        fluidClamp({
          // Using default values
          minWidth: 768,     // tablet breakpoint
          maxWidth: 1536,    // desktop breakpoint
          baseFontSize: 16   // browser default
        }),
        require('autoprefixer')
      ]
    }
  }
}
```

### Webpack
```js
// webpack.config.js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('postcss-import'),    // optional
                  require('postcss-nested'),    // optional
                  require('tailwindcss'),
                  require('fluid-clamp')({
                    // Using default values
                    minWidth: 768,     // tablet breakpoint
                    maxWidth: 1536,    // desktop breakpoint
                    baseFontSize: 16   // browser default
                  }),
                  require('autoprefixer')
                ]
              }
            }
          }
        ]
      }
    ]
  }
}
```

### Laravel Mix
```js
// webpack.mix.js
mix.postCss("src/app.css", "build/", [
  require('postcss-import'),    // optional
  require('postcss-nested'),    // optional
  require('tailwindcss'),
  require('fluid-clamp')({
    // Using default values
    minWidth: 768,     // tablet breakpoint
    maxWidth: 1536,    // desktop breakpoint
    baseFontSize: 16   // browser default
  }),
  require('autoprefixer')
]);
```

## Plugin Options

```js
require('fluid-clamp')({
  warnings: false,    // Disable warning messages (default: false)
  minWidth: 768,     // Minimum viewport width in pixels (default: 768)
  maxWidth: 1536,    // Maximum viewport width in pixels (default: 1536)
  baseFontSize: 16   // Base font size in pixels (default: 16)
})
```

## Supported Units

- `px` - Pixels
- `rem` - Root em units

## Contributing

We welcome contributions! Please feel free to submit a Pull Request.

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Development

### Test Coverage

The plugin can be thoroughly tested by running `bun run test`:

```bash
$ bun run test
 PASS  src/__tests__/index.test.ts
  Fluid Clamp Test
    ✓ should process @fluid in clamp function with default options
    ✓ should handle @fluid with two arguments (custom minWidth and maxWidth)
    ✓ should handle @fluid with three arguments (custom minWidth, maxWidth, and baseFontSize)
    ✓ should handle pixel values with @fluid()
    ✓ should handle invalid input gracefully (non-numerical arguments)
    ✓ should handle incorrect number of arguments in @fluid (e.g., one argument)
    ✓ should handle incorrect number of arguments in @fluid (e.g., four arguments)
    ✓ should replace multiple @fluid instances correctly
    ✓ should handle edge case with minScreen equals maxScreen
    ✓ should ignore declarations without @fluid

Test Suites: 1 passed, 1 total
Tests:       10 passed, 10 total
Snapshots:   0 total
```

> Note: This documentation was automatically generated by AI based on the source code and test results of the fluid-clamp plugin.

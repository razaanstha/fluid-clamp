# fluid-clamp

A PostCSS plugin that makes fluid typography simple. Perfect for Tailwind CSS arbitrary values.

```html
<!-- Write this -->
<h1 class="text-[clamp(2rem,@fluid(320,1024),4rem)]">
  Fluid Typography
</h1>

<!-- Instead of this -->
<h1 class="text-[clamp(2rem,calc(8.72727px+2.27273vw),4rem)]">
  Fluid Typography
</h1>
```

## Installation

```bash
npm install fluid-clamp
yarn add fluid-clamp
pnpm add fluid-clamp
bun add fluid-clamp
```

## Quick Start

```js
// postcss.config.js
module.exports = {
  plugins: [
    require('tailwindcss'),
    require('fluid-clamp'),
    require('autoprefixer')
  ]
}
```

## Usage

### Basic Syntax
```css
/* Default viewport range (768px - 1536px) */
font-size: clamp(1rem, @fluid(), 2rem);

/* Custom viewport range (320px - 1024px) */
font-size: clamp(1rem, @fluid(320, 1024), 2rem);

/* With custom base font size (16px) */
font-size: clamp(1rem, @fluid(320, 1024, 16), 2rem);
```

### With Tailwind CSS

```html
<!-- Typography -->
<h1 class="text-[clamp(2rem,@fluid(320,1024),4rem)]">
  Fluid Header
</h1>

<!-- Spacing -->
<div class="p-[clamp(1rem,@fluid(320,1024),2rem)]">
  Fluid Padding
</div>

<!-- Line Height -->
<p class="text-[clamp(1rem,@fluid(),2rem)]/[1.5]">
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

## Framework Integration

### Next.js
```js
// postcss.config.js
module.exports = {
  plugins: ['tailwindcss', 'fluid-clamp', 'autoprefixer']
}
```

### Vite
```js
// vite.config.js
import fluidClamp from 'fluid-clamp'

export default {
  css: {
    postcss: {
      plugins: [fluidClamp()]
    }
  }
}
```

### Webpack
```js
// webpack.config.js
{
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      plugins: [require('fluid-clamp')]
    }
  }
}
```

## Plugin Options

```js
require('fluid-clamp')({
  warnings: false  // Disable warning messages (default: false)
})
```

## Supported Units

- `px` - Pixels
- `rem` - Root em units

## Browser Support

Requires browsers that support:
- `clamp()` - [Can I use clamp()](https://caniuse.com/css-clamp)
- `calc()` - [Can I use calc()](https://caniuse.com/calc)

## License

MIT © [Rajan Shrestha](https://github.com/razaanstha)

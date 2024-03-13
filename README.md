# Example lit + tailwind + postcss project

This is an example project using
[tailwind](https://github.com/tailwindlabs/tailwindcss) styles
inside [lit](https://lit.dev) components via postcss.

To achieve this, we have used the following:

- esbuild to bundle the project
- import assertions to import our CSS
- postcss to transform the CSS (with tailwind)
- typescript for type checking

## Bundling

We chose to use a bundler so we're able to resolve imports (such as the
lit import). Alternatively, you could use some tooling to produce an import
map, or a CDN for your dependencies.

## Import assertions

These will soon be replaced as the standard was recently reworked into one now
called "import attributes".

When that change happens (i.e. is available in typescript and browsers), the
code will change to look more like this:

```ts
import styles from './hello-world.css' with {type: 'css'};
```

## Process/ordering

The overall process, in order, is as follows:

1. Run typescript for type checking
2. Run esbuild to bundle the typescript and _copy_ the imported css files as-is
3. Run postcss (tailwind) on the CSS files esbuild copied across

## Interpolation

Often, you may want to interpolate something into your CSS like so:

```ts
class MyElement extends LitElement {
  static styles = css`
    div {
      color: ${brandColour};
    }
  `;
}
```

Moving forward, the suggestion is to instead use CSS variables like so:

`my-element.css`:

```css
div {
  color: var(--brand-color);
}
```

`theme.css`:

```css
:host {
  --brand-color: hotpink;
}
```

`my-element.ts`:

```ts
import styles from './my-element.css' assert {type: 'css'};
import theme from './theme.css' assert {type: 'css'};

class MyElement extends LitElement {
  static styles = [
    theme,
    styles
  `;
}
```

For cases where you need to compute something more complex (like ranges of
colours, math calculations, etc), you could specify that stylesheet in JS:

```ts
// theme.ts
export const theme = css`
  :host {
    background: linear-gradient(${computedGradient});
  }
`;
```

Which wouldn't benefit from postcss processing, but that should be fine if you
tightly scope it to expressions/variables.

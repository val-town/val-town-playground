# Val Town Playground

Embed a val.town playground in your website.

<img width="699" alt="bce075c7644468c59f0a5fc85e03517992948a417dbd2eb8739fe44b7e50ce73" src="https://github.com/pomdtr/val-town-playground/assets/17577332/f1ee0460-2d5f-425a-bdc7-b7325796c90c">

## Usage

```html
<!doctype html>
<html>
  <head>
    <title>vt-playground</title>
    <script type="module" src="dist/vt-playground.js"></script>
  </head>
  <body>
    <vt-playground id="playground" code="console.log('hello world')"></vt-playground>
  </body>
</html>
```

## API

### Attributes

- `code`: The code to be executed in the playground. The value of this attribute will be updated when the code changes in the playground.
- `val`: A val to load in the playground.

### Events

- `code-change`: Fired when the code changes. The event detail contains the new code.

## Development

```bash
npm run dev # Start the development server
npm run build # Build the web component
```

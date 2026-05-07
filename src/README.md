### Srcery assets source code

#### Swatch script

Script to generate swatch images (small square fully colored images referenced
in tables)

```js
// Default size is 24x24
pnpm run swatch

// Custom size
pnpm run swatch -- 50
```

#### SVG
Don't modify `logo_border.svg` in this directory. It's the old version of the
logo (palette v1), there are still projects referencing this asset in this
location.

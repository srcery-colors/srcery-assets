#!/usr/bin/env node

import sharp from "sharp"
import { mkdirSync } from "fs"
import palette from "@srcery-colors/srcery-palette"

/**
 * srcery asset swatch generator script
 *
 * this script generates swatches for the srcery colors for use in readmes and
 * other places where we need a jpg filled with a color
 *
 * usage: node swatch.mjs [size]
 */

"use strict";

const OUTPUT_DIR = "./swatch"
const DEFAULT_SIZE = 24

const size = parseInt(process.argv[2]) || DEFAULT_SIZE

if (isNaN(size) || size <= 0) {
  console.error("usage: pnpm swatch [size]")
  process.exit(1)
}

mkdirSync(OUTPUT_DIR, { recursive: true })

await Promise.all(
  Object.entries(palette).map(async ([key, color]) => {
    const [r, g, b] = color.rgb
    return sharp({
      create: {
        width: size,
        height: size,
        channels: 3,
        background: { r, g, b },
      },
    })
      .jpeg()
      .toFile(`${OUTPUT_DIR}/${key}_${size}.jpg`)
      .then(() => console.log(`created: ${OUTPUT_DIR}/${key}_${size}.jpg`))
  })
)


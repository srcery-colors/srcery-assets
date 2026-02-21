#!/usr/bin/env node

/**
 * srcery asset swatch generator script
 *
 * this script generates swatches for the srcery colors for use in readmes and
 * other places where we need a jpg filled with a color
 *
 * usage: node swatch.mjs
 */

"use strict";

import sharp from "sharp"
import { mkdirSync } from "fs"
import palette from "@srcery-colors/srcery-palette";

const OUTPUT_DIR = "./swatch"

mkdirSync(OUTPUT_DIR, { recursive: true })

await Promise.all(
  Object.entries(palette).map(async ([key, color]) => {
    const [r, g, b] = color.rgb
    return sharp({
      create: {
        width: 50,
        height: 50,
        channels: 3,
        background: { r, g, b },
      },
    })
      .jpeg()
      .toFile(`${OUTPUT_DIR}/${key}.jpg`)
      .then(() => console.log(`created: ${OUTPUT_DIR}/${key}.jpg`))
  })
)

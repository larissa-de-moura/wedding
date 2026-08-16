#!/usr/bin/env python3
"""Resize + compress a photo for web use.

Usage:
    python3 scripts/optimize_image.py <input> <output> [--width 2000] [--quality 80]

Example (regenerate the hero image after swapping in a new photo):
    python3 scripts/optimize_image.py images/originals/hero-original.jpeg images/hero.jpg
"""
import argparse
from pathlib import Path

from PIL import Image, ImageOps


def optimize(input_path, output_path, max_width, quality):
    img = Image.open(input_path)
    img = ImageOps.exif_transpose(img)  # respect camera rotation
    if img.mode != "RGB":
        img = img.convert("RGB")

    if img.width > max_width:
        new_height = round(img.height * (max_width / img.width))
        img = img.resize((max_width, new_height), Image.LANCZOS)

    output_path = Path(output_path)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    img.save(output_path, "JPEG", quality=quality, optimize=True, progressive=True)

    before = Path(input_path).stat().st_size / 1024
    after = output_path.stat().st_size / 1024
    print(f"{input_path} ({before:.0f} KB, {Image.open(input_path).size}) "
          f"-> {output_path} ({after:.0f} KB, {img.size})")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("input")
    parser.add_argument("output")
    parser.add_argument("--width", type=int, default=2000)
    parser.add_argument("--quality", type=int, default=80)
    args = parser.parse_args()
    optimize(args.input, args.output, args.width, args.quality)

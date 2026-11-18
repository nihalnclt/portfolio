"""Build the extension icons from a logo image on a black background.

Usage: python3 -I make-icons.py "/path/to/logo.png" [preview.png]

Copies the logo to icons/logo-source.png, drops the image generator's small grey
corner sparkle if present, centres the artwork on a rounded black tile with
transparent corners, and writes icons/icon{16,32,48,128}.png.
"""
import os
import shutil
import sys

from PIL import Image, ImageDraw

here = os.path.dirname(os.path.abspath(__file__))
icons = os.path.join(here, 'icons')
src = sys.argv[1]
shutil.copyfile(src, os.path.join(icons, 'logo-source.png'))

im = Image.open(src).convert('RGB')
W, H = im.size

# Blank neutral-grey pixels in the bottom-right corner only (generator mark),
# leaving coloured and pure-white artwork untouched.
px = im.load()
blanked = 0
for y in range(int(H * 0.86), H):
    for x in range(int(W * 0.86), W):
        r, g, b = px[x, y]
        if max(r, g, b) - min(r, g, b) < 28 and 20 < max(r, g, b) < 215:
            px[x, y] = (0, 0, 0)
            blanked += 1

bbox = im.convert('L').point(lambda v: 255 if v > 40 else 0).getbbox()
x0, y0, x1, y1 = bbox
w, h = x1 - x0, y1 - y0
side = int(max(w, h) / 0.80)  # artwork fills 80% of the tile
tile = Image.new('RGB', (side, side), (0, 0, 0))
tile.paste(im.crop(bbox), ((side - w) // 2, (side - h) // 2))
tile = tile.convert('RGBA')

S = 2
mask = Image.new('L', (side * S, side * S), 0)
ImageDraw.Draw(mask).rounded_rectangle((0, 0, side * S - 1, side * S - 1), radius=int(side * 0.22) * S, fill=255)
tile.putalpha(mask.resize((side, side), Image.LANCZOS))

for s in (16, 32, 48, 128):
    tile.resize((s, s), Image.LANCZOS).save(os.path.join(icons, f'icon{s}.png'))
if len(sys.argv) > 2:
    tile.resize((384, 384), Image.LANCZOS).save(sys.argv[2])
print(f'source {W}x{H}, art bbox {bbox}, corner pixels blanked {blanked}')

"""
Local-only cutout tool. Crops named regions out of source renders and removes
the background with rembg, writing transparent PNGs to ./generated/cutouts/.

Usage:
  python scripts/cutout.py            # all character cutouts
  python scripts/cutout.py icons      # strip backgrounds from generated/icon-*.png + sticker-*.png
"""
import sys
from pathlib import Path
from PIL import Image
from rembg import remove, new_session

ROOT = Path(__file__).resolve().parent.parent
SRC_USER = ROOT / "source-assets" / "user"
GEN = ROOT / "generated"
OUT = GEN / "cutouts"
OUT.mkdir(parents=True, exist_ok=True)

session = new_session("isnet-general-use")

# name -> (source file, crop box in original pixels or None)
CHARACTERS = {
    "doof-red": (SRC_USER / "DT_Thumbnail_Base.png", (800, 420, 1780, 1460)),
    "doof-yellow-spots": (SRC_USER / "DT_Thumbnail_Landscape.png", (225, 770, 585, 1270)),
    "doof-pink": (SRC_USER / "DT_Thumbnail_Landscape.png", (560, 780, 830, 1195)),
    "doof-green": (SRC_USER / "DT_Thumbnail_Landscape.png", (1265, 720, 1600, 1185)),
    "doof-purple": (SRC_USER / "DT_Thumbnail_Landscape.png", (1520, 760, 1970, 1275)),
    "doof-blue-small": (SRC_USER / "DT_Thumbnail_Landscape.png", (735, 480, 910, 685)),
    "doof-lightblue-small": (SRC_USER / "DT_Thumbnail_Landscape.png", (1580, 530, 1745, 745)),
}


def cut(name: str, src: Path, box):
    img = Image.open(src).convert("RGBA")
    if box:
        img = img.crop(box)
    out = remove(img, session=session, alpha_matting=True,
                 alpha_matting_foreground_threshold=240,
                 alpha_matting_background_threshold=10,
                 alpha_matting_erode_size=8)
    # trim transparent margins
    bbox = out.getbbox()
    if bbox:
        out = out.crop(bbox)
    out.save(OUT / f"{name}.png")
    print(f"ok  {name} {out.size}")


PREFIXES = ("icon-", "sticker-", "hero-buildings-", "dust-cloud", "bg-speedlines")


def has_alpha(img: Image.Image) -> bool:
    """True when at least 5% of pixels are already (near) transparent."""
    a = img.getchannel("A")
    hist = a.histogram()
    transparent = sum(hist[:16])
    return transparent / (img.width * img.height) > 0.05


def strip_generated():
    for p in sorted(GEN.glob("*.png")):
        if not p.name.startswith(PREFIXES):
            continue
        img = Image.open(p).convert("RGBA")
        if has_alpha(img):
            out = img
            note = "kept alpha"
        else:
            out = remove(img, session=session)
            note = "rembg"
        bbox = out.getbbox()
        if bbox:
            out = out.crop(bbox)
        out.save(OUT / p.name)
        print(f"ok  {p.name} {out.size} ({note})")


if __name__ == "__main__":
    if "icons" in sys.argv:
        strip_generated()
    else:
        only = [a for a in sys.argv[1:] if a in CHARACTERS]
        for name, (src, box) in CHARACTERS.items():
            if only and name not in only:
                continue
            cut(name, src, box)

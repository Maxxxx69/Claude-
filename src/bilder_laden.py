#!/usr/bin/env python3
"""Lädt die Werkabbildungen (Feld bild_url in works.js) nach bilder/<id>.jpg.

Aufruf:  python3 src/bilder_laden.py            # lädt nur fehlende Bilder
         python3 src/bilder_laden.py --neu      # lädt alle neu
Danach src/build.sh erneut ausführen – die Bilder ersetzen die Platzhalter automatisch.
Eigene Bilder: einfach als bilder/<id>.jpg (oder .png) ablegen, z. B. bilder/estes_booths.jpg.
"""
import io
import json
import subprocess
import sys
import urllib.request
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "bilder"
UA = "Schulreferat-Fotorealismus/1.0 (Bildungszwecke)"


def works():
    js = "console.log(JSON.stringify(require(process.argv[1])))"
    raw = subprocess.check_output(["node", "-e", js, str(ROOT / "src" / "works.js")])
    return json.loads(raw)


def main():
    OUT.mkdir(exist_ok=True)
    neu = "--neu" in sys.argv
    ok, fehl = 0, []
    for wid, w in works().items():
        ziel = OUT / f"{wid}.jpg"
        if ziel.exists() and not neu:
            continue
        url = w.get("bild_url")
        if not url:
            fehl.append((wid, "keine bild_url"))
            continue
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            data = urllib.request.urlopen(req, timeout=40).read()
            im = Image.open(io.BytesIO(data)).convert("RGB")
            im.thumbnail((2200, 2200))
            im.save(ziel, "JPEG", quality=88)
            ok += 1
            print(f"OK    {wid}  {im.size[0]}×{im.size[1]}")
        except Exception as e:  # noqa: BLE001
            fehl.append((wid, str(e)))
    for wid, grund in fehl:
        print(f"FEHLT {wid}: {grund}")
    print(f"{ok} geladen, {len(fehl)} fehlen")


if __name__ == "__main__":
    main()

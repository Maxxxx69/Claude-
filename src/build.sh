#!/usr/bin/env bash
# Baut Präsentation + Handout, prüft sie und rendert Vorschaubilder.
# Variablen: NODE_PATH (pptxgenjs, sharp, react-icons), SKILLS (Ordner mit pptx/ und docx/), RENDER (Ausgabeordner)
set -euo pipefail
cd "$(dirname "$0")/.."
: "${RENDER:=render}"
export PPTX_SKILL="$SKILLS/pptx"
node src/build_deck.js
node src/build_handout.js
python3 "$SKILLS/pptx/scripts/office/validate.py" Fotorealismus_Hyperrealismus.pptx
python3 "$SKILLS/docx/scripts/office/validate.py" Handout_Fotorealismus_Hyperrealismus.docx
mkdir -p "$RENDER"
rm -f "$RENDER"/*.pdf "$RENDER"/slide-*.jpg "$RENDER"/page-*.jpg
python3 "$SKILLS/pptx/scripts/office/soffice.py" --headless --convert-to pdf --outdir "$RENDER" Fotorealismus_Hyperrealismus.pptx >/dev/null 2>&1
python3 "$SKILLS/docx/scripts/office/soffice.py" --headless --convert-to pdf --outdir "$RENDER" Handout_Fotorealismus_Hyperrealismus.docx >/dev/null 2>&1
pdftoppm -jpeg -r 110 "$RENDER/Fotorealismus_Hyperrealismus.pdf" "$RENDER/slide"
pdftoppm -jpeg -r 90 "$RENDER/Handout_Fotorealismus_Hyperrealismus.pdf" "$RENDER/page"
echo "Handout-Seiten: $(pdfinfo "$RENDER/Handout_Fotorealismus_Hyperrealismus.pdf" | awk '/Pages/{print $2}')"
ls "$RENDER"

// Baut die Präsentation „Fotorealismus & Hyperrealismus“ als .pptx (öffnet direkt in Keynote).
// Aufruf: src/build.sh (setzt DEPS/SKILLS) oder NODE_PATH=<node_modules> node src/build_deck.js
// Bilder: liegt bilder/<id>.jpg|.png vor, wird es eingesetzt – sonst erscheint ein beschrifteter Bildrahmen.
const fs = require("fs");
const path = require("path");
const pptxgen = require("pptxgenjs");
const sharp = require("sharp");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const TB = require("react-icons/tb");
const WORKS = require("./works.js");
const T = require("./texts.js");

const ROOT = path.resolve(__dirname, "..");
const IMG_DIR = path.join(ROOT, "bilder");
const OUT = path.join(ROOT, "Fotorealismus_Hyperrealismus.pptx");
const SKILL = process.env.PPTX_SKILL;

// ---------- Farben & Schriften ----------
// Farben direkt als Hex, damit die Datei auch ohne Theme-Nachbearbeitung richtig aussieht (Keynote liest sie 1:1).
const THEME = {
  name: "Dunkelkammer",
  headFontFace: "Georgia",
  bodyFontFace: "Arial",
  colors: {
    dk1: "141414", lt1: "F5F5F2", dk2: "2E2E2E", lt2: "A8A8A3",
    accent1: "F5B21B", accent2: "8CC4D6", accent3: "484848", accent4: "1C1C1C",
    accent5: "7A7A75", accent6: "DADAD5", hlink: "F5B21B", folHlink: "C9941A",
  },
};
const H = THEME.colors;
const BG = H.dk1, FG = H.lt1, PANEL = H.dk2, MUTED = H.lt2, ACC = H.accent1, COOL = H.accent2;
const EDGE = H.accent3, DEEP = H.accent4, DIM = H.accent5;
const HEAD = "Georgia", BODY = "Arial";

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13,333 × 7,5 Zoll
pres.title = "Fotorealismus & Hyperrealismus";
pres.subject = "Referat zu Kunstepochen";
pres.author = "Referat Kunst";
pres.theme = { headFontFace: HEAD, bodyFontFace: BODY };

const SW = 13.333, SH = 7.5, MX = 0.6;
const CW = SW - 2 * MX; // 12,133
const TOP = 1.85; // Beginn des Inhaltsbereichs

// Foliennummern mitzählen (für die Bildnachweise) und Deutsch als Textsprache setzen
let slideNo = 0;
const USED = [];
const _addSlide = pres.addSlide.bind(pres);
pres.addSlide = (o) => {
  slideNo++;
  const s = _addSlide(o);
  const _addText = s.addText.bind(s);
  s.addText = (text, opts = {}) => _addText(text, { lang: "de-DE", ...opts });
  return s;
};

// Sprechzeit aus den Notizen schätzen (130 Wörter/min, Regieanweisungen in Klammern ausgenommen)
const TIMING = [];
function notes(s, text) {
  const words = text.replace(/\([^)]*\)/g, " ").split(/\s+/).filter((w) => /[\wÄÖÜäöüß]/.test(w)).length;
  const sec = Math.max(10, Math.round((words / 130) * 60 / 5) * 5);
  s.addNotes(`${text}\n\n(Sprechzeit ca. ${sec} s · ${words} Wörter)`);
  TIMING.push({ slide: slideNo, sec, words });
}

// ---------- Layouts ----------
pres.defineSlideMaster({
  title: "TITEL",
  background: { color: BG },
  objects: [
    { placeholder: { options: { name: "title", type: "title", x: 1.25, y: 2.3, w: 9.0, h: 1.95, fontFace: HEAD, fontSize: 52, bold: true, color: FG, margin: 0, align: "left", valign: "bottom" }, text: "" } },
    { placeholder: { options: { name: "body", type: "body", x: 1.25, y: 4.5, w: 9.0, h: 0.6, fontFace: BODY, fontSize: 22, color: MUTED, margin: 0, align: "left", valign: "top" }, text: "" } },
  ],
});
pres.defineSlideMaster({
  title: "INHALT",
  background: { color: BG },
  objects: [
    { placeholder: { options: { name: "kicker", type: "body", x: MX, y: 0.42, w: 7.5, h: 0.32, fontFace: BODY, fontSize: 12, bold: true, color: ACC, charSpacing: 3, margin: 0, align: "left", valign: "middle" }, text: "" } },
    { placeholder: { options: { name: "title", type: "title", x: MX, y: 0.76, w: CW, h: 0.82, fontFace: HEAD, fontSize: 32, bold: true, color: FG, margin: 0, align: "left", valign: "top" }, text: "" } },
  ],
  slideNumber: { x: SW - MX - 0.8, y: 6.98, w: 0.8, h: 0.3, fontFace: BODY, fontSize: 10, color: MUTED, align: "right" },
});
pres.defineSlideMaster({
  title: "BILD",
  background: { color: BG },
  objects: [],
  slideNumber: { x: SW - MX - 0.8, y: 6.98, w: 0.8, h: 0.3, fontFace: BODY, fontSize: 10, color: MUTED, align: "right" },
});

// ---------- Helfer ----------
async function icon(name, hex = ACC, px = 256) {
  const svg = ReactDOMServer.renderToStaticMarkup(React.createElement(TB[name], { color: "#" + hex, size: px }));
  const buf = await sharp(Buffer.from(svg)).resize(px, px).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

function findImage(id) {
  for (const ext of [".jpg", ".jpeg", ".png"]) {
    const p = path.join(IMG_DIR, id + ext);
    if (fs.existsSync(p)) return p;
  }
  return null;
}

function fitRect(box, ratio, align = "center", valign = "middle") {
  let w = box.w, h = w / ratio;
  if (h > box.h) { h = box.h; w = h * ratio; }
  const x = box.x + (align === "center" ? (box.w - w) / 2 : align === "right" ? box.w - w : 0);
  const y = box.y + (valign === "middle" ? (box.h - h) / 2 : valign === "bottom" ? box.h - h : 0);
  return { x, y, w, h };
}

// Sucher-Ecken (Motiv der Präsentation): vier L-Winkel wie im Kamerasucher
function corners(slide, r, { gap = 0.1, len = 0.26, color = ACC, width = 2 } = {}) {
  const L = r.x - gap, R = r.x + r.w + gap, Tp = r.y - gap, B = r.y + r.h + gap;
  const seg = (x, y, w, h) => slide.addShape(pres.shapes.LINE, { x, y, w, h, line: { color, width } });
  seg(L, Tp, len, 0); seg(L, Tp, 0, len);
  seg(R - len, Tp, len, 0); seg(R, Tp, 0, len);
  seg(L, B, len, 0); seg(L, B - len, 0, len);
  seg(R - len, B, len, 0); seg(R, B - len, 0, len);
}

const ICONS = {};
async function loadIcons() {
  const list = ["TbCamera", "TbGrid3X3", "TbSpray", "TbFocus2", "TbArrowsMaximize", "TbBuildingStore",
    "TbBuildingSkyscraper", "TbCar", "TbToolsKitchen2", "TbUser", "TbCandy", "TbMan", "TbPhoto",
    "TbBrush", "TbPalette", "TbEye", "TbDeviceMobile", "TbAlertTriangle", "TbArrowRight", "TbHelp"];
  for (const n of list) ICONS[n] = await icon(n);
  ICONS.TbPhoto_dim = await icon("TbPhoto", DIM);
  ICONS.TbArrowRight_dim = await icon("TbArrowRight", DIM);
  ICONS.TbArrowRight_cool = await icon("TbArrowRight", COOL);
}

const imgMeta = {};
async function preloadImages() {
  for (const id of Object.keys(WORKS)) {
    const p = findImage(id);
    if (!p) continue;
    const m = await sharp(p).metadata();
    imgMeta[id] = { path: p, ratio: m.width / m.height };
  }
}
const ratioOf = (id) => (imgMeta[id] ? imgMeta[id].ratio : WORKS[id].ratio);

// Setzt ein Werk (oder einen beschrifteten Platzhalter) in ein Rechteck r (bereits im richtigen Seitenverhältnis)
function artAt(slide, id, r, { color = ACC } = {}) {
  const w = WORKS[id];
  if (!w) throw new Error("Unbekanntes Werk: " + id);
  if (!USED.some((u) => u.id === id)) USED.push({ id, slide: slideNo });
  const meta = imgMeta[id];
  if (meta) {
    slide.addImage({ path: meta.path, x: r.x, y: r.y, w: r.w, h: r.h, altText: `${w.kuenstler}, ${w.titel}, ${w.jahr}`, objectName: "Werk " + id });
  } else {
    slide.addShape(pres.shapes.RECTANGLE, { x: r.x, y: r.y, w: r.w, h: r.h, fill: { color: PANEL }, line: { color: EDGE, width: 1, dashType: "dash" }, objectName: "Bildplatzhalter " + id });
    const s = Math.min(0.55, r.h * 0.22);
    slide.addImage({ data: ICONS.TbPhoto_dim, x: r.x + (r.w - s) / 2, y: r.y + r.h / 2 - s - 0.05, w: s, h: s, altText: "Platzhalter-Symbol" });
    slide.addText([
      { text: "Abbildung einfügen", options: { bold: true, breakLine: true } },
      { text: `${w.kuenstler}: ${w.titel}` },
    ], { x: r.x + 0.15, y: r.y + r.h / 2 + 0.02, w: r.w - 0.3, h: Math.min(0.8, r.h / 2 - 0.1), fontFace: BODY, fontSize: 11, color: MUTED, align: "center", valign: "top", margin: 0, isTextBox: true, fit: "shrink" });
  }
  corners(slide, r, { color });
  return r;
}
const art = (slide, id, box, o = {}) => artAt(slide, id, fitRect(box, ratioOf(id), o.align, o.valign), o);

// Bildunterschrift: Künstler, Titel, Entstehungsjahr (+ Technik/Ort, + Merkmal)
function caption(slide, id, x, y, w, { merkmal = false, size = 13, color = ACC } = {}) {
  const k = WORKS[id];
  // Zeile 1: Künstler, Titel, Jahr – die deutsche Übersetzung steht klein in Zeile 2
  const de = k.titel_de && k.titel_de !== k.titel ? `dt. „${k.titel_de}“ · ` : "";
  const runs = [
    { text: `${k.kuenstler}, `, options: { bold: true, color: FG } },
    { text: k.titel, options: { bold: true, italic: true, color: FG } },
    { text: `, ${k.jahr}`, options: { bold: true, color: FG, breakLine: true } },
    { text: `${de}${k.technik}, ${k.masse} · ${k.sammlung}`, options: { fontSize: size - 2, color: MUTED, breakLine: merkmal } },
  ];
  if (merkmal) runs.push({ text: "→ " + k.merkmal, options: { fontSize: size, color } });
  slide.addText(runs, { x, y, w, h: merkmal ? 1.05 : 0.7, fontFace: BODY, fontSize: size, valign: "top", margin: 0, isTextBox: true, paraSpaceAfter: 3 });
}

function card(slide, x, y, w, h) {
  slide.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: PANEL }, line: { color: EDGE, width: 0.75 } });
}

function iconCircle(slide, name, x, y, d = 0.62, color = ACC) {
  slide.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: DEEP }, line: { color, width: 1.25 } });
  const s = d * 0.56;
  slide.addImage({ data: ICONS[name], x: x + (d - s) / 2, y: y + (d - s) / 2, w: s, h: s, altText: name.replace("Tb", "Symbol ") });
}

function numCircle(slide, n, x, y, d = 0.42, color = ACC) {
  slide.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color }, line: { color, width: 0 } });
  slide.addText(String(n), { x, y, w: d, h: d, fontFace: BODY, fontSize: d > 0.38 ? 14 : 12, bold: true, color: BG, align: "center", valign: "middle", margin: 0, isTextBox: true });
}

// Einheitliches 3 × 2-Kartenraster
const GRID = { cols: 3, gw: (CW - 2 * 0.3) / 3, gh: 2.2, gap: 0.3, y0: TOP + 0.05 };
function cardGrid(slide, items, render) {
  items.forEach((it, i) => {
    const c = i % GRID.cols, r = Math.floor(i / GRID.cols);
    const x = MX + c * (GRID.gw + GRID.gap), y = GRID.y0 + r * (GRID.gh + GRID.gap);
    card(slide, x, y, GRID.gw, GRID.gh);
    render(it, i, x, y, GRID.gw, GRID.gh);
  });
}

function contentSlide(section, kicker, title, { cool = false } = {}) {
  const s = pres.addSlide({ masterName: "INHALT", sectionTitle: section });
  s.addText(kicker, cool ? { placeholder: "kicker", color: COOL } : { placeholder: "kicker" });
  s.addText(title, { placeholder: "title" });
  return s;
}

// Nummerierte Punkteliste (Nummernkreis + fetter Begriff + Erläuterung)
function pointList(slide, punkte, x, y, w, step) {
  punkte.forEach((p, i) => {
    const yy = y + i * step;
    numCircle(slide, i + 1, x, yy + 0.02);
    slide.addText([
      { text: p[0], options: { bold: true, color: FG, breakLine: true } },
      { text: p[1], options: { color: MUTED, fontSize: 14 } },
    ], { x: x + 0.6, y: yy, w: w - 0.6, h: step - 0.08, fontFace: BODY, fontSize: 16, margin: 0, valign: "top", isTextBox: true, paraSpaceAfter: 2 });
  });
}

// ---------- Folien ----------
async function build() {
  await loadIcons();
  await preloadImages();

  // 1 · Einstieg: Foto oder Gemälde? (ohne Bildunterschrift – die Auflösung folgt)
  pres.addSection({ title: "Einstieg" });
  {
    const E = T.einstieg;
    const s = pres.addSlide({ masterName: "BILD", sectionTitle: "Einstieg" });
    art(s, E.werk, { x: 5.0, y: 0.75, w: 7.73, h: 6.0 }, { align: "right", valign: "middle" });
    s.addText("EINSTIEG", { x: MX, y: 1.6, w: 4, h: 0.3, fontFace: BODY, fontSize: 12, bold: true, charSpacing: 3, color: ACC, margin: 0, isTextBox: true });
    s.addText(E.frage, { x: MX, y: 2.0, w: 4.0, h: 1.9, fontFace: HEAD, fontSize: 44, bold: true, color: FG, margin: 0, valign: "top", isTextBox: true });
    s.addText(E.text, { x: MX, y: 4.05, w: 3.9, h: 1.0, fontFace: BODY, fontSize: 18, color: MUTED, margin: 0, valign: "top", isTextBox: true });
    notes(s, E.notes);
  }

  // 2 · Auflösung
  {
    const A = T.aufloesung;
    const s = contentSlide("Einstieg", "EINSTIEG", A.title);
    const r = art(s, A.werk, { x: MX + 0.1, y: TOP + 0.1, w: 7.0, h: 4.0 }, { align: "left", valign: "top" });
    caption(s, A.werk, r.x, r.y + r.h + 0.25, r.w);
    const x = r.x + r.w + 0.7;
    pointList(s, A.punkte, x, TOP + 0.1, SW - MX - x, 1.25);
    notes(s, A.notes);
  }

  // 3 · Titel
  {
    const s = pres.addSlide({ masterName: "TITEL", sectionTitle: "Einstieg" });
    corners(s, { x: 0.85, y: 0.85, w: SW - 1.7, h: SH - 1.7 }, { gap: 0, len: 0.55, width: 2.5 });
    s.addText("REFERAT · KUNSTEPOCHEN", { x: 1.25, y: 1.2, w: 6, h: 0.3, fontFace: BODY, fontSize: 12, bold: true, charSpacing: 3, color: ACC, margin: 0, isTextBox: true });
    s.addText("1966 – HEUTE", { x: SW - 1.25 - 4, y: 1.2, w: 4, h: 0.3, fontFace: BODY, fontSize: 12, bold: true, charSpacing: 3, color: MUTED, align: "right", margin: 0, isTextBox: true });
    s.addText(T.titel.title, { placeholder: "title" });
    s.addText(T.titel.sub, { placeholder: "body" });
    const m = T.meta;
    s.addText(`${m.name} · ${m.kurs} · ${m.datum}`, { x: 1.25, y: SH - 1.55, w: 8, h: 0.32, fontFace: BODY, fontSize: 14, color: MUTED, margin: 0, isTextBox: true });
    notes(s, T.titel.notes);
  }

  // 4 · Gliederung
  {
    const s = contentSlide("Einstieg", "ÜBERBLICK", "Gliederung");
    cardGrid(s, T.gliederung.items, (it, i, x, y, w, h) => {
      s.addText(String(i + 1).padStart(2, "0"), { x: x + 0.3, y: y + 0.25, w: 1.4, h: 0.7, fontFace: BODY, fontSize: 36, bold: true, color: ACC, margin: 0, isTextBox: true });
      s.addText([
        { text: it[0], options: { bold: true, fontSize: 20, color: FG, breakLine: true } },
        { text: it[1], options: { fontSize: 15, color: MUTED } },
      ], { x: x + 0.3, y: y + 1.05, w: w - 0.6, h: h - 1.2, fontFace: BODY, margin: 0, valign: "top", isTextBox: true, paraSpaceAfter: 3 });
    });
    notes(s, T.gliederung.notes);
  }

  // 5 · Zeitleiste
  pres.addSection({ title: "Zeitliche Einordnung" });
  {
    const Z = T.zeit;
    const s = contentSlide("Zeitliche Einordnung", "01 · ZEITLICHE EINORDNUNG", Z.title);
    const lineY = 4.15, bw = 2.7, x0 = MX + 0.25, x1 = SW - MX - bw;
    const n = Z.items.length, step = (x1 - x0) / (n - 1);
    s.addShape(pres.shapes.LINE, { x: MX, y: lineY, w: CW, h: 0, line: { color: DIM, width: 2.5, endArrowType: "triangle" } });
    Z.items.forEach((it, i) => {
      const x = x0 + i * step;
      const col = it.typ === "foto" ? ACC : it.typ === "hyper" ? COOL : MUTED;
      const up = i % 2 === 0;
      s.addShape(pres.shapes.OVAL, { x: x - 0.12, y: lineY - 0.12, w: 0.24, h: 0.24, fill: { color: col }, line: { color: BG, width: 2 } });
      s.addShape(pres.shapes.LINE, { x, y: up ? lineY - 0.5 : lineY + 0.15, w: 0, h: 0.35, line: { color: col, width: 1 } });
      s.addText([
        { text: it.jahr, options: { fontFace: BODY, fontSize: 22, bold: true, color: col, breakLine: true } },
        { text: it.text, options: { fontFace: BODY, fontSize: 14, color: FG } },
      ], { x, y: up ? 1.95 : lineY + 0.6, w: bw, h: 1.65, margin: 0, valign: up ? "bottom" : "top", isTextBox: true, paraSpaceAfter: 2 });
    });
    // Legende rechts in der Kopfzeile
    [["Kontext", MUTED], ["Fotorealismus", ACC], ["Hyperrealismus", COOL]].forEach(([t, col], i) => {
      const x = SW - MX - 5.1 + i * 1.75;
      s.addShape(pres.shapes.OVAL, { x, y: 0.42 + 0.08, w: 0.16, h: 0.16, fill: { color: col }, line: { color: col, width: 0 } });
      s.addText(t, { x: x + 0.24, y: 0.42, w: 1.5, h: 0.32, fontFace: BODY, fontSize: 12, color: MUTED, margin: 0, valign: "middle", isTextBox: true });
    });
    notes(s, Z.notes);
  }

  // 6 · Entwicklung (Vergleich)
  {
    const E = T.entwicklung;
    const s = contentSlide("Zeitliche Einordnung", "01 · ENTWICKLUNG", E.title);
    const lw = 2.3, cw = (CW - lw - 0.3) / 2, y0 = TOP + 0.05, rh = 0.8;
    const cx = [MX + lw + 0.15, MX + lw + 0.15 + cw + 0.15];
    E.cols.forEach((c, i) => {
      const col = i === 0 ? ACC : COOL;
      const tx = cx[i] + (i === 1 ? 0.75 : 0.2);
      if (i === 1) s.addImage({ data: ICONS.TbArrowRight_cool, x: cx[i] + 0.2, y: y0 + 0.02, w: 0.4, h: 0.4, altText: "Pfeil: Entwicklung" });
      s.addText([
        { text: c.name, options: { fontFace: HEAD, fontSize: 22, bold: true, color: col, breakLine: true } },
        { text: c.zeit, options: { fontFace: BODY, fontSize: 14, color: MUTED } },
      ], { x: tx, y: y0, w: cx[i] + cw - 0.2 - tx, h: 1.0, margin: 0, valign: "top", isTextBox: true });
    });
    E.rows.forEach((row, j) => {
      const y = y0 + 1.15 + j * (rh + 0.1);
      s.addText(row[0], { x: MX, y, w: lw, h: rh, fontFace: BODY, fontSize: 15, bold: true, color: MUTED, margin: 0, valign: "middle", isTextBox: true });
      [1, 2].forEach((k) => {
        card(s, cx[k - 1], y, cw, rh);
        s.addText(row[k], { x: cx[k - 1] + 0.2, y, w: cw - 0.4, h: rh, fontFace: BODY, fontSize: 15, color: FG, margin: 0, valign: "middle", isTextBox: true });
      });
    });
    notes(s, E.notes);
  }

  // 7 · Abgrenzung
  {
    const A = T.abgrenzung;
    const s = contentSlide("Zeitliche Einordnung", "01 · ABGRENZUNG", A.title);
    const gw = (CW - 2 * 0.3) / 3, gh = 4.75;
    A.items.forEach((it, i) => {
      const x = MX + i * (gw + 0.3), y = TOP + 0.05;
      card(s, x, y, gw, gh);
      iconCircle(s, it.icon, x + 0.3, y + 0.3);
      s.addText(it.t, { x: x + 1.1, y: y + 0.3, w: gw - 1.4, h: 0.62, fontFace: HEAD, fontSize: 22, bold: true, color: FG, margin: 0, valign: "middle", isTextBox: true });
      s.addText(it.zeit, { x: x + 0.3, y: y + 1.1, w: gw - 0.6, h: 0.55, fontFace: BODY, fontSize: 13, bold: true, color: MUTED, margin: 0, valign: "top", isTextBox: true });
      s.addText(it.d, { x: x + 0.3, y: y + 1.7, w: gw - 0.6, h: 1.6, fontFace: BODY, fontSize: 16, color: FG, margin: 0, valign: "top", isTextBox: true });
      s.addText("→ " + it.u, { x: x + 0.3, y: y + gh - 1.15, w: gw - 0.6, h: 0.9, fontFace: BODY, fontSize: 15, bold: true, color: ACC, margin: 0, valign: "bottom", isTextBox: true });
    });
    notes(s, A.notes);
  }

  // 8 · Arbeitsweise + Definition
  pres.addSection({ title: "Merkmale" });
  {
    const A = T.arbeitsweise;
    const s = contentSlide("Merkmale", "02 · TECHNIK & DEFINITION", A.title);
    const n = A.schritte.length, gw = 2.6, d = 0.75, gap = (CW - n * gw) / (n - 1), y = TOP + 0.05;
    A.schritte.forEach((st, i) => {
      const x = MX + i * (gw + gap);
      iconCircle(s, st.icon, x, y, d);
      s.addText([
        { text: `${i + 1}  ${st.t}`, options: { bold: true, fontSize: 18, color: FG, breakLine: true } },
        { text: st.d, options: { fontSize: 15, color: MUTED } },
      ], { x, y: y + 0.95, w: gw, h: 1.45, fontFace: BODY, margin: 0, valign: "top", isTextBox: true, paraSpaceAfter: 3 });
      if (i < n - 1) {
        const nextX = x + gw + gap;
        s.addImage({ data: ICONS.TbArrowRight_dim, x: (x + d + nextX) / 2 - 0.2, y: y + d / 2 - 0.2, w: 0.4, h: 0.4, altText: "Pfeil" });
      }
    });
    const by = 4.35, bh = 2.45;
    card(s, MX, by, CW, bh);
    s.addText(A.defTitel, { x: MX + 0.3, y: by + 0.2, w: CW - 0.6, h: 0.4, fontFace: BODY, fontSize: 16, bold: true, color: ACC, margin: 0, isTextBox: true });
    const colW = (CW - 0.9) / 2;
    A.kriterien.forEach((t, j) => {
      const col = j < 3 ? 0 : 1, row = j < 3 ? j : j - 3;
      const x = MX + 0.3 + col * (colW + 0.3), yy = by + 0.75 + row * 0.55;
      numCircle(s, j + 1, x, yy + 0.02, 0.34);
      s.addText(t, { x: x + 0.5, y: yy, w: colW - 0.5, h: 0.52, fontFace: BODY, fontSize: 14, color: FG, margin: 0, valign: "top", isTextBox: true });
    });
    notes(s, A.notes);
  }

  // 9 · Merkmale – Überblick
  {
    const M = T.merkmale;
    const s = contentSlide("Merkmale", "02 · ZUSAMMENFASSENDE MERKMALE", M.title);
    cardGrid(s, M.items, (it, i, x, y, w, h) => {
      iconCircle(s, it.icon, x + 0.25, y + 0.25);
      s.addText(it.t, { x: x + 1.05, y: y + 0.25, w: w - 1.25, h: 0.62, fontFace: BODY, fontSize: 18, bold: true, color: FG, margin: 0, valign: "middle", isTextBox: true });
      s.addText(it.d, { x: x + 0.25, y: y + 1.05, w: w - 0.5, h: h - 1.2, fontFace: BODY, fontSize: 16, color: MUTED, margin: 0, valign: "top", isTextBox: true });
    });
    notes(s, M.notes);
  }

  // 10 · Merkmale am Bildbeispiel 1 (Estes)
  {
    const B = T.beleg1;
    const s = contentSlide("Merkmale", "02 · MERKMALE AM BILDBEISPIEL", B.title);
    const r = art(s, B.werk, { x: MX + 0.1, y: TOP + 0.1, w: 7.0, h: 4.1 }, { align: "left", valign: "top" });
    caption(s, B.werk, r.x, r.y + r.h + 0.25, r.w);
    const x = r.x + r.w + 0.7;
    pointList(s, B.punkte, x, TOP + 0.05, SW - MX - x, 0.98);
    notes(s, B.notes);
  }

  // 11 · Merkmale am Bildbeispiel 2 (Close)
  {
    const B = T.beleg2;
    const s = contentSlide("Merkmale", "02 · MERKMALE AM BILDBEISPIEL", B.title);
    const r = art(s, B.werk, { x: MX + 0.1, y: TOP + 0.1, w: 4.4, h: 4.1 }, { align: "left", valign: "top" });
    caption(s, B.werk, r.x, r.y + r.h + 0.25, 6.2);
    const x = r.x + r.w + 0.75, w = SW - MX - x;
    s.addText(B.stat, { x, y: TOP, w: 3.4, h: 1.05, fontFace: BODY, fontSize: 60, bold: true, color: ACC, margin: 0, valign: "top", isTextBox: true });
    s.addText(B.statLabel, { x: x + 3.5, y: TOP + 0.2, w: w - 3.5, h: 0.8, fontFace: BODY, fontSize: 16, color: MUTED, margin: 0, valign: "top", isTextBox: true });
    const cw2 = (w - 0.3) / 2, ch = 1.3;
    B.punkte.forEach((p, i) => {
      const cx = x + (i % 2) * (cw2 + 0.3), cy = TOP + 1.35 + Math.floor(i / 2) * (ch + 0.25);
      card(s, cx, cy, cw2, ch);
      s.addText([
        { text: p[0], options: { bold: true, color: FG, breakLine: true } },
        { text: p[1], options: { color: MUTED, fontSize: 14 } },
      ], { x: cx + 0.25, y: cy + 0.2, w: cw2 - 0.5, h: ch - 0.3, fontFace: BODY, fontSize: 16, margin: 0, valign: "top", isTextBox: true, paraSpaceAfter: 3 });
    });
    notes(s, B.notes);
  }

  // 12 · Motive
  pres.addSection({ title: "Motive" });
  {
    const M = T.motive;
    const s = contentSlide("Motive", "03 · MOTIVE", M.title);
    cardGrid(s, M.items, (it, i, x, y, w, h) => {
      iconCircle(s, it.icon, x + 0.25, y + 0.25);
      s.addText(it.t, { x: x + 1.05, y: y + 0.25, w: w - 1.25, h: 0.62, fontFace: BODY, fontSize: 18, bold: true, color: FG, margin: 0, valign: "middle", isTextBox: true });
      s.addText([
        { text: it.d, options: { color: MUTED, breakLine: true } },
        { text: it.k, options: { color: ACC, bold: true } },
      ], { x: x + 0.25, y: y + 1.0, w: w - 0.5, h: h - 1.1, fontFace: BODY, fontSize: 15, margin: 0, valign: "top", isTextBox: true, paraSpaceAfter: 4 });
    });
    notes(s, M.notes);
  }

  // 13/14 · Hauptvertreter
  pres.addSection({ title: "Hauptvertreter" });
  for (const V of [T.vertreterFoto, T.vertreterHyper]) {
    const s = contentSlide("Hauptvertreter", V.kicker, V.title, { cool: V.cool });
    const col = V.cool ? COOL : ACC;
    cardGrid(s, V.items, (it, i, x, y, w, h) => {
      s.addText(it.name, { x: x + 0.3, y: y + 0.25, w: w - 0.6, h: 0.45, fontFace: HEAD, fontSize: 21, bold: true, color: FG, margin: 0, valign: "top", isTextBox: true });
      s.addText(it.daten, { x: x + 0.3, y: y + 0.75, w: w - 0.6, h: 0.3, fontFace: BODY, fontSize: 13, bold: true, color: col, margin: 0, valign: "top", isTextBox: true });
      s.addText(it.d, { x: x + 0.3, y: y + 1.15, w: w - 0.6, h: h - 1.3, fontFace: BODY, fontSize: 16, color: MUTED, margin: 0, valign: "top", isTextBox: true });
    });
    notes(s, V.notes);
  }

  // 15–19 · Werkbeispiele (Paare): Bilder in ihrer Hälfte zentriert, unten bündig
  pres.addSection({ title: "Werkbeispiele" });
  for (const P of T.paare) {
    const s = contentSlide("Werkbeispiele", P.kicker, P.title, { cool: P.cool });
    const col = P.cool ? COOL : ACC;
    const half = (CW - 0.5) / 2, bh = 3.55;
    P.werke.forEach((id, i) => {
      const cx = MX + i * (half + 0.5);
      const r = art(s, id, { x: cx + 0.1, y: TOP + 0.1, w: half - 0.2, h: bh }, { align: "center", valign: "bottom", color: col });
      caption(s, id, r.x, TOP + 0.1 + bh + 0.25, cx + half - r.x, { merkmal: true, color: col });
    });
    notes(s, P.notes);
  }

  // 20 · Fazit
  pres.addSection({ title: "Fazit & Quellen" });
  {
    const F = T.fazit;
    const s = contentSlide("Fazit & Quellen", "06 · FAZIT", F.title);
    const pw = 5.2, ph = 4.75;
    card(s, MX, TOP + 0.05, pw, ph);
    s.addText(F.antwortKicker, { x: MX + 0.4, y: TOP + 0.4, w: pw - 0.8, h: 0.3, fontFace: BODY, fontSize: 12, bold: true, charSpacing: 3, color: ACC, margin: 0, isTextBox: true });
    s.addText(F.antwort, { x: MX + 0.4, y: TOP + 0.85, w: pw - 0.8, h: 0.9, fontFace: HEAD, fontSize: 40, bold: true, color: FG, margin: 0, valign: "top", isTextBox: true });
    s.addText(F.antwortText, { x: MX + 0.4, y: TOP + 1.95, w: pw - 0.8, h: 2.6, fontFace: BODY, fontSize: 18, color: MUTED, margin: 0, valign: "top", isTextBox: true });
    const x = MX + pw + 0.5, w = SW - MX - x;
    F.punkte.forEach((p, i) => {
      const y = TOP + 0.05 + i * 1.2;
      const last = i === F.punkte.length - 1;
      iconCircle(s, p.icon, x, y);
      s.addText([
        { text: p.t, options: { bold: true, fontSize: 18, color: last ? ACC : FG, breakLine: true } },
        { text: p.d, options: { fontSize: last ? 16 : 15, bold: last, color: last ? FG : MUTED } },
      ], { x: x + 0.85, y, w: w - 0.85, h: 1.1, fontFace: BODY, margin: 0, valign: "top", isTextBox: true, paraSpaceAfter: 2 });
    });
    notes(s, F.notes);
  }

  // 21 · Quellen
  {
    const Q = T.quellen;
    const s = contentSlide("Fazit & Quellen", Q.kicker, Q.title);
    [["Literatur", Q.literatur], ["Internet", Q.internet]].forEach(([h, list], k) => {
      const x = MX + k * (CW / 2 + 0.15), w = CW / 2 - 0.15;
      s.addText(h, { x, y: TOP, w, h: 0.4, fontFace: BODY, fontSize: 16, bold: true, color: ACC, margin: 0, isTextBox: true });
      s.addText(list.map((t, j) => ({ text: t, options: { breakLine: j < list.length - 1 } })), {
        x, y: TOP + 0.5, w, h: 4.5, fontFace: BODY, fontSize: 12, color: FG, margin: 0, valign: "top", isTextBox: true, paraSpaceAfter: 7,
      });
    });
    s.addNotes(Q.notes);
  }

  // 22 · Bildnachweise (automatisch aus den verwendeten Werken)
  {
    const Q = T.bildnachweise;
    const s = contentSlide("Fazit & Quellen", Q.kicker, Q.title);
    const list = USED.map((u) => {
      const k = WORKS[u.id];
      return `Folie ${u.slide}: ${k.kuenstler}, ${k.titel}, ${k.jahr}. ${k.sammlung}. Abb.: ${k.quelle}`;
    });
    list.push(Q.hinweis);
    const half = Math.ceil(list.length / 2);
    [list.slice(0, half), list.slice(half)].forEach((part, k) => {
      const x = MX + k * (CW / 2 + 0.15), w = CW / 2 - 0.15;
      s.addText(part.map((t, j) => ({ text: t, options: { breakLine: j < part.length - 1 } })), {
        x, y: TOP, w, h: 4.95, fontFace: BODY, fontSize: 10.5, color: FG, margin: 0, valign: "top", isTextBox: true, paraSpaceAfter: 5,
      });
    });
    s.addNotes(Q.notes);
  }

  await pres.writeFile({ fileName: OUT });
  if (SKILL) {
    const { applyTheme } = require(path.join(SKILL, "scripts/apply_theme.js"));
    await applyTheme(OUT, THEME);
  }
  const total = TIMING.reduce((a, t) => a + t.sec, 0), words = TIMING.reduce((a, t) => a + t.words, 0);
  console.log("Geschrieben:", OUT, `| ${slideNo} Folien | Bilder: ${Object.keys(imgMeta).length}/${Object.keys(WORKS).length}`,
    `| Sprechtext: ${words} Wörter ≈ ${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")} min (ohne Pausen)`);
}

build().catch((e) => { console.error(e); process.exit(1); });

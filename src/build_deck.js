// Baut die Präsentation „Fotorealismus & Hyperrealismus“ als .pptx (öffnet direkt in Keynote).
// Aufruf: NODE_PATH=<node_modules> node src/build_deck.js
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

// ---------- Theme ----------
const THEME = {
  name: "Dunkelkammer",
  headFontFace: "Georgia",
  bodyFontFace: "Arial",
  colors: {
    dk1: "141414", lt1: "F5F5F2", dk2: "242424", lt2: "A8A8A3",
    accent1: "F5B21B", accent2: "8CC4D6", accent3: "3A3A3A", accent4: "1C1C1C",
    accent5: "6F6F6A", accent6: "DADAD5", hlink: "F5B21B", folHlink: "C9941A",
  },
};
const HEX = THEME.colors;
const HEAD = "Georgia";
const BODY = "Arial";

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13,333 × 7,5 Zoll
pres.title = "Fotorealismus & Hyperrealismus";
pres.subject = "Referat zu Kunstepochen";
pres.author = "Referat Kunst";
pres.theme = { headFontFace: HEAD, bodyFontFace: BODY };
const C = pres.SchemeColor;
const BG = C.text1, FG = C.background1, PANEL = C.text2, MUTED = C.background2;
const ACC = C.accent1, COOL = C.accent2, LINE = C.accent3, DEEP = C.accent4, DIM = C.accent5;

const SW = 13.333, SH = 7.5, MX = 0.6;
const CW = SW - 2 * MX; // 12,133
const TOP = 1.85; // Beginn Inhaltsbereich

// ---------- Layouts ----------
pres.defineSlideMaster({
  title: "TITEL",
  background: { color: HEX.dk1 },
  objects: [
    { placeholder: { options: { name: "title", type: "title", x: 1.25, y: 2.35, w: 8.6, h: 1.9, fontFace: HEAD, fontSize: 50, bold: true, color: FG, margin: 0, align: "left", valign: "bottom" }, text: "" } },
    { placeholder: { options: { name: "body", type: "body", x: 1.25, y: 4.45, w: 8.6, h: 0.9, fontFace: BODY, fontSize: 20, color: MUTED, margin: 0, align: "left", valign: "top" }, text: "" } },
  ],
});
pres.defineSlideMaster({
  title: "INHALT",
  background: { color: HEX.dk1 },
  objects: [
    { placeholder: { options: { name: "kicker", type: "body", x: MX, y: 0.42, w: CW, h: 0.32, fontFace: BODY, fontSize: 12, bold: true, color: ACC, charSpacing: 3, margin: 0, align: "left", valign: "middle" }, text: "" } },
    { placeholder: { options: { name: "title", type: "title", x: MX, y: 0.76, w: CW, h: 0.82, fontFace: HEAD, fontSize: 32, bold: true, color: FG, margin: 0, align: "left", valign: "top" }, text: "" } },
  ],
  slideNumber: { x: SW - MX - 0.8, y: 6.98, w: 0.8, h: 0.3, fontFace: BODY, fontSize: 10, color: HEX.lt2, align: "right" },
});
pres.defineSlideMaster({
  title: "BILD",
  background: { color: HEX.dk1 },
  objects: [],
  slideNumber: { x: SW - MX - 0.8, y: 6.98, w: 0.8, h: 0.3, fontFace: BODY, fontSize: 10, color: HEX.lt2, align: "right" },
});

// ---------- Helfer ----------
async function icon(name, hex = HEX.accent1, px = 256) {
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
    "TbBrush", "TbEye", "TbQuote", "TbDeviceMobile", "TbAlertTriangle", "TbBulb", "TbArrowRight", "TbHelp", "TbZoomScan"];
  for (const n of list) ICONS[n] = await icon(n);
  ICONS.TbPhoto_dim = await icon("TbPhoto", HEX.accent5);
  ICONS.TbArrowRight_dim = await icon("TbArrowRight", HEX.accent5);
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

// Setzt ein Werk (oder einen beschrifteten Platzhalter) in eine Box; gibt das tatsächliche Bildrechteck zurück.
function art(slide, id, box, { align = "center", valign = "middle", frame = true } = {}) {
  const w = WORKS[id];
  if (!w) throw new Error("Unbekanntes Werk: " + id);
  const meta = imgMeta[id];
  const r = fitRect(box, meta ? meta.ratio : w.ratio, align, valign);
  const label = `${w.kuenstler}, ${w.titel}, ${w.jahr}`;
  if (meta) {
    slide.addImage({ path: meta.path, x: r.x, y: r.y, w: r.w, h: r.h, altText: label, objectName: "Werk " + id });
  } else {
    slide.addShape(pres.shapes.RECTANGLE, { x: r.x, y: r.y, w: r.w, h: r.h, fill: { color: PANEL }, line: { color: LINE, width: 1, dashType: "dash" }, objectName: "Bildplatzhalter " + id });
    const s = Math.min(0.55, r.h * 0.22);
    slide.addImage({ data: ICONS.TbPhoto_dim, x: r.x + (r.w - s) / 2, y: r.y + r.h / 2 - s - 0.05, w: s, h: s, altText: "Platzhalter-Symbol" });
    slide.addText([
      { text: "Abbildung einfügen", options: { bold: true, breakLine: true } },
      { text: `${w.kuenstler}: ${w.titel}` },
    ], { x: r.x + 0.15, y: r.y + r.h / 2 + 0.02, w: r.w - 0.3, h: Math.min(0.8, r.h / 2 - 0.1), fontFace: BODY, fontSize: 11, color: DIM, align: "center", valign: "top", margin: 0, isTextBox: true, fit: "shrink" });
  }
  if (frame) corners(slide, r);
  return r;
}

// Bildunterschrift: Künstler, Titel, Entstehungsjahr (+ Technik/Ort, + Merkmal)
function caption(slide, id, x, y, w, { details = true, merkmal = false, size = 13 } = {}) {
  const k = WORKS[id];
  const runs = [
    { text: `${k.kuenstler}, `, options: { bold: true, color: FG } },
    { text: k.titel, options: { bold: true, italic: true, color: FG } },
    { text: `${k.titel_de && k.titel_de !== k.titel ? " (" + k.titel_de + ")" : ""}, ${k.jahr}`, options: { bold: true, color: FG, breakLine: details || merkmal } },
  ];
  if (details) runs.push({ text: `${k.technik}, ${k.masse} · ${k.sammlung}`, options: { fontSize: size - 2, color: MUTED, breakLine: merkmal } });
  if (merkmal) runs.push({ text: "→ " + k.merkmal, options: { fontSize: size, color: ACC } });
  slide.addText(runs, { x, y, w, h: 0.25 + (details ? 0.25 : 0) + (merkmal ? 0.3 : 0) + 0.05, fontFace: BODY, fontSize: size, valign: "top", margin: 0, isTextBox: true, paraSpaceAfter: 2 });
}

function iconCircle(slide, name, x, y, d = 0.62) {
  slide.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: DEEP }, line: { color: ACC, width: 1.25 } });
  const s = d * 0.56;
  slide.addImage({ data: ICONS[name], x: x + (d - s) / 2, y: y + (d - s) / 2, w: s, h: s, altText: name.replace("Tb", "Symbol ") });
}

function header(slide, kicker, title) {
  slide.addText(kicker, { placeholder: "kicker" });
  slide.addText(title, { placeholder: "title" });
}

function contentSlide(section, kicker, title) {
  const s = pres.addSlide({ masterName: "INHALT", sectionTitle: section });
  header(s, kicker, title);
  return s;
}

// ---------- Folien ----------
async function build() {
  await loadIcons();
  await preloadImages();

  // 1 · Titel
  pres.addSection({ title: "Einstieg" });
  {
    const s = pres.addSlide({ masterName: "TITEL", sectionTitle: "Einstieg" });
    corners(s, { x: 0.85, y: 0.85, w: SW - 1.7, h: SH - 1.7 }, { gap: 0, len: 0.55, width: 2.5 });
    // Fokuspunkt in der Mitte des Suchers
    s.addShape(pres.shapes.LINE, { x: SW / 2 + 2.6, y: SH / 2 - 0.02, w: 0.36, h: 0, line: { color: DIM, width: 1 } });
    s.addShape(pres.shapes.LINE, { x: SW / 2 + 2.78, y: SH / 2 - 0.2, w: 0, h: 0.36, line: { color: DIM, width: 1 } });
    s.addText("REFERAT · KUNSTEPOCHEN", { x: 1.25, y: 1.2, w: 6, h: 0.3, fontFace: BODY, fontSize: 12, bold: true, charSpacing: 3, color: ACC, margin: 0, isTextBox: true });
    s.addText("1966 – HEUTE", { x: SW - 1.25 - 4, y: 1.2, w: 4, h: 0.3, fontFace: BODY, fontSize: 12, bold: true, charSpacing: 3, color: MUTED, align: "right", margin: 0, isTextBox: true });
    s.addText(T.titel.title, { placeholder: "title" });
    s.addText(T.titel.sub, { placeholder: "body" });
    s.addText(T.titel.byline, { x: 1.25, y: SH - 1.55, w: 7, h: 0.32, fontFace: BODY, fontSize: 14, color: MUTED, margin: 0, isTextBox: true });
    s.addText("● FOTO ODER MALEREI?", { x: SW - 1.25 - 4, y: SH - 1.55, w: 4, h: 0.32, fontFace: BODY, fontSize: 12, bold: true, charSpacing: 2, color: ACC, align: "right", margin: 0, isTextBox: true });
    s.addNotes(T.titel.notes);
  }

  // 2 · Einstieg: Foto oder Gemälde?
  {
    const s = pres.addSlide({ masterName: "BILD", sectionTitle: "Einstieg" });
    const r = art(s, T.einstieg.werk, { x: 5.0, y: 0.7, w: 7.73, h: 5.35 }, { align: "right", valign: "middle" });
    s.addText(T.einstieg.frage, { x: MX, y: 1.4, w: 4.0, h: 2.2, fontFace: HEAD, fontSize: 40, bold: true, color: FG, margin: 0, valign: "top", isTextBox: true });
    s.addText(T.einstieg.text, { x: MX, y: 3.75, w: 3.9, h: 1.4, fontFace: BODY, fontSize: 16, color: MUTED, margin: 0, valign: "top", isTextBox: true });
    caption(s, T.einstieg.werk, r.x, r.y + r.h + 0.2, Math.max(r.w, 5.5), { details: true });
    s.addNotes(T.einstieg.notes);
  }

  // 3 · Gliederung
  {
    const s = contentSlide("Einstieg", "ÜBERBLICK", "Gliederung");
    const cols = 3, gw = 3.85, gh = 2.05, gx = (CW - cols * gw) / (cols - 1), y0 = TOP + 0.15;
    T.gliederung.items.forEach((it, i) => {
      const c = i % cols, rr = Math.floor(i / cols);
      const x = MX + c * (gw + gx), y = y0 + rr * (gh + 0.35);
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: gw, h: gh, fill: { color: PANEL }, line: { color: PANEL, width: 0 } });
      s.addText(String(i + 1).padStart(2, "0"), { x: x + 0.3, y: y + 0.25, w: 1.2, h: 0.7, fontFace: HEAD, fontSize: 36, bold: true, color: ACC, margin: 0, isTextBox: true });
      s.addText([
        { text: it[0], options: { bold: true, fontSize: 18, color: FG, breakLine: true } },
        { text: it[1], options: { fontSize: 15, color: MUTED } },
      ], { x: x + 0.3, y: y + 1.0, w: gw - 0.6, h: gh - 1.15, fontFace: BODY, margin: 0, valign: "top", isTextBox: true, paraSpaceAfter: 3 });
    });
    s.addNotes(T.gliederung.notes);
  }

  // 4 · Zeitliche Einordnung (Zeitleiste)
  pres.addSection({ title: "Zeitliche Einordnung" });
  {
    const s = contentSlide("Zeitliche Einordnung", "01 · ZEITLICHE EINORDNUNG", T.zeit.title);
    const lineY = 4.1, x0 = 0.85, x1 = 10.15;
    const n = T.zeit.items.length, step = (x1 - x0) / (n - 1);
    s.addShape(pres.shapes.LINE, { x: MX, y: lineY, w: CW, h: 0, line: { color: LINE, width: 2 } });
    T.zeit.items.forEach((it, i) => {
      const x = x0 + i * step;
      const col = it.typ === "foto" ? ACC : it.typ === "hyper" ? COOL : DIM;
      const up = i % 2 === 0;
      s.addShape(pres.shapes.OVAL, { x: x - 0.11, y: lineY - 0.11, w: 0.22, h: 0.22, fill: { color: col }, line: { color: BG, width: 2 } });
      const tickY = up ? lineY - 0.5 : lineY + 0.15;
      s.addShape(pres.shapes.LINE, { x, y: tickY, w: 0, h: 0.35, line: { color: col, width: 1 } });
      const ty = up ? 1.95 : lineY + 0.6;
      s.addText([
        { text: it.jahr, options: { fontFace: HEAD, fontSize: 22, bold: true, color: col, breakLine: true } },
        { text: it.text, options: { fontFace: BODY, fontSize: 13, color: FG } },
      ], { x, y: ty, w: 2.85, h: 1.6, margin: 0, valign: up ? "bottom" : "top", isTextBox: true, paraSpaceAfter: 2 });
    });
    // Legende
    const lg = [["Kontext", DIM], ["Fotorealismus", ACC], ["Hyperrealismus", COOL]];
    lg.forEach(([t, col], i) => {
      const x = MX + i * 2.3;
      s.addShape(pres.shapes.OVAL, { x, y: 6.98 + 0.07, w: 0.16, h: 0.16, fill: { color: col }, line: { color: col, width: 0 } });
      s.addText(t, { x: x + 0.25, y: 6.98, w: 2.0, h: 0.3, fontFace: BODY, fontSize: 11, color: MUTED, margin: 0, valign: "middle", isTextBox: true });
    });
    s.addNotes(T.zeit.notes);
  }

  // 5 · Entwicklung (Vergleich)
  {
    const s = contentSlide("Zeitliche Einordnung", "01 · ENTWICKLUNG", T.entwicklung.title);
    const lw = 2.1, cw = (CW - lw - 0.3) / 2, y0 = TOP + 0.05, rh = 0.88;
    const cx = [MX + lw + 0.15, MX + lw + 0.15 + cw + 0.15];
    T.entwicklung.cols.forEach((c, i) => {
      const col = i === 0 ? ACC : COOL;
      s.addText([
        { text: c.name, options: { fontFace: HEAD, fontSize: 22, bold: true, color: col, breakLine: true } },
        { text: c.zeit, options: { fontFace: BODY, fontSize: 13, color: MUTED } },
      ], { x: cx[i] + 0.2, y: y0, w: cw - 0.4, h: 0.75, margin: 0, valign: "top", isTextBox: true });
    });
    s.addImage({ data: ICONS.TbArrowRight, x: cx[1] - 0.3, y: y0 + 0.12, w: 0.42, h: 0.42, altText: "Pfeil: Entwicklung" });
    T.entwicklung.rows.forEach((row, j) => {
      const y = y0 + 0.95 + j * (rh + 0.1);
      s.addText(row[0], { x: MX, y, w: lw, h: rh, fontFace: BODY, fontSize: 14, bold: true, color: MUTED, margin: 0, valign: "middle", isTextBox: true });
      [1, 2].forEach((k) => {
        s.addShape(pres.shapes.RECTANGLE, { x: cx[k - 1], y, w: cw, h: rh, fill: { color: PANEL }, line: { color: PANEL, width: 0 } });
        s.addText(row[k], { x: cx[k - 1] + 0.2, y, w: cw - 0.4, h: rh, fontFace: BODY, fontSize: 14, color: FG, margin: 0, valign: "middle", isTextBox: true });
      });
    });
    s.addNotes(T.entwicklung.notes);
  }

  // 6 · Merkmale – Überblick
  pres.addSection({ title: "Merkmale" });
  {
    const s = contentSlide("Merkmale", "02 · ZUSAMMENFASSENDE MERKMALE", T.merkmale.title);
    const cols = 3, gw = 3.85, gh = 2.2, gx = (CW - cols * gw) / (cols - 1);
    T.merkmale.items.forEach((it, i) => {
      const c = i % cols, rr = Math.floor(i / cols);
      const x = MX + c * (gw + gx), y = TOP + 0.05 + rr * (gh + 0.3);
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: gw, h: gh, fill: { color: PANEL }, line: { color: PANEL, width: 0 } });
      iconCircle(s, it.icon, x + 0.25, y + 0.25);
      s.addText(it.t, { x: x + 1.05, y: y + 0.25, w: gw - 1.25, h: 0.62, fontFace: BODY, fontSize: 17, bold: true, color: FG, margin: 0, valign: "middle", isTextBox: true });
      s.addText(it.d, { x: x + 0.25, y: y + 1.05, w: gw - 0.5, h: gh - 1.2, fontFace: BODY, fontSize: 16, color: MUTED, margin: 0, valign: "top", isTextBox: true });
    });
    s.addNotes(T.merkmale.notes);
  }

  // 7 · Merkmale am Bildbeispiel 1
  {
    const B = T.beleg1;
    const s = contentSlide("Merkmale", "02 · MERKMALE AM BILDBEISPIEL", B.title);
    const r = art(s, B.werk, { x: MX + 0.1, y: TOP + 0.1, w: 7.2, h: 4.25 }, { align: "left", valign: "top" });
    caption(s, B.werk, r.x, r.y + r.h + 0.22, 7.2, { details: true });
    const x = 8.45, w = SW - MX - x;
    B.punkte.forEach((p, i) => {
      const y = TOP + 0.05 + i * 0.95;
      s.addShape(pres.shapes.OVAL, { x, y: y + 0.02, w: 0.42, h: 0.42, fill: { color: ACC }, line: { color: ACC, width: 0 } });
      s.addText(String(i + 1), { x, y: y + 0.02, w: 0.42, h: 0.42, fontFace: BODY, fontSize: 14, bold: true, color: BG, align: "center", valign: "middle", margin: 0, isTextBox: true });
      s.addText([
        { text: p[0], options: { bold: true, color: FG, breakLine: true } },
        { text: p[1], options: { color: MUTED, fontSize: 13 } },
      ], { x: x + 0.6, y, w: w - 0.6, h: 0.85, fontFace: BODY, fontSize: 15, margin: 0, valign: "top", isTextBox: true });
    });
    s.addNotes(B.notes);
  }

  // 8 · Merkmale am Bildbeispiel 2
  {
    const B = T.beleg2;
    const s = contentSlide("Merkmale", "02 · MERKMALE AM BILDBEISPIEL", B.title);
    const r = art(s, B.werk, { x: MX + 0.1, y: TOP + 0.1, w: 4.4, h: 4.25 }, { align: "left", valign: "top" });
    caption(s, B.werk, MX + 0.1, r.y + r.h + 0.22, 6.0, { details: true });
    const x = 5.9;
    s.addText(B.stat, { x, y: TOP, w: 3.2, h: 1.0, fontFace: HEAD, fontSize: 60, bold: true, color: ACC, margin: 0, valign: "top", isTextBox: true });
    s.addText(B.statLabel, { x, y: TOP + 1.05, w: 3.0, h: 0.8, fontFace: BODY, fontSize: 14, color: MUTED, margin: 0, valign: "top", isTextBox: true });
    s.addText(B.stat2, { x, y: TOP + 2.2, w: 3.2, h: 1.0, fontFace: HEAD, fontSize: 60, bold: true, color: ACC, margin: 0, valign: "top", isTextBox: true });
    s.addText(B.stat2Label, { x, y: TOP + 3.25, w: 3.0, h: 0.8, fontFace: BODY, fontSize: 14, color: MUTED, margin: 0, valign: "top", isTextBox: true });
    const x2 = 9.3, w2 = SW - MX - x2;
    B.punkte.forEach((p, i) => {
      const y = TOP + 0.05 + i * 1.2;
      s.addText([
        { text: p[0], options: { bold: true, color: FG, breakLine: true } },
        { text: p[1], options: { color: MUTED, fontSize: 13 } },
      ], { x: x2, y, w: w2, h: 1.1, fontFace: BODY, fontSize: 15, margin: 0, valign: "top", isTextBox: true });
    });
    s.addNotes(B.notes);
  }

  // 9 · Arbeitsweise
  {
    const A = T.arbeitsweise;
    const s = contentSlide("Merkmale", "02 · TECHNIK & DEFINITION", A.title);
    const n = A.schritte.length, gw = 2.55, gap = (CW - n * gw) / (n - 1), y = TOP + 0.05;
    A.schritte.forEach((st, i) => {
      const x = MX + i * (gw + gap);
      iconCircle(s, st.icon, x, y, 0.75);
      s.addText([
        { text: `${i + 1}  ${st.t}`, options: { bold: true, fontSize: 17, color: FG, breakLine: true } },
        { text: st.d, options: { fontSize: 14, color: MUTED } },
      ], { x, y: y + 0.95, w: gw, h: 1.45, fontFace: BODY, margin: 0, valign: "top", isTextBox: true, paraSpaceAfter: 3 });
      if (i < n - 1) s.addImage({ data: ICONS.TbArrowRight_dim, x: x + gw + (gap - 0.4) / 2, y: y + 0.17, w: 0.4, h: 0.4, altText: "Pfeil" });
    });
    // Definition nach Meisel
    const by = 4.55, bh = 2.2;
    s.addShape(pres.shapes.RECTANGLE, { x: MX, y: by, w: CW, h: bh, fill: { color: PANEL }, line: { color: PANEL, width: 0 } });
    s.addText(A.defTitel, { x: MX + 0.3, y: by + 0.2, w: CW - 0.6, h: 0.4, fontFace: BODY, fontSize: 15, bold: true, color: ACC, margin: 0, isTextBox: true });
    const half = Math.ceil(A.kriterien.length / 2);
    [A.kriterien.slice(0, half), A.kriterien.slice(half)].forEach((list, k) => {
      s.addText(list.map((t, j) => ({ text: t, options: { breakLine: j < list.length - 1 } })), {
        x: MX + 0.3 + k * (CW / 2), y: by + 0.7, w: CW / 2 - 0.6, h: bh - 0.85, fontFace: BODY, fontSize: 14, color: FG, margin: 0, valign: "top", isTextBox: true, paraSpaceAfter: 6,
      });
    });
    s.addNotes(A.notes);
  }

  // 10 · Motive
  pres.addSection({ title: "Motive" });
  {
    const M = T.motive;
    const s = contentSlide("Motive", "03 · MOTIVE", M.title);
    const cols = 3, gw = 3.85, gh = 2.2, gx = (CW - cols * gw) / (cols - 1);
    M.items.forEach((it, i) => {
      const c = i % cols, rr = Math.floor(i / cols);
      const x = MX + c * (gw + gx), y = TOP + 0.05 + rr * (gh + 0.3);
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: gw, h: gh, fill: { color: PANEL }, line: { color: PANEL, width: 0 } });
      iconCircle(s, it.icon, x + 0.25, y + 0.25);
      s.addText(it.t, { x: x + 1.05, y: y + 0.25, w: gw - 1.25, h: 0.62, fontFace: BODY, fontSize: 17, bold: true, color: FG, margin: 0, valign: "middle", isTextBox: true });
      s.addText([
        { text: it.d, options: { color: MUTED, breakLine: true } },
        { text: it.k, options: { color: ACC, bold: true } },
      ], { x: x + 0.25, y: y + 1.0, w: gw - 0.5, h: gh - 1.1, fontFace: BODY, fontSize: 15, margin: 0, valign: "top", isTextBox: true, paraSpaceAfter: 4 });
    });
    s.addNotes(M.notes);
  }

  // 11/12 · Hauptvertreter
  pres.addSection({ title: "Hauptvertreter" });
  for (const H of [T.vertreterFoto, T.vertreterHyper]) {
    const s = contentSlide("Hauptvertreter", H.kicker, H.title);
    const col = H.cool ? COOL : ACC;
    const cols = 3, gw = 3.85, gh = 2.2, gx = (CW - cols * gw) / (cols - 1);
    H.items.forEach((it, i) => {
      const c = i % cols, rr = Math.floor(i / cols);
      const x = MX + c * (gw + gx), y = TOP + 0.05 + rr * (gh + 0.3);
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: gw, h: gh, fill: { color: PANEL }, line: { color: PANEL, width: 0 } });
      s.addText(it.name, { x: x + 0.3, y: y + 0.25, w: gw - 0.6, h: 0.45, fontFace: HEAD, fontSize: 20, bold: true, color: FG, margin: 0, valign: "top", isTextBox: true });
      s.addText(it.daten, { x: x + 0.3, y: y + 0.72, w: gw - 0.6, h: 0.3, fontFace: BODY, fontSize: 13, bold: true, color: col, margin: 0, valign: "top", isTextBox: true });
      s.addText(it.d, { x: x + 0.3, y: y + 1.1, w: gw - 0.6, h: gh - 1.25, fontFace: BODY, fontSize: 16, color: MUTED, margin: 0, valign: "top", isTextBox: true });
    });
    s.addNotes(H.notes);
  }

  // 13–17 · Werkbeispiele (Paare)
  pres.addSection({ title: "Werkbeispiele" });
  for (const P of T.paare) {
    const s = contentSlide("Werkbeispiele", P.kicker, P.title);
    const bw = (CW - 0.5) / 2, bh = 3.55;
    P.werke.forEach((id, i) => {
      const x = MX + i * (bw + 0.5);
      const r = art(s, id, { x: x + 0.1, y: TOP + 0.1, w: bw - 0.2, h: bh }, { align: "left", valign: "bottom" });
      caption(s, id, x + 0.1, TOP + 0.1 + bh + 0.25, bw - 0.2, { details: true, merkmal: true });
    });
    s.addNotes(P.notes);
  }

  // 18 · Fazit
  pres.addSection({ title: "Fazit & Quellen" });
  {
    const F = T.fazit;
    const s = contentSlide("Fazit & Quellen", "06 · FAZIT", F.title);
    // Diskussionsfrage links
    s.addShape(pres.shapes.RECTANGLE, { x: MX, y: TOP + 0.05, w: 5.0, h: 4.85, fill: { color: PANEL }, line: { color: PANEL, width: 0 } });
    s.addImage({ data: ICONS.TbQuote, x: MX + 0.35, y: TOP + 0.35, w: 0.6, h: 0.6, altText: "Zitat-Symbol" });
    s.addText(F.frage, { x: MX + 0.35, y: TOP + 1.15, w: 4.3, h: 2.6, fontFace: HEAD, fontSize: 28, bold: true, color: FG, margin: 0, valign: "top", isTextBox: true });
    s.addText(F.frageSub, { x: MX + 0.35, y: TOP + 3.85, w: 4.3, h: 0.8, fontFace: BODY, fontSize: 14, color: MUTED, margin: 0, valign: "top", isTextBox: true });
    const x = MX + 5.5, w = CW - 5.5;
    F.punkte.forEach((p, i) => {
      const y = TOP + 0.05 + i * 1.65;
      iconCircle(s, p.icon, x, y);
      s.addText([
        { text: p.t, options: { bold: true, fontSize: 17, color: FG, breakLine: true } },
        { text: p.d, options: { fontSize: 14, color: MUTED } },
      ], { x: x + 0.85, y, w: w - 0.85, h: 1.5, fontFace: BODY, margin: 0, valign: "top", isTextBox: true, paraSpaceAfter: 3 });
    });
    s.addNotes(F.notes);
  }

  // 19 · Quellen (Text)
  {
    const Q = T.quellen;
    const s = contentSlide("Fazit & Quellen", "QUELLEN", Q.title);
    [["Literatur", Q.literatur], ["Internet", Q.internet]].forEach(([h, list], k) => {
      const x = MX + k * (CW / 2 + 0.15), w = CW / 2 - 0.15;
      s.addText(h, { x, y: TOP, w, h: 0.4, fontFace: BODY, fontSize: 15, bold: true, color: ACC, margin: 0, isTextBox: true });
      s.addText(list.map((t, j) => ({ text: t, options: { breakLine: j < list.length - 1 } })), {
        x, y: TOP + 0.5, w, h: 4.4, fontFace: BODY, fontSize: 11, color: FG, margin: 0, valign: "top", isTextBox: true, paraSpaceAfter: 6,
      });
    });
    s.addNotes(Q.notes);
  }

  // 20 · Bildnachweise
  {
    const Q = T.bildnachweise;
    const s = contentSlide("Fazit & Quellen", "QUELLEN", Q.title);
    const list = Q.items;
    const half = Math.ceil(list.length / 2);
    [list.slice(0, half), list.slice(half)].forEach((part, k) => {
      const x = MX + k * (CW / 2 + 0.15), w = CW / 2 - 0.15;
      s.addText(part.map((t, j) => ({ text: t, options: { breakLine: j < part.length - 1 } })), {
        x, y: TOP, w, h: 4.9, fontFace: BODY, fontSize: 10, color: FG, margin: 0, valign: "top", isTextBox: true, paraSpaceAfter: 5,
      });
    });
    s.addNotes(Q.notes);
  }

  await pres.writeFile({ fileName: OUT });
  if (SKILL) {
    const { applyTheme } = require(path.join(SKILL, "scripts/apply_theme.js"));
    await applyTheme(OUT, THEME);
  }
  console.log("Geschrieben:", OUT, "| Bilder vorhanden:", Object.keys(imgMeta).length, "von", Object.keys(WORKS).length);
}

build().catch((e) => { console.error(e); process.exit(1); });

// Baut das Handout (eine A4-Seite, beidseitig = 2 Druckseiten) als .docx.
// Aufruf: NODE_PATH=<node_modules> node src/build_handout.js
const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, BorderStyle,
  ShadingType, AlignmentType, LineRuleType, VerticalAlign, ImageRun, LevelFormat, PageBreak, HeightRule, TableLayoutType,
} = require("docx");
const W = require("./works.js");
const T = require("./texts.js");
const H = require("./handout_texts.js");

const ROOT = path.resolve(__dirname, "..");
const IMG_DIR = path.join(ROOT, "bilder");
const OUT = path.join(ROOT, "Handout_Fotorealismus_Hyperrealismus.docx");

const HEAD = "Georgia", BODY = "Arial";
const INK = "1A1A1A", MUTED = "5A5A5A", ACC = "B07400", RULE = "BFBFBF";
const FOTO_BG = "FDF0CC", HYPER_BG = "DDF0F6", ROW_BG = "F3F3F3";
const MARGIN = 794; // 1,4 cm
const PAGE_W = 11906, CONTENT_W = PAGE_W - 2 * MARGIN;

const none = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const NOB = { top: none, bottom: none, left: none, right: none, insideHorizontal: none, insideVertical: none };
const thin = { style: BorderStyle.SINGLE, size: 4, color: RULE };
const GRID = { top: thin, bottom: thin, left: none, right: none, insideHorizontal: thin, insideVertical: none };

const run = (text, o = {}) => new TextRun({ text, font: o.font || BODY, size: o.size || 18, bold: o.bold, italics: o.italics, color: o.color || INK });
const para = (children, o = {}) => new Paragraph({ children: Array.isArray(children) ? children : [children], spacing: { before: o.before || 0, after: o.after ?? 40, line: o.line || 252, lineRule: LineRuleType.AUTO }, alignment: o.align, numbering: o.numbering, keepNext: o.keepNext });

function heading(num, text) {
  return new Paragraph({
    children: [run(num + "  ", { font: HEAD, size: 24, bold: true, color: ACC }), run(text, { font: HEAD, size: 24, bold: true })],
    spacing: { before: 150, after: 70 },
    keepNext: true,
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: RULE, space: 2 } },
  });
}

function cell(children, width, o = {}) {
  return new TableCell({
    children: Array.isArray(children) ? children : [children],
    width: { size: width, type: WidthType.DXA },
    shading: o.fill ? { fill: o.fill, type: ShadingType.CLEAR, color: "auto" } : undefined,
    margins: { top: o.mt ?? 40, bottom: o.mb ?? 40, left: o.ml ?? 90, right: o.mr ?? 90 },
    verticalAlign: o.valign || VerticalAlign.TOP,
    columnSpan: o.span,
  });
}

function table(widths, rows, borders = GRID) {
  return new Table({
    width: { size: widths.reduce((a, b) => a + b, 0), type: WidthType.DXA },
    columnWidths: widths,
    layout: TableLayoutType.FIXED,
    borders,
    rows,
  });
}

function findImage(id) {
  for (const ext of ["jpg", "jpeg", "png"]) {
    const p = path.join(IMG_DIR, `${id}.${ext}`);
    if (fs.existsSync(p)) return { p, type: ext === "png" ? "png" : "jpg" };
  }
  return null;
}

function imageSize(buf, type) {
  if (type === "png") return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
  let i = 2;
  while (i < buf.length) {
    const m = buf[i + 1], len = buf.readUInt16BE(i + 2);
    if (m >= 0xc0 && m <= 0xc3) return { h: buf.readUInt16BE(i + 5), w: buf.readUInt16BE(i + 7) };
    i += 2 + len;
  }
  return null;
}

// Werk-Abbildung (oder Platzhalter) in fester Box: maxW × maxH Pixel (96 dpi)
function artBlock(id, maxW, maxH) {
  const k = W[id];
  const f = findImage(id);
  let ratio = k.ratio;
  let img = null;
  if (f) {
    const buf = fs.readFileSync(f.p);
    const d = imageSize(buf, f.type);
    if (d) ratio = d.w / d.h;
    img = { buf, type: f.type };
  }
  let w = maxW, h = w / ratio;
  if (h > maxH) { h = maxH; w = h * ratio; }
  if (img) {
    return [new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 60 }, children: [new ImageRun({ type: img.type, data: img.buf, transformation: { width: Math.round(w), height: Math.round(h) }, altText: { title: k.titel, description: `${k.kuenstler}, ${k.titel}, ${k.jahr}`, name: id } })] })];
  }
  // Platzhalter als graue Box mit fester Höhe
  const twW = Math.round(w * 15), twH = Math.round(h * 15);
  return [new Table({
    width: { size: twW, type: WidthType.DXA }, columnWidths: [twW], layout: TableLayoutType.FIXED, alignment: AlignmentType.CENTER,
    borders: { top: thin, bottom: thin, left: thin, right: thin, insideHorizontal: none, insideVertical: none },
    rows: [new TableRow({
      height: { value: twH, rule: HeightRule.EXACT },
      children: [cell([para(run("Abbildung einfügen", { size: 14, color: MUTED, bold: true }), { align: AlignmentType.CENTER, after: 0 }), para(run(k.titel, { size: 14, color: MUTED, italics: true }), { align: AlignmentType.CENTER, after: 0 })], twW, { fill: "EDEDED", valign: VerticalAlign.CENTER })],
    })],
  }), para(run(""), { after: 40 })];
}

function bullets(items, ref = "bullets") {
  return items.map((it) => new Paragraph({
    numbering: { reference: ref, level: 0 },
    spacing: { after: 30, line: 247 },
    children: Array.isArray(it) ? it : [run(it)],
  }));
}

function build() {
  const children = [];

  // ---------- Kopf ----------
  children.push(table([CONTENT_W * 0.7, CONTENT_W * 0.3].map(Math.round), [new TableRow({ children: [
    cell([
      para(run("HANDOUT · REFERAT KUNSTEPOCHEN", { size: 15, bold: true, color: ACC }), { after: 20 }),
      para(run("Fotorealismus & Hyperrealismus", { font: HEAD, size: 34, bold: true }), { after: 0, line: 240 }),
    ], Math.round(CONTENT_W * 0.7), { ml: 0 }),
    cell([
      para(run("Name: ___________________", { size: 16, color: MUTED }), { after: 50, align: AlignmentType.RIGHT }),
      para(run("Kurs: ____________  Datum: __________", { size: 16, color: MUTED }), { after: 0, align: AlignmentType.RIGHT }),
    ], Math.round(CONTENT_W * 0.3), { mr: 0, valign: VerticalAlign.BOTTOM }),
  ] })], NOB));
  children.push(para(run(H.leitfrage, { size: 18, italics: true, color: MUTED }), { before: 60, after: 0 }));

  // ---------- 1 Zeitliche Einordnung ----------
  children.push(heading("1", "Zeitliche Einordnung und Entwicklung"));
  children.push(para(run(H.einordnung), { after: 70 }));
  const tl = T.zeit.items;
  const tw = [1250, CONTENT_W - 1250];
  children.push(table(tw, tl.map((it, i) => new TableRow({ children: [
    cell(para(run(it.jahr, { bold: true, color: it.typ === "hyper" ? "1F6F8B" : it.typ === "foto" ? ACC : MUTED }), { after: 0 }), tw[0], { fill: i % 2 ? undefined : ROW_BG, mt: 25, mb: 25 }),
    cell(para(run(H.zeitLang[i] || it.text), { after: 0 }), tw[1], { fill: i % 2 ? undefined : ROW_BG, mt: 25, mb: 25 }),
  ] }))));

  children.push(para(run("Entwicklung: vom Fotorealismus zum Hyperrealismus", { bold: true }), { before: 110, after: 50, keepNext: true }));
  const cw = [1900, Math.round((CONTENT_W - 1900) / 2), CONTENT_W - 1900 - Math.round((CONTENT_W - 1900) / 2)];
  const E = T.entwicklung;
  const headRow = new TableRow({ tableHeader: true, children: [
    cell(para(run(""), { after: 0 }), cw[0]),
    cell(para([run(E.cols[0].name, { bold: true }), run("  " + E.cols[0].zeit, { size: 15, color: MUTED })], { after: 0 }), cw[1], { fill: FOTO_BG }),
    cell(para([run(E.cols[1].name, { bold: true }), run("  " + E.cols[1].zeit, { size: 15, color: MUTED })], { after: 0 }), cw[2], { fill: HYPER_BG }),
  ] });
  children.push(table(cw, [headRow, ...E.rows.map((r) => new TableRow({ children: [
    cell(para(run(r[0], { bold: true, color: MUTED }), { after: 0 }), cw[0], { mt: 30, mb: 30 }),
    cell(para(run(r[1]), { after: 0 }), cw[1], { mt: 30, mb: 30 }),
    cell(para(run(r[2]), { after: 0 }), cw[2], { mt: 30, mb: 30 }),
  ] }))]));

  // ---------- 2 Merkmale ----------
  children.push(heading("2", "Zusammenfassende Merkmale"));
  children.push(...bullets(H.merkmale.map(([b, t]) => [run(b + ": ", { bold: true }), run(t)])));
  children.push(para([run("Definition nach Louis K. Meisel (1980): ", { bold: true }), run(H.meisel)], { before: 70, after: 0 }));

  // ---------- Seite 2 ----------
  children.push(new Paragraph({ children: [new PageBreak()], spacing: { after: 0 } }));

  // ---------- 3 Motive ----------
  children.push(heading("3", "Motive"));
  const half = Math.ceil(H.motive.length / 2);
  const mw = [Math.round(CONTENT_W / 2), CONTENT_W - Math.round(CONTENT_W / 2)];
  children.push(table(mw, [new TableRow({ children: [
    cell(bullets(H.motive.slice(0, half).map(([b, t]) => [run(b + ": ", { bold: true }), run(t)])), mw[0], { ml: 0 }),
    cell(bullets(H.motive.slice(half).map(([b, t]) => [run(b + ": ", { bold: true }), run(t)])), mw[1]),
  ] })], NOB));

  // ---------- 4 Hauptvertreter ----------
  children.push(heading("4", "Hauptvertreter"));
  const VF = T.vertreterFoto.items, VH = T.vertreterHyper.items;
  const vw = [Math.round(CONTENT_W / 2) - 60, 120, CONTENT_W - (Math.round(CONTENT_W / 2) - 60) - 120];
  const vcell = (it, w, fill) => cell([
    para([run(it.name, { bold: true }), run("  " + it.daten, { size: 15, color: MUTED })], { after: 0 }),
    para(run(it.d, { size: 16, color: INK }), { after: 0 }),
  ], w, { fill, mt: 30, mb: 30 });
  const vrows = [new TableRow({ children: [
    cell(para(run("Fotorealismus", { bold: true }), { after: 0 }), vw[0], { fill: FOTO_BG }),
    cell(para(run(""), { after: 0 }), vw[1]),
    cell(para(run("Hyperrealismus", { bold: true }), { after: 0 }), vw[2], { fill: HYPER_BG }),
  ] })];
  for (let i = 0; i < Math.max(VF.length, VH.length); i++) {
    vrows.push(new TableRow({ children: [
      VF[i] ? vcell(VF[i], vw[0]) : cell(para(run("")), vw[0]),
      cell(para(run(""), { after: 0 }), vw[1]),
      VH[i] ? vcell(VH[i], vw[2]) : cell(para(run("")), vw[2]),
    ] }));
  }
  children.push(table(vw, vrows, { ...GRID }));

  // ---------- 5 Werkbeispiele ----------
  children.push(heading("5", "Werkbeispiele"));
  const ids = H.werke;
  const gap = 200;
  const ww = Math.floor((CONTENT_W - gap * (ids.length - 1)) / ids.length);
  const wcells = [];
  ids.forEach((id, i) => {
    const k = W[id];
    wcells.push(cell([
      ...artBlock(id, ww / 15 - 6, 150),
      para([run(`Abb. ${i + 1}: `, { bold: true, color: ACC, size: 16 }), run(`${k.kuenstler}, `, { bold: true, size: 16 }), run(k.titel, { bold: true, italics: true, size: 16 }), run(`, ${k.jahr}`, { bold: true, size: 16 })], { after: 20 }),
      para(run(`${k.technik}, ${k.masse}; ${k.sammlung}`, { size: 14, color: MUTED }), { after: 30 }),
      para(run(H.werkText[id], { size: 16 }), { after: 0 }),
    ], ww, { ml: 0, mr: 0 }));
    if (i < ids.length - 1) wcells.push(cell(para(run("")), gap, { ml: 0, mr: 0 }));
  });
  const widths = [];
  ids.forEach((_, i) => { widths.push(ww); if (i < ids.length - 1) widths.push(gap); });
  children.push(table(widths, [new TableRow({ children: wcells })], NOB));

  // ---------- Diskussionsfrage ----------
  children.push(table([CONTENT_W], [new TableRow({ children: [cell([
    para([run("Zum Nachdenken: ", { bold: true, color: ACC }), run(T.fazit.frage, { bold: true })], { after: 30 }),
    para(run(H.fazitText, { size: 16, color: MUTED }), { after: 0 }),
  ], CONTENT_W, { fill: ROW_BG, mt: 90, mb: 90, ml: 140, mr: 140 })] })], NOB));

  const doc = new Document({
    creator: "Referat Kunst",
    title: "Handout: Fotorealismus & Hyperrealismus",
    styles: { default: { document: { run: { font: BODY, size: 18, color: INK } } } },
    numbering: { config: [{ reference: "bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "▪", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 260, hanging: 200 } }, run: { color: ACC } } }] }] },
    sections: [{
      properties: { page: { size: { width: PAGE_W, height: 16838 }, margin: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN } } },
      children,
    }],
  });
  return Packer.toBuffer(doc).then((buf) => { fs.writeFileSync(OUT, buf); console.log("Geschrieben:", OUT); });
}

build().catch((e) => { console.error(e); process.exit(1); });

// Folientexte und Sprechernotizen (Vortragstext) – Deutsch
const W = require("./works.js");
const cap = (id) => `${W[id].kuenstler}, „${W[id].titel}“, ${W[id].jahr}`;

module.exports = {
  titel: {
    title: "Fotorealismus &\nHyperrealismus",
    sub: "Wirklicher als die Wirklichkeit?",
    byline: "Name · Kurs · Datum",
    notes:
      "Begrüßung. Mein Referat handelt vom Fotorealismus und vom Hyperrealismus – zwei Kunstrichtungen, bei denen Gemälde und Skulpturen so echt aussehen, dass man sie für Fotos oder echte Menschen halten kann. " +
      "Die Leitfrage lautet: Wirklicher als die Wirklichkeit? (ca. 20 Sekunden)",
  },

  einstieg: {
    werk: "goings_diner",
    frage: "Foto oder Gemälde?",
    text: "Schaut genau hin: Woran würdet ihr den Unterschied erkennen?",
    notes:
      "Kurz ins Publikum fragen: Ist das ein Foto oder ein Gemälde? – Auflösung: Es ist ein Gemälde! " +
      `${cap("goings_diner")}. ` +
      "Jedes Detail – das Chrom, die Spiegelungen, die Ketchupflasche – ist von Hand gemalt. Genau diese Verwechslungsgefahr ist das Thema des Fotorealismus. (ca. 40 Sekunden)",
  },

  gliederung: {
    items: [
      ["Zeitliche Einordnung", "Entstehung und Entwicklung"],
      ["Merkmale", "nachgewiesen an Bildbeispielen"],
      ["Motive", "Was wird dargestellt?"],
      ["Hauptvertreter", "Foto- und Hyperrealismus"],
      ["Werkbeispiele", "von 1966 bis heute"],
      ["Fazit", "Bedeutung, Kritik und Diskussion"],
    ],
    notes:
      "Zuerst ordne ich die Epoche zeitlich ein und zeige, wie sie sich entwickelt hat. Dann stelle ich die typischen Merkmale vor und weise sie an zwei Bildern nach. " +
      "Danach geht es um die Motive und die wichtigsten Künstlerinnen und Künstler. Anschließend zeige ich weitere Werkbeispiele, und am Ende ziehe ich ein Fazit. Die Quellen stehen auf den letzten beiden Folien. (ca. 20 Sekunden)",
  },

  zeit: {
    title: "Entstanden Ende der 1960er-Jahre in den USA",
    items: [
      { jahr: "1960er", typ: "kontext", text: "Pop Art holt Werbung, Konsum und Medienbilder in die Kunst." },
      { jahr: "1966", typ: "foto", text: "Malcolm Morley malt ein Schiff nach einer Postkarte – ein frühes Schlüsselwerk." },
      { jahr: "1969", typ: "foto", text: "Galerist Louis K. Meisel prägt den Begriff „Photo-Realism“." },
      { jahr: "1972", typ: "foto", text: "documenta 5 in Kassel: Durchbruch in Europa." },
      { jahr: "1973", typ: "hyper", text: "Ausstellung in Brüssel (Galerie Isy Brachot) prägt „Hyperrealismus“." },
      { jahr: "1980", typ: "foto", text: "Meisels Buch „Photorealism“ legt fünf Kriterien fest." },
      { jahr: "ab 2000", typ: "hyper", text: "Hyperrealismus boomt: Digitalfotos, Skulpturen aus Silikon." },
    ],
    notes:
      "Der Fotorealismus entsteht Ende der 1960er-Jahre in den USA, vor allem in Kalifornien und New York. Vorher hat die Pop Art schon Werbung und Alltagsbilder in die Kunst geholt – daran knüpfen die Fotorealisten an, wenden sich aber gegen die damals vorherrschende abstrakte Malerei. " +
      "1966 malt Malcolm Morley ein Kreuzfahrtschiff nach einer Postkarte – das gilt als eines der ersten Werke dieser Art. 1969 prägt der New Yorker Galerist Louis K. Meisel den Begriff „Photo-Realism“. " +
      "Den Durchbruch in Europa bringt 1972 die documenta 5 in Kassel. 1973 taucht in Brüssel der Begriff „Hyperrealismus“ auf. 1980 legt Meisel in seinem Buch fünf Kriterien fest. " +
      "Seit etwa 2000 erlebt der Hyperrealismus einen Boom – durch digitale Fotografie und neue Materialien wie Silikon. (ca. 70 Sekunden)",
  },

  entwicklung: {
    title: "Vom Fotorealismus zum Hyperrealismus",
    cols: [
      { name: "Fotorealismus", zeit: "ca. 1966–1980 · zuerst USA, dann Europa" },
      { name: "Hyperrealismus", zeit: "Begriff seit 1973 · Blüte seit ca. 2000 · weltweit" },
    ],
    rows: [
      ["Haltung", "kühl, neutral, dokumentarisch – ohne Wertung", "emotional, erzählerisch, oft gesellschaftskritisch"],
      ["Umgang mit dem Foto", "überträgt das Foto genau – samt Unschärfe und Spiegelungen", "übertrifft das Foto: noch schärfer, größer, detailreicher"],
      ["Medien", "vor allem Malerei (Acryl, Öl, Airbrush)", "Malerei, Zeichnung und Skulptur (Silikon, Kunsthaar)"],
      ["Motive", "amerikanischer Alltag: Stadt, Autos, Diner, Konsum", "Menschen, Haut, Wasser, Glas – oft überhöht oder rätselhaft"],
    ],
    notes:
      "Wie hängen die beiden Begriffe zusammen? Oft werden sie gleichbedeutend verwendet, man kann aber eine Entwicklung erkennen. " +
      "Der Fotorealismus ist kühl und neutral: Er überträgt das Foto möglichst genau, sogar mit fotografischen Fehlern wie Unschärfe. Gemalt werden vor allem Szenen aus dem amerikanischen Alltag. " +
      "Der Hyperrealismus geht einen Schritt weiter: Die Werke sind oft noch detailreicher als jedes Foto, sie erzählen Geschichten, wecken Gefühle oder üben Kritik. Außerdem gibt es nun auch hyperrealistische Skulpturen. (ca. 50 Sekunden)",
  },

  merkmale: {
    title: "Malen wie eine Kamera",
    items: [
      { icon: "TbCamera", t: "Foto als Vorlage", d: "Kamera statt Skizzenbuch: gemalt wird nach Fotos oder Dias, nicht vor dem Motiv." },
      { icon: "TbGrid3X3", t: "Mechanische Übertragung", d: "Rasternetz oder Projektor übertragen das Foto exakt auf die Leinwand." },
      { icon: "TbSpray", t: "Keine Handschrift", d: "Glatte Oberfläche ohne sichtbare Pinselspuren – oft mit Airbrush und dünnen Schichten." },
      { icon: "TbFocus2", t: "Fotografischer Blick", d: "Ausschnitt, Licht, Spiegelungen und sogar Unschärfe werden vom Foto übernommen." },
      { icon: "TbArrowsMaximize", t: "Großformat", d: "Viele Werke sind mehrere Meter groß – die Fülle an Details überwältigt." },
      { icon: "TbBuildingStore", t: "Alltag & Neutralität", d: "Banale Motive, kühl und ohne erkennbare Wertung dargestellt." },
    ],
    notes:
      "Diese sechs Merkmale fassen zusammen, woran man Fotorealismus erkennt. Erstens: Die Vorlage ist immer ein Foto. Zweitens: Das Foto wird mechanisch übertragen, zum Beispiel mit einem Raster oder einem Projektor. " +
      "Drittens: Man sieht keine Handschrift des Künstlers, also keine Pinselspuren. Viertens: Der Blick ist fotografisch – Ausschnitt, Spiegelungen und sogar Unschärfen stammen aus dem Foto. " +
      "Fünftens: Die Bilder sind oft riesig. Und sechstens: Die Motive kommen aus dem Alltag und werden neutral, ohne Bewertung, gezeigt. Zwei dieser Merkmale weise ich jetzt an Bildbeispielen nach. (ca. 60 Sekunden)",
  },

  beleg1: {
    werk: "estes_booths",
    title: "Am Bildbeispiel: Spiegelung und Schärfe",
    punkte: [
      ["Spiegelungen", "Glas und Metall spiegeln die Straße – zentrales Motiv bei Estes."],
      ["Durchgehende Schärfe", "Vorne und hinten ist alles gleich scharf."],
      ["Keine Handschrift", "Glatte Acrylmalerei ohne sichtbaren Pinselstrich."],
      ["Alltagsmotiv", "Telefonzellen in New York – banal und kühl beobachtet."],
      ["Foto als Vorlage", "Estes arbeitet nach eigenen Fotos und kombiniert oft mehrere."],
    ],
    notes:
      `Das erste Bildbeispiel: ${cap("estes_booths")}. ` +
      "Man sieht eine Reihe von Telefonzellen in New York. Auffällig sind die Spiegelungen im Glas und im Metall – Spiegelungen sind das Markenzeichen von Estes. " +
      "Außerdem ist alles gleich scharf, vom Vordergrund bis zum Hintergrund, und man sieht keinen einzigen Pinselstrich. Das Motiv ist völlig alltäglich und wird ohne Wertung gezeigt. " +
      "Estes malt nach eigenen Fotos und setzt oft mehrere Aufnahmen zu einem Bild zusammen. (ca. 50 Sekunden)",
  },

  beleg2: {
    werk: "close_big",
    title: "Am Bildbeispiel: Großformat und Raster",
    stat: "2,73 m",
    statLabel: "hoch – ein Gesicht in Monumentalgröße",
    stat2: "Raster",
    stat2Label: "Foto und Leinwand werden in Quadrate geteilt und Feld für Feld übertragen",
    punkte: [
      ["Fotografische Unschärfe", "Gesicht scharf, Haare und Schultern verschwimmen – wie bei der Kamera."],
      ["Airbrush", "Mit der Spritzpistole in Schwarz-Weiß gemalt, ohne Pinselspur."],
      ["Schnappschuss-Ästhetik", "Zigarette, zerzauste Haare – kein geschöntes Porträt."],
    ],
    notes:
      `Das zweite Bildbeispiel: ${cap("close_big")}. ` +
      "Das Bild ist 2,73 Meter hoch – das Gesicht wirkt dadurch monumental. Close hat ein Foto von sich in ein Raster aus Quadraten geteilt und es Feld für Feld auf die Leinwand übertragen. " +
      "Interessant ist: Close übernimmt sogar die Unschärfe der Kamera. Das Gesicht ist scharf, Haare und Schultern verschwimmen. Gemalt hat er mit Airbrush in Schwarz-Weiß. " +
      "Und das Porträt ist nicht geschönt: Zigarette im Mund, zerzauste Haare – wie ein zufälliger Schnappschuss. (ca. 50 Sekunden)",
  },

  arbeitsweise: {
    title: "Vom Foto zum Gemälde",
    schritte: [
      { icon: "TbCamera", t: "Fotografieren", d: "Motiv fotografieren, oft mehrere Aufnahmen kombinieren." },
      { icon: "TbGrid3X3", t: "Übertragen", d: "Raster zeichnen oder Dia auf die Leinwand projizieren." },
      { icon: "TbSpray", t: "Malen", d: "Schicht für Schicht mit Acryl, Öl oder Airbrush – oft monatelang." },
      { icon: "TbEye", t: "Täuschen", d: "Das Gemälde wirkt auf den ersten Blick wie ein Foto." },
    ],
    defTitel: "Definition nach Louis K. Meisel (1980) – ein Fotorealist …",
    kriterien: [
      "1   nutzt Kamera und Foto, um Bildinformationen zu sammeln,",
      "2   überträgt sie mechanisch oder halbmechanisch auf die Leinwand,",
      "3   hat das technische Können, das Werk fotografisch wirken zu lassen,",
      "4   hat bis 1972 als Fotorealist ausgestellt,",
      "5   hat mindestens fünf Jahre fotorealistisch gearbeitet.",
    ],
    notes:
      "So entsteht ein fotorealistisches Bild: Zuerst wird fotografiert, oft werden mehrere Fotos kombiniert. Dann wird das Bild übertragen – mit einem Raster oder indem man ein Dia direkt auf die Leinwand projiziert und nachzeichnet. " +
      "Danach wird Schicht für Schicht gemalt, oft mit Airbrush. An einem Bild arbeiten die Künstler häufig mehrere Monate. " +
      "Der Galerist Louis K. Meisel hat 1980 fünf Kriterien formuliert: Fotorealisten arbeiten mit Kamera und Foto, übertragen mechanisch, haben das Können für eine fotografische Wirkung – und die beiden letzten Kriterien grenzen die Kerngruppe zeitlich ein. (ca. 60 Sekunden)",
  },

  motive: {
    title: "Das Alltägliche wird bildwürdig",
    items: [
      { icon: "TbBuildingSkyscraper", t: "Stadt & Schaufenster", d: "Spiegelungen in Glas, Chrom und Lack", k: "Richard Estes, Don Eddy" },
      { icon: "TbCar", t: "Autos & Motorräder", d: "Symbole des „American Way of Life“", k: "Robert Bechtle, Tom Blackwell" },
      { icon: "TbToolsKitchen2", t: "Diner & Imbiss", d: "Theken, Ketchup, Kaffeetassen", k: "Ralph Goings" },
      { icon: "TbUser", t: "Porträts", d: "Gesichter im Riesenformat", k: "Chuck Close, Franz Gertsch" },
      { icon: "TbCandy", t: "Konsum & Stillleben", d: "Kaugummiautomaten, Spielzeug, Vanitas", k: "Audrey Flack, Charles Bell" },
      { icon: "TbMan", t: "Mensch & Körper", d: "lebensechte Figuren, Haut, Wasser", k: "Duane Hanson, Ron Mueck" },
    ],
    notes:
      "Die Motive stammen fast immer aus dem Alltag. Besonders beliebt sind Großstadtansichten und Schaufenster mit Spiegelungen, Autos und Motorräder als Symbole des amerikanischen Lebensstils, und Diner – also typisch amerikanische Imbissrestaurants. " +
      "Dazu kommen Porträts im Riesenformat und Stillleben mit Konsumgütern, etwa Kaugummiautomaten. Im Hyperrealismus steht dann oft der Mensch selbst im Mittelpunkt – als lebensechte Skulptur oder in Bildern von Haut und Wasser. (ca. 45 Sekunden)",
  },

  vertreterFoto: {
    kicker: "04 · HAUPTVERTRETER",
    title: "Hauptvertreter des Fotorealismus",
    items: [
      { name: "Richard Estes", daten: "* 1932 · USA", d: "Stadtansichten New Yorks mit Spiegelungen in Glas und Chrom" },
      { name: "Chuck Close", daten: "1940–2021 · USA", d: "Monumentale Porträts, im Raster übertragen" },
      { name: "Ralph Goings", daten: "1928–2016 · USA", d: "Diner, Pick-ups und Stillleben vom Imbisstisch" },
      { name: "Audrey Flack", daten: "1931–2024 · USA", d: "Pionierin des Fotorealismus; Vanitas-Stillleben mit Airbrush" },
      { name: "Robert Bechtle", daten: "1932–2020 · USA", d: "Kalifornische Vorstadt: Autos, Häuser, Familien" },
      { name: "Franz Gertsch", daten: "1930–2022 · Schweiz", d: "Bedeutendster europäischer Fotorealist; riesige Porträts" },
    ],
    notes:
      "Die wichtigsten Fotorealisten kommen aus den USA. Richard Estes ist bekannt für seine New Yorker Stadtansichten mit Spiegelungen. Chuck Close malte riesige Porträts mit der Rastertechnik. " +
      "Ralph Goings malte vor allem Diner und Pick-up-Trucks, Audrey Flack war eine der wenigen Frauen der Bewegung und malte Stillleben mit Airbrush. Robert Bechtle zeigt die kalifornische Vorstadt mit Autos und Familien. " +
      "Der wichtigste Europäer ist der Schweizer Franz Gertsch, der auf der documenta 5 bekannt wurde. (ca. 50 Sekunden)",
  },

  vertreterHyper: {
    kicker: "04 · HAUPTVERTRETER",
    title: "Hauptvertreter des Hyperrealismus",
    cool: true,
    items: [
      { name: "Duane Hanson", daten: "1925–1996 · USA", d: "Lebensgroße Figuren aus Polyester mit echter Kleidung" },
      { name: "John De Andrea", daten: "* 1941 · USA", d: "Lebensechte Akt-Figuren aus bemaltem Kunststoff" },
      { name: "Ron Mueck", daten: "* 1958 · Australien", d: "Silikon-Skulpturen mit verschobenem Maßstab" },
      { name: "Gottfried Helnwein", daten: "* 1948 · Österreich/Irland", d: "Kinderbilder über Gewalt und Verletzlichkeit" },
      { name: "Roberto Bernardi", daten: "* 1974 · Italien", d: "Glas, Süßigkeiten und Spiegelungen – schärfer als ein Foto" },
      { name: "Alyssa Monks", daten: "* 1977 · USA", d: "Körper hinter Wasser und beschlagenem Glas" },
    ],
    notes:
      "Im Hyperrealismus spielen Skulpturen eine große Rolle. Duane Hanson schuf lebensgroße Figuren von Alltagsmenschen, mit echter Kleidung. John De Andrea arbeitet ähnlich, zeigt aber nackte Figuren. " +
      "Ron Mueck spielt mit dem Maßstab: Seine Figuren sind riesig oder winzig, aber bis zur Pore detailliert. In der Malerei sind zum Beispiel Gottfried Helnwein, Roberto Bernardi und Alyssa Monks wichtig. (ca. 45 Sekunden)",
  },

  paare: [
    {
      kicker: "05 · WERKBEISPIELE",
      title: "Pioniere: Die Vorlage wird zum Bild",
      werke: ["morley_amsterdam", "gertsch_medici"],
      notes:
        `Links: ${cap("morley_amsterdam")}. Morley malte nach einer Postkarte und übertrug sie mit einem Raster – sogar der weiße Rand der Postkarte ist mitgemalt. ` +
        `Rechts: ${cap("gertsch_medici")}. Das riesige Bild zeigt eine Gruppe junger Leute und wurde auf der documenta 5 gezeigt. (ca. 40 Sekunden)`,
    },
    {
      kicker: "05 · WERKBEISPIELE",
      title: "Amerikanischer Alltag: Auto und Schaufenster",
      werke: ["bechtle_pontiac", "eddy_shoes"],
      notes:
        `Links: ${cap("bechtle_pontiac")}. Eine Familie steht vor ihrem Auto – das Bild wirkt wie ein ganz normales Familienfoto. ` +
        `Rechts: ${cap("eddy_shoes")}. Man blickt in ein Schuhgeschäft; Spiegelungen und Durchblick überlagern sich, sodass man kaum sagen kann, was vor und was hinter der Scheibe ist. (ca. 40 Sekunden)`,
    },
    {
      kicker: "05 · WERKBEISPIELE",
      title: "Konsum und Vergänglichkeit",
      werke: ["flack_marilyn", "bell_gumball"],
      notes:
        `Links: ${cap("flack_marilyn")}. Ein Vanitas-Stillleben über Marilyn Monroe: Schminke, Obst, Uhr und Kerze stehen für Schönheit und Vergänglichkeit. ` +
        `Rechts: ${cap("bell_gumball")}. Ein Kaugummiautomat wird riesig vergrößert – ein einfaches Konsumgut wird zum Kunstwerk. (ca. 40 Sekunden)`,
    },
    {
      kicker: "05 · WERKBEISPIELE",
      title: "Hyperrealismus: Der Mensch als Skulptur",
      werke: ["hanson_supermarket", "mueck_boy"],
      notes:
        `Links: ${cap("hanson_supermarket")}. Eine Frau mit vollem Einkaufswagen – im Museum halten Besucher sie oft für eine echte Person. ` +
        `Rechts: ${cap("mueck_boy")}. Ein riesig vergrößerter, kauernder Junge. Durch den veränderten Maßstab sehen wir jede Pore – und fühlen uns gleichzeitig unwohl. (ca. 40 Sekunden)`,
    },
    {
      kicker: "05 · WERKBEISPIELE",
      title: "Hyperrealismus heute: schärfer als das Foto",
      werke: ["helnwein_x", "bernardi_x"],
      notes:
        `Links: ${cap("helnwein_x")}. Helnwein nutzt die hyperrealistische Malweise, um zu provozieren und zum Nachdenken anzuregen. ` +
        `Rechts: ${cap("bernardi_x")}. Glas, Farben und Spiegelungen sind so präzise, dass das Bild schärfer wirkt als jedes Foto. (ca. 40 Sekunden)`,
    },
  ],

  fazit: {
    title: "Mehr als bloßes Abmalen?",
    frage: "Ist es Kunst, ein Foto perfekt abzumalen?",
    frageSub: "Frage an euch – was meint ihr?",
    punkte: [
      { icon: "TbAlertTriangle", t: "Kritik", d: "Vorwurf des bloßen Abmalens: technisch perfekt, aber ohne eigene Idee." },
      { icon: "TbEye", t: "Bedeutung", d: "Thema ist die Wahrnehmung: Wie sehr vertrauen wir Bildern – und was ist „echt“?" },
      { icon: "TbDeviceMobile", t: "Aktualität", d: "In Zeiten von Smartphone, Filtern und KI-Bildern aktueller denn je." },
    ],
    notes:
      "Zum Schluss: Dem Fotorealismus wurde oft vorgeworfen, er sei nur handwerklich perfektes Abmalen ohne eigene Idee. " +
      "Man kann es aber auch anders sehen: Die Werke machen uns bewusst, wie sehr wir Bildern vertrauen – und fragen, was eigentlich echt ist. " +
      "Heute, wo jeder ständig fotografiert, Bilder filtert und KI täuschend echte Bilder erzeugt, ist diese Frage aktueller denn je. " +
      "Deshalb meine Frage an euch: Ist es Kunst, ein Foto perfekt abzumalen? – Vielen Dank für eure Aufmerksamkeit! (ca. 50 Sekunden + Diskussion)",
  },

  quellen: {
    title: "Quellen",
    literatur: ["(wird nach der Recherche ergänzt)"],
    internet: ["(wird nach der Recherche ergänzt)"],
    notes: "Quellenangaben – nicht vortragen, nur zeigen.",
  },

  bildnachweise: {
    title: "Bildnachweise",
    items: ["(wird nach der Recherche ergänzt)"],
    notes: "Bildnachweise – nicht vortragen, nur zeigen.",
  },
};

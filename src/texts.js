// Folientexte und Sprechernotizen (Vortragstext) – Deutsch
const W = require("./works.js");
const cap = (id) => `${W[id].kuenstler}: ${W[id].titel}, ${W[id].jahr}`;

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
    werk: "goings_airstream",
    frage: "Foto oder Gemälde?",
    text: "Schaut genau hin: Woran würdet ihr den Unterschied erkennen?",
    notes:
      "Kurz ins Publikum fragen: Ist das ein Foto oder ein Gemälde? – Auflösung: Es ist ein Gemälde, über zwei Meter breit! " +
      `${cap("goings_airstream")}. ` +
      "Jede Spiegelung auf dem glänzenden Aluminium und jeder Schatten ist von Hand gemalt, nach einem Foto. Genau diese Verwechslungsgefahr ist das Thema des Fotorealismus. (ca. 40 Sekunden)",
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
      { jahr: "1960er", typ: "kontext", text: "Pop Art holt Werbung und Konsum in die Kunst – Gegenpol zur abstrakten Malerei." },
      { jahr: "1966", typ: "foto", text: "Malcolm Morley malt ein Schiff nach einer Postkarte – ein frühes Schlüsselwerk." },
      { jahr: "1969", typ: "foto", text: "Galerist Louis K. Meisel prägt den Begriff „Photo-Realism“." },
      { jahr: "1972", typ: "foto", text: "documenta 5 in Kassel: erster großer Auftritt in Europa." },
      { jahr: "1973", typ: "hyper", text: "Ausstellung „Hyperréalisme“ in Brüssel (Galerie Isy Brachot) prägt den Begriff." },
      { jahr: "1980", typ: "foto", text: "Meisels Standardwerk „Photo-Realism“ fasst die erste Generation zusammen." },
      { jahr: "ab 2000", typ: "hyper", text: "Hyperrealismus boomt: Digitalfotos, Skulpturen aus Silikon (Ron Mueck)." },
    ],
    notes:
      "Der Fotorealismus entsteht Ende der 1960er-Jahre in den USA, vor allem in New York und Kalifornien. Er ist eine Gegenbewegung zum Abstrakten Expressionismus, bei dem man jeden Pinselschwung sieht. Von der Pop Art übernehmen die Fotorealisten den Blick auf Werbung, Konsum und Alltag. " +
      "1966 malt Malcolm Morley ein Kreuzfahrtschiff nach einer Postkarte – das gilt als eines der ersten Werke dieser Art. 1969 prägt der New Yorker Galerist Louis K. Meisel den Begriff „Photo-Realism“, 1970 steht er zum ersten Mal gedruckt, im Katalog einer Ausstellung im Whitney Museum. " +
      "1972 zeigt die documenta 5 in Kassel viele Fotorealisten – ihr erster großer Auftritt in Europa. 1973 kommt in Brüssel der Begriff „Hyperrealismus“ auf. 1980 erscheint Meisels Standardwerk über die erste Generation. " +
      "Seit etwa 2000 erlebt der Hyperrealismus einen Boom – durch digitale Fotografie und neue Materialien wie Silikon. (ca. 75 Sekunden)",
  },

  entwicklung: {
    title: "Vom Fotorealismus zum Hyperrealismus",
    cols: [
      { name: "Fotorealismus", zeit: "Ende 1960er bis ca. 1980 · USA, dann Europa" },
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
      { icon: "TbGrid3X3", t: "Mechanische Übertragung", d: "Rasternetz oder Diaprojektor übertragen das Foto genau auf die Leinwand." },
      { icon: "TbSpray", t: "Keine Handschrift", d: "Glatte Oberfläche ohne sichtbare Pinselspuren – oft mit Airbrush und dünnen Schichten." },
      { icon: "TbFocus2", t: "Fotografischer Blick", d: "Ausschnitt, Licht und Spiegelungen – manchmal sogar die Unschärfe – stammen aus dem Foto." },
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
      ["Durchgehende Schärfe", "Nah und fern gleich scharf – mehr, als Auge oder Kamera schaffen."],
      ["Keine Handschrift", "Glatte Acrylmalerei ohne sichtbaren Pinselstrich."],
      ["Alltagsmotiv", "Telefonzellen in New York – banal und kühl beobachtet."],
      ["Mehrere Fotos als Vorlage", "Estes malt ohne Projektor und setzt mehrere eigene Fotos zusammen."],
    ],
    notes:
      `Das erste Bildbeispiel: ${cap("estes_booths")}. ` +
      "Man sieht eine Reihe von Telefonzellen in New York. Auffällig sind die Spiegelungen im Glas und im Metall – Spiegelungen sind das Markenzeichen von Estes. " +
      "Außerdem ist alles gleich scharf, vom Vordergrund bis zum Hintergrund – das schafft weder unser Auge noch eine Kamera auf einmal. Möglich wird das, weil Estes ohne Projektor arbeitet und mehrere eigene Fotos zu einem Bild zusammensetzt. " +
      "Man sieht keinen einzigen Pinselstrich, und das Motiv ist völlig alltäglich und wird ohne Wertung gezeigt. Das Bild ist also schärfer als die Wirklichkeit. (ca. 55 Sekunden)",
  },

  beleg2: {
    werk: "close_big",
    title: "Am Bildbeispiel: Großformat und Raster",
    stat: "2,73 m",
    statLabel: "hoch – ein Gesicht in Monumentalgröße",
    punkte: [
      ["Raster", "Foto und Leinwand werden in Quadrate geteilt und Feld für Feld übertragen."],
      ["Airbrush", "Mit der Spritzpistole in Schwarz-Weiß gemalt – keine Pinselspur."],
      ["Fotografische Unschärfe", "Nasenspitze und Ohren verschwimmen – Close malt die Unschärfe der Kamera mit."],
      ["Schnappschuss", "Zigarette, zerzauste Haare, Bartstoppeln – kein geschöntes Porträt."],
    ],
    notes:
      `Das zweite Bildbeispiel: ${cap("close_big")}. ` +
      "Das Bild ist 2,73 Meter hoch – das Gesicht wirkt dadurch monumental. Close hat über ein Foto von sich ein Raster aus Quadraten gelegt und es Feld für Feld auf die Leinwand übertragen, mit der Spritzpistole, also Airbrush, in Schwarz-Weiß. " +
      "Interessant ist: Close übernimmt sogar die Unschärfe der Kamera. Die Augen sind scharf, Nasenspitze und Ohren verschwimmen – so, wie es eine Kamera bei geringer Tiefenschärfe aufnimmt. " +
      "Und das Porträt ist nicht geschönt: Zigarette im Mund, zerzauste Haare, Bartstoppeln. Übrigens war es das erste Bild, das Close verkauft hat – 1969 an das Walker Art Center. (ca. 55 Sekunden)",
  },

  arbeitsweise: {
    title: "Vom Foto zum Gemälde",
    schritte: [
      { icon: "TbCamera", t: "Fotografieren", d: "Motiv fotografieren, oft mehrere Aufnahmen kombinieren." },
      { icon: "TbGrid3X3", t: "Übertragen", d: "Raster zeichnen oder ein Dia auf die Leinwand projizieren." },
      { icon: "TbSpray", t: "Malen", d: "Schicht für Schicht mit Acryl, Öl oder Airbrush – oft monatelang." },
      { icon: "TbEye", t: "Täuschen", d: "Das Gemälde wirkt auf den ersten Blick wie ein Foto." },
    ],
    defTitel: "Definition nach Louis K. Meisel (formuliert 1972) – ein Fotorealist …",
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
      "Der Galerist Louis K. Meisel hat 1972 fünf Kriterien formuliert: Fotorealisten arbeiten mit Kamera und Foto, übertragen mechanisch, haben das Können für eine fotografische Wirkung – und die beiden letzten Kriterien grenzen die Kerngruppe zeitlich ein. " +
      "Kritiker meinten übrigens, Meisel habe die Kriterien so gewählt, dass vor allem seine eigenen Künstler hineinpassen. (ca. 65 Sekunden)",
  },

  motive: {
    title: "Das Alltägliche wird bildwürdig",
    items: [
      { icon: "TbBuildingSkyscraper", t: "Stadt & Schaufenster", d: "Spiegelungen, Reklame, Leuchtschrift", k: "Richard Estes, Don Eddy, Robert Cottingham" },
      { icon: "TbCar", t: "Autos & Wohnwagen", d: "Chrom und Lack – Symbole des „American Way of Life“", k: "Robert Bechtle, Ralph Goings, Tom Blackwell" },
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
      { name: "Richard Estes", daten: "* 1932 · USA", d: "Mitbegründer; New Yorker Stadtansichten voller Spiegelungen" },
      { name: "Chuck Close", daten: "1940–2021 · USA", d: "Monumentale Porträts, im Raster übertragen" },
      { name: "Ralph Goings", daten: "1928–2016 · USA", d: "Diner, Pick-ups und Stillleben vom Imbisstisch" },
      { name: "Audrey Flack", daten: "1931–2024 · USA", d: "Wichtigste Künstlerin der ersten Generation; Vanitas-Stillleben" },
      { name: "Robert Bechtle", daten: "1932–2020 · USA", d: "Kalifornische Vorstadt: Autos, Häuser, Familien" },
      { name: "Franz Gertsch", daten: "1930–2022 · Schweiz", d: "Wichtigster europäischer Fotorealist; Durchbruch auf der documenta 5" },
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
      { name: "Ron Mueck", daten: "* 1958 · Australien, lebt in London", d: "Silikon-Skulpturen mit verschobenem Maßstab" },
      { name: "Gottfried Helnwein", daten: "* 1948 · Österreich/Irland", d: "Kinderbilder über Gewalt und Verletzlichkeit" },
      { name: "Roberto Bernardi", daten: "* 1974 · Italien", d: "Glas, Süßigkeiten und Spiegelungen – schärfer als ein Foto" },
      { name: "Robin Eley", daten: "* 1978 · Großbritannien/Australien", d: "Menschen in Plastikfolie – die Folie ist nur gemalt" },
    ],
    notes:
      "Im Hyperrealismus spielen Skulpturen eine große Rolle. Duane Hanson schuf lebensgroße Figuren von Alltagsmenschen, mit echter Kleidung. John De Andrea arbeitet ähnlich, zeigt aber nackte Figuren. " +
      "Ron Mueck spielt mit dem Maßstab: Seine Figuren sind riesig oder winzig, aber bis zur Pore detailliert. In der Malerei sind zum Beispiel Gottfried Helnwein, Roberto Bernardi und Robin Eley wichtig – bei Eley sieht man Menschen in Plastikfolie, aber die Folie ist nur gemalt. (ca. 45 Sekunden)",
  },

  paare: [
    {
      kicker: "05 · WERKBEISPIELE",
      title: "Pioniere: Die Vorlage wird zum Bild",
      werke: ["morley_amsterdam", "gertsch_medici"],
      notes:
        `Links: ${cap("morley_amsterdam")}. Morley malte das Schiff nach einem gedruckten Werbebild der Reederei und übertrug es mit einem Raster Feld für Feld – sogar der weiße Rand der Vorlage ist mitgemalt. Morley nannte seine Malweise „Superrealism“. ` +
        `Rechts: ${cap("gertsch_medici")}. Fünf junge Männer lehnen an einer Bauabsperrung der Firma „Medici“ – daher der Titel. Das Bild ist vier mal sechs Meter groß, entstand nach einem einzigen Schnappschuss und brachte Gertsch 1972 auf der documenta 5 den Durchbruch. (ca. 45 Sekunden)`,
    },
    {
      kicker: "05 · WERKBEISPIELE",
      title: "Amerikanischer Alltag: Auto und Schaufenster",
      werke: ["bechtle_pontiac", "eddy_shoes"],
      notes:
        `Links: ${cap("bechtle_pontiac")}. Der Künstler steht mit seiner Familie vor ihrem Pontiac-Kombi – Vorlage war ein ganz normales Familienfoto. Das Bild hing 1972 auf der documenta 5. ` +
        `Rechts: ${cap("eddy_shoes")}. Man blickt in ein Schuhgeschäft; Spiegelungen der Straße legen sich über die Schuhe, sodass man kaum sagen kann, was vor und was hinter der Scheibe ist. (ca. 40 Sekunden)`,
    },
    {
      kicker: "05 · WERKBEISPIELE",
      title: "Konsum und Vergänglichkeit",
      werke: ["flack_marilyn", "bell_gumball"],
      notes:
        `Links: ${cap("flack_marilyn")}. Ein Vanitas-Stillleben rund um ein Foto der jungen Marilyn Monroe: Sanduhr, Kerze, Obst und Schminke stehen für Schönheit und Vergänglichkeit. Flack hat die Dinge arrangiert, fotografiert und das Dia direkt auf die Leinwand projiziert. ` +
        `Rechts: ${cap("bell_gumball")}. Ein Kaugummiautomat, vergrößert auf 1,68 Meter – ein billiges Konsumprodukt wird zum monumentalen Bild, und Bell zeigt, wie Licht in Glas gespiegelt und gebrochen wird. (ca. 45 Sekunden)`,
    },
    {
      kicker: "05 · WERKBEISPIELE",
      title: "Hyperrealismus: Der Mensch als Skulptur",
      werke: ["hanson_supermarket", "mueck_mask"],
      notes:
        `Links: ${cap("hanson_supermarket")}. Eine Hausfrau mit Lockenwicklern schiebt einen Einkaufswagen voller echter Lebensmittelverpackungen. Hanson hat die Figur über einem lebenden Menschen abgegossen und naturgetreu bemalt; die Kleidung ist echt. Im Museum halten Besucher sie oft für eine echte Person. Man versteht sie auch als Kritik an der Konsumgesellschaft. ` +
        `Rechts: ${cap("mueck_mask")}. Ein riesiger Kopf – ein Selbstporträt von Mueck – liegt wie schlafend auf der Seite. Jede Pore und jede Bartstoppel ist zu sehen. Von hinten ist der Kopf hohl wie eine Maske: Die Illusion wird bewusst gebrochen. (ca. 50 Sekunden)`,
    },
    {
      kicker: "05 · WERKBEISPIELE",
      title: "Hyperrealismus heute: mehr als ein Foto",
      werke: ["helnwein_epiphany", "thielker_exhale"],
      notes:
        `Links: ${cap("helnwein_epiphany")}. Aus Helnweins Serie „Epiphany“: Er verbindet ein christliches Bildthema mit Figuren in Uniformen der NS-Zeit. Das Bild wirkt wie ein riesiges historisches Foto und will provozieren – Hyperrealismus wird hier zum Mittel der Gesellschaftskritik. ` +
        `Rechts: ${cap("thielker_exhale")}. Wir blicken durch eine verregnete Windschutzscheibe. Die Tropfen sind gestochen scharf, die Landschaft dahinter verschwimmt – Thielker malt also, wie eine Kameralinse sieht. Der Hyperrealismus ist bis heute lebendig. (ca. 45 Sekunden)`,
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
    literatur: [
      "Battcock, Gregory (Hg.): Super Realism. A Critical Anthology. New York: Dutton 1975.",
      "Letze, Otto (Hg.): Fotorealismus. 50 Jahre hyperrealistische Malerei. Ostfildern: Hatje Cantz 2012.",
      "Meisel, Louis K.: Photo-Realism. New York: Abrams 1980.",
      "mumok Wien (Hg.): Hyper Real. Die Passion des Realen in Malerei und Fotografie. Köln: Walther König 2010.",
      "Zamani, Daniel (Hg.): Wettstreit mit der Wirklichkeit. 60 Jahre Fotorealismus. München: Hirmer 2026 (Kat. Museum Frieder Burda).",
    ],
    internet: [
      "documenta: Retrospektive documenta 5 (1972). documenta.de/en/retrospective/documenta-5",
      "Louis K. Meisel Gallery: Curating the Stuart M. Speiser Collection. meiselgallery.com/story/curating-the-stuart-m-speiser-collection",
      "Museum Frieder Burda: Pressemitteilung „Wettstreit mit der Wirklichkeit“ (2026). museum-frieder-burda.de",
      "Tate: Art Term „Photorealism“. tate.org.uk/art/art-terms/photorealism",
      "The Art Story: Photorealism. theartstory.org/movement/photorealism",
      "Wikipedia: Fotorealismus. de.wikipedia.org/wiki/Fotorealismus",
      "Wikipedia: Hyperrealism (visual arts). en.wikipedia.org/wiki/Hyperrealism_(visual_arts)",
      "Alle Internetquellen abgerufen am 25.10.2026.",
    ],
    notes: "Quellenangaben – nicht vortragen, nur kurz zeigen.",
  },

  bildnachweise: {
    title: "Bildnachweise",
    hinweis: "Abbildungen nur zu Unterrichtszwecken (§ 60a UrhG); Rechte bei den Künstlern bzw. Nachlässen. Webseiten abgerufen am 25.10.2026.",
    notes: "Bildnachweise – nicht vortragen, nur kurz zeigen.",
  },
};

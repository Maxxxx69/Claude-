// Folientexte und Sprechernotizen (Vortragstext) – Deutsch
const W = require("./works.js");
const cap = (id) => `${W[id].kuenstler}: ${W[id].titel}, ${W[id].jahr}`;

module.exports = {
  // Angaben zur Person – hier eintragen, dann erscheinen sie auf Titelfolie und Handout
  meta: { name: "[Vorname Nachname]", kurs: "[Kurs]", datum: "[Datum]" },

  // 1 · Einstieg (vor der Titelfolie, noch ohne Bildunterschrift)
  einstieg: {
    werk: "goings_airstream",
    frage: "Foto oder Gemälde?",
    text: "Schaut genau hin – und stimmt per Handzeichen ab.",
    notes:
      "Zum Einstieg zeige ich euch ein Bild. Schaut es euch genau an: Ist das ein Foto oder ein Gemälde? " +
      "Wer glaubt, es ist ein Foto? Und wer glaubt, es ist gemalt? (Handzeichen abwarten)",
  },

  // 2 · Auflösung
  aufloesung: {
    werk: "goings_airstream",
    title: "Auflösung: ein Gemälde!",
    punkte: [
      ["Größe", "Das Original ist 1,52 × 2,14 m groß."],
      ["Material", "Aus der Nähe sieht man Leinwand und feine Farbschichten."],
      ["Von Hand gemalt", "Licht, Spiegelungen und Schatten auf dem Aluminium – alles mit dem Pinsel."],
    ],
    notes:
      `Auflösung: Es ist ein Gemälde! ${cap("goings_airstream")}, Öl auf Leinwand. ` +
      "Woran hätte man es merken können? Am Beamer fast gar nicht – im Museum schon: Das Original ist über zwei Meter breit, und aus der Nähe sieht man die Leinwand. " +
      "Goings interessierte sich weniger für den Wohnwagen selbst als für Licht, Spiegelungen und Schatten auf dem Aluminium. Genau mit dieser Verwechslung spielt der Fotorealismus.",
  },

  // 3 · Titel
  titel: {
    title: "Fotorealismus &\nHyperrealismus",
    sub: "Leitfrage: Wirklicher als die Wirklichkeit?",
    notes:
      "In meinem Referat geht es um den Fotorealismus und den Hyperrealismus – zwei Kunstrichtungen, deren Gemälde und Skulpturen so lebensecht wirken, dass man sie für Fotos oder echte Menschen halten könnte. " +
      "Meine Leitfrage lautet: „Wirklicher als die Wirklichkeit?“ – also: Kann ein gemaltes Bild echter wirken als die Wirklichkeit selbst? Darauf komme ich am Ende zurück.",
  },

  // 4 · Gliederung
  gliederung: {
    items: [
      ["Zeitliche Einordnung", "Entstehung, Entwicklung, Abgrenzung"],
      ["Merkmale", "Technik und Nachweis am Bild"],
      ["Motive", "Was wird dargestellt?"],
      ["Hauptvertreter", "Foto- und Hyperrealismus"],
      ["Werkbeispiele", "Von 1966 bis heute"],
      ["Fazit", "Antwort auf die Leitfrage"],
    ],
    notes:
      "Zuerst ordne ich die Kunstrichtung zeitlich ein. Dann geht es um Technik und Merkmale – nachgewiesen an zwei Bildbeispielen –, um Motive, Hauptvertreter und weitere Werke. Am Ende beantworte ich die Leitfrage.",
  },

  // 5 · Zeitleiste
  zeit: {
    title: "Entstanden Ende der 1960er-Jahre in den USA",
    items: [
      { jahr: "1960er", typ: "kontext", text: "Pop Art holt Werbung und Konsum in die Kunst – Gegenpol zur abstrakten Malerei." },
      { jahr: "1966", typ: "foto", text: "Malcolm Morley malt ein Schiff nach einem Werbebild – ein frühes Schlüsselwerk." },
      { jahr: "1969", typ: "foto", text: "Der Galerist Louis K. Meisel prägt den Begriff „Photo-Realism“." },
      { jahr: "1972", typ: "foto", text: "documenta 5 in Kassel: erster großer Auftritt in Europa." },
      { jahr: "1973", typ: "hyper", text: "Ausstellung „Hyperréalisme“ in Brüssel macht den Begriff bekannt." },
      { jahr: "1980", typ: "foto", text: "Meisels Standardwerk „Photo-Realism“ erscheint." },
      { jahr: "ab 2000", typ: "hyper", text: "Neuer Aufschwung: Digitalfotos, Skulpturen aus Silikon." },
    ],
    notes:
      "Der Fotorealismus entsteht Ende der 1960er-Jahre in den USA, vor allem in New York und Kalifornien – als Gegenbewegung zum Abstrakten Expressionismus, bei dem man jeden Pinselschwung sieht. Von der Pop Art übernimmt er den Blick auf Werbung, Konsum und Alltag. " +
      "1966 malt Malcolm Morley ein Passagierschiff nach einem Werbebild, 1969 prägt der New Yorker Galerist Louis K. Meisel den Begriff „Photo-Realism“. " +
      "1972 zeigt die documenta 5 in Kassel, eine der wichtigsten Ausstellungen für Gegenwartskunst, viele Fotorealisten. Der Sammler Peter Ludwig kaufte früh Werke – deshalb hängen heute einige im Ludwig Forum in Aachen. " +
      "1973 macht eine Ausstellung in Brüssel den Begriff „Hyperrealismus“ bekannt, 1980 erscheint Meisels Standardwerk, und seit etwa 2000 erlebt der Hyperrealismus einen neuen Aufschwung.",
  },

  // 6 · Entwicklung
  entwicklung: {
    title: "Vom Fotorealismus zum Hyperrealismus",
    cols: [
      { name: "Fotorealismus", zeit: "Kernphase Ende 1960er bis ca. 1980" },
      { name: "Hyperrealismus", zeit: "Begriff seit 1973 · Skulptur ab ca. 1970 · Aufschwung ab ca. 2000" },
    ],
    rows: [
      ["Haltung", "kühl, neutral, dokumentarisch – ohne Wertung", "oft emotional, erzählerisch oder gesellschaftskritisch"],
      ["Umgang mit dem Foto", "überträgt das Foto genau – teils samt Unschärfe", "will das Foto übertreffen: noch detailreicher, oft größer"],
      ["Medien", "Malerei in Acryl und Öl, mit Pinsel oder Airbrush", "Malerei, Zeichnung, Skulptur (Kunstharz, Silikon, Kunsthaar)"],
      ["Motive", "amerikanischer Alltag: Stadt, Autos, Diners, Konsum", "Menschen, Haut, Wasser, Glas – oft überhöht oder rätselhaft"],
    ],
    notes:
      "„Hyper“ kommt aus dem Griechischen und heißt „über“. Der Begriff Hyperrealismus wurde 1973 zuerst einfach als anderes Wort für Fotorealismus benutzt – bis heute verwendet man beide oft gleichbedeutend. " +
      "Heute meint man damit vor allem Werke, die das Foto übertreffen wollen – schon die Skulpturen von Duane Hanson ab etwa 1970, besonders aber Künstler seit etwa 2000. " +
      "Der Fotorealismus ist kühl und neutral: Er überträgt das Foto genau, mit Pinsel oder Airbrush – einer kleinen Farbspritzpistole. Der Hyperrealismus geht weiter: Er wird detailreicher als jedes Foto, erzählt Geschichten, weckt Gefühle oder übt Kritik.",
  },

  // 7 · Abgrenzung
  abgrenzung: {
    title: "Was Fotorealismus nicht ist",
    items: [
      { icon: "TbBrush", t: "Realismus", zeit: "Mitte 19. Jh. · z. B. Gustave Courbet", d: "Zeigt die Wirklichkeit ungeschönt, oft sozialkritisch – mit sichtbarem Pinselstrich.", u: "Fotorealismus: Vorlage ist das Foto, keine Handschrift" },
      { icon: "TbPalette", t: "Pop Art", zeit: "ab ca. 1960 · Andy Warhol, Roy Lichtenstein", d: "Zitiert Medienbilder – flach, plakativ, oft im Siebdruck oder Comic-Stil.", u: "Fotorealismus: will eine perfekte Illusion" },
      { icon: "TbPhoto", t: "Fotomalerei", zeit: "ab 1962 · Gerhard Richter (Deutschland)", d: "Malt nach Fotos, verwischt sie aber bewusst – z. B. „Ema (Akt auf einer Treppe)“, 1966.", u: "Fotorealismus: gestochen scharf" },
    ],
    notes:
      "Damit man den Fotorealismus nicht verwechselt, grenze ich ihn kurz ab. Der Realismus des 19. Jahrhunderts, etwa von Gustave Courbet, wollte die Wirklichkeit ungeschönt zeigen – oft sozialkritisch und mit sichtbarem Pinselstrich. " +
      "Die Pop Art von Andy Warhol oder Roy Lichtenstein zitiert Medienbilder flach und plakativ, oft im Siebdruck. Der Fotorealismus will dagegen eine perfekte Illusion. " +
      "Und in Deutschland malt Gerhard Richter schon ab 1962 nach Fotos, verwischt sie aber bewusst – man nennt das Fotomalerei. Richter zweifelt am Bild, die Fotorealisten perfektionieren es.",
  },

  // 8 · Arbeitsweise + Definition
  arbeitsweise: {
    title: "Vom Foto zum Gemälde",
    schritte: [
      { icon: "TbCamera", t: "Fotografieren", d: "Motiv fotografieren – oft mehrere Aufnahmen." },
      { icon: "TbGrid3X3", t: "Übertragen", d: "Raster zeichnen oder ein Dia auf die Leinwand projizieren." },
      { icon: "TbSpray", t: "Malen", d: "Schicht für Schicht in Acryl oder Öl, mit Pinsel oder Airbrush." },
      { icon: "TbEye", t: "Wirkung", d: "Das Gemälde wirkt auf den ersten Blick wie ein Foto." },
    ],
    defTitel: "Definition nach Louis K. Meisel (formuliert 1972) – ein Fotorealist …",
    kriterien: [
      "nutzt Kamera und Foto, um Bildinformationen zu sammeln,",
      "überträgt sie mechanisch oder halbmechanisch auf die Leinwand,",
      "hat das technische Können, das Werk fotografisch wirken zu lassen,",
      "hat bis 1972 als Fotorealist ausgestellt,",
      "hat mindestens fünf Jahre fotorealistisch gearbeitet.",
    ],
    notes:
      "Wie entsteht so ein Bild? Zuerst wird fotografiert. Dann wird das Foto übertragen: mit einem Raster aus Quadraten, Feld für Feld, oder man wirft ein Dia – also ein durchsichtiges Foto – mit einem Projektor auf die Leinwand und zeichnet nach. Danach wird Schicht für Schicht gemalt, oft monatelang. " +
      "1972 hat Louis K. Meisel fünf Kriterien formuliert: Fotorealisten arbeiten mit Kamera und Foto, übertragen mechanisch und können das Bild fotografisch wirken lassen. Die letzten beiden Kriterien grenzen die Kerngruppe zeitlich ein.",
  },

  // 9 · Merkmale
  merkmale: {
    title: "Woran man Fotorealismus erkennt",
    items: [
      { icon: "TbCamera", t: "Foto als Vorlage", d: "Kamera statt Skizzenbuch: Gemalt wird nach Fotos oder Dias, nicht vor dem Motiv." },
      { icon: "TbGrid3X3", t: "Mechanische Übertragung", d: "Mit Rasternetz oder Diaprojektor wird das Foto genau übertragen." },
      { icon: "TbSpray", t: "Keine Handschrift", d: "Glatte Oberfläche ohne sichtbare Pinselspuren – mit feinem Pinsel oder Airbrush." },
      { icon: "TbFocus2", t: "Fotografischer Blick", d: "Ausschnitt, Licht und Spiegelungen – manchmal sogar die Unschärfe – stammen aus dem Foto." },
      { icon: "TbArrowsMaximize", t: "Großformat", d: "Oft über 1,5 m groß, manche mehrere Meter (Gertsch: 4 × 6 m)." },
      { icon: "TbBuildingStore", t: "Alltag & Neutralität", d: "Banale Motive, kühl und ohne erkennbare Wertung dargestellt." },
    ],
    notes:
      "Diese sechs Merkmale fassen zusammen, woran man Fotorealismus erkennt: Die Vorlage ist ein Foto. Es wird mechanisch übertragen. Man sieht keine Handschrift, also keine Pinselspuren. " +
      "Der Blick ist fotografisch – Ausschnitt, Licht, Spiegelungen und manchmal sogar Unschärfen stammen aus dem Foto. Viele Bilder sind sehr groß. Und die Motive kommen aus dem Alltag und werden neutral gezeigt. " +
      "Diese Merkmale weise ich jetzt an zwei Bildbeispielen nach – achtet darauf, wie viele ihr wiederfindet.",
  },

  // 10 · Nachweis 1
  beleg1: {
    werk: "estes_booths",
    title: "Richard Estes: Spiegelung und Schärfe",
    punkte: [
      ["Spiegelungen", "Glas und Metall spiegeln Gebäude, Autos und Schilder – Markenzeichen von Estes."],
      ["Durchgehende Schärfe", "Vorder- und Hintergrund sind gleich scharf – mehr, als Auge oder Kamera auf einmal schaffen."],
      ["Mehrere Fotos als Vorlage", "Estes malt ohne Projektor und setzt eigene Fotos zusammen."],
      ["Keine Handschrift", "Glatte Acrylmalerei ohne sichtbaren Pinselstrich."],
      ["Alltag & Neutralität", "Telefonzellen in New York – banal und kühl beobachtet."],
    ],
    notes:
      `Das erste Bildbeispiel: ${cap("estes_booths")} – auf Deutsch „Telefonzellen“. ` +
      "Man sieht vier besetzte Telefonzellen an einer Kreuzung in New York. In Glas und Aluminium spiegeln sich Gebäude, Geschäfte, Schilder und Autos – Spiegelungen sind das Markenzeichen von Estes. " +
      "Außerdem sind Vorder- und Hintergrund gleich scharf. Das schafft weder unser Auge noch eine Kamera auf einmal. Möglich wird es, weil Estes ohne Projektor arbeitet und mehrere eigene Fotos zu einem Bild zusammensetzt. " +
      "Man sieht keinen Pinselstrich, und das Motiv ist völlig alltäglich. Damit ist das Bild eigentlich schärfer als die Wirklichkeit.",
  },

  // 11 · Nachweis 2
  beleg2: {
    werk: "close_big",
    title: "Chuck Close: Großformat und Raster",
    stat: "2,73 m",
    statLabel: "hoch – ein Gesicht in Monumentalgröße",
    punkte: [
      ["Raster", "Foto und Leinwand werden in Quadrate geteilt und Feld für Feld übertragen."],
      ["Airbrush", "Mit der Spritzpistole in Schwarz-Weiß gemalt – keine Pinselspur."],
      ["Fotografische Unschärfe", "Nasenspitze und Ohren verschwimmen – Close malt die Unschärfe der Kamera mit."],
      ["Schnappschuss", "Zigarette, zerzauste Haare, Bartstoppeln – kein geschöntes Porträt."],
    ],
    notes:
      `Das zweite Bildbeispiel: ${cap("close_big")}. Das Bild ist 2,73 Meter hoch – das Gesicht wirkt dadurch monumental. ` +
      "Close hat über ein Foto von sich ein Raster gelegt und es Feld für Feld übertragen, mit Airbrush in Schwarz-Weiß. " +
      "Interessant ist der Unterschied zu Estes: Estes macht alles scharf, Close übernimmt dagegen die Unschärfe der Kamera – Nasenspitze und Ohren verschwimmen. " +
      "Und das Porträt ist nicht geschönt: Zigarette, zerzauste Haare, Bartstoppeln. Es war übrigens das erste Bild, das Close verkauft hat.",
  },

  // 12 · Motive
  motive: {
    title: "Das Alltägliche wird bildwürdig",
    items: [
      { icon: "TbBuildingSkyscraper", t: "Stadt & Schaufenster", d: "Spiegelungen in Glas, Reklame, Leuchtschrift", k: "Richard Estes, Don Eddy, Robert Cottingham" },
      { icon: "TbCar", t: "Autos & Wohnwagen", d: "Chrom und Lack als Symbole des American Way of Life", k: "Robert Bechtle, Ralph Goings, Tom Blackwell" },
      { icon: "TbToolsKitchen2", t: "Diners & Imbiss", d: "Theken, Ketchupflaschen, Kaffeetassen", k: "Ralph Goings" },
      { icon: "TbUser", t: "Porträts", d: "Gesichter im Riesenformat", k: "Chuck Close, Franz Gertsch" },
      { icon: "TbCandy", t: "Konsum & Stillleben", d: "Kaugummiautomaten, Spielzeug, Symbole der Vergänglichkeit", k: "Charles Bell, Audrey Flack" },
      { icon: "TbMan", t: "Mensch & Körper", d: "Lebensechte Figuren, Haut, Poren, Haare", k: "Duane Hanson, Ron Mueck" },
    ],
    notes:
      "Die Motive stammen fast immer aus dem Alltag: Großstadt und Schaufenster mit Spiegelungen und Leuchtreklame, Autos und Wohnwagen als Symbole des amerikanischen Lebensstils und Diners – also typisch amerikanische Imbissrestaurants. " +
      "Dazu kommen Porträts im Riesenformat und Stillleben mit Konsumgütern oder Vanitas-Symbolen. Vanitas heißt auf Latein „Nichtigkeit“: Gegenstände wie Kerze, Uhr oder welkes Obst erinnern an die Vergänglichkeit. " +
      "Im Hyperrealismus steht oft der Mensch selbst im Mittelpunkt – als lebensechte Skulptur.",
  },

  // 13 · Vertreter Fotorealismus
  vertreterFoto: {
    kicker: "04 · HAUPTVERTRETER FOTOREALISMUS",
    title: "Die Pioniere: USA und Europa",
    items: [
      { name: "Richard Estes", daten: "* 1932 · USA", d: "Mitbegründer; New Yorker Stadtansichten voller Spiegelungen" },
      { name: "Chuck Close", daten: "1940–2021 · USA", d: "Monumentale Porträts, im Raster übertragen" },
      { name: "Ralph Goings", daten: "1928–2016 · USA", d: "Diners, Pick-ups und Wohnwagen" },
      { name: "Audrey Flack", daten: "1931–2024 · USA", d: "Wichtigste Künstlerin der ersten Generation; Vanitas-Stillleben" },
      { name: "Robert Bechtle", daten: "1932–2020 · USA", d: "Kalifornische Vorstadt: Autos, Häuser, Familien" },
      { name: "Franz Gertsch", daten: "1930–2022 · Schweiz", d: "Gilt als wichtigster europäischer Fotorealist" },
    ],
    notes:
      "Die meisten Fotorealisten kommen aus den USA. Richard Estes gilt als Mitbegründer, Chuck Close malte riesige Porträts – beide habt ihr schon gesehen. " +
      "Ralph Goings malte vor allem Diners, Pick-ups und Wohnwagen. Audrey Flack war die wichtigste Künstlerin der ersten Generation, Robert Bechtle zeigte die kalifornische Vorstadt. " +
      "Der wichtigste Europäer ist der Schweizer Franz Gertsch, der 1972 auf der documenta 5 bekannt wurde.",
  },

  // 14 · Vertreter Hyperrealismus
  vertreterHyper: {
    kicker: "04 · HAUPTVERTRETER HYPERREALISMUS",
    title: "Skulptur und Malerei bis heute",
    cool: true,
    items: [
      { name: "Duane Hanson", daten: "1925–1996 · USA", d: "Lebensgroße Figuren aus Kunstharz mit echter Kleidung" },
      { name: "John De Andrea", daten: "* 1941 · USA", d: "Lebensechte Aktfiguren aus bemaltem Kunststoff" },
      { name: "Ron Mueck", daten: "* 1958 · Australien, lebt in London", d: "Silikonskulpturen mit verändertem Maßstab" },
      { name: "Gottfried Helnwein", daten: "* 1948 · Österreich/Irland", d: "Verletzte Kinder, NS-Geschichte – Malerei als Provokation" },
      { name: "Roberto Bernardi", daten: "* 1974 · Italien", d: "Glas, Süßes und Spiegelungen in Öl" },
      { name: "Robin Eley", daten: "* 1978 · Großbritannien/Australien", d: "Menschen in Plastikfolie – die Folie ist nur gemalt" },
    ],
    notes:
      "Im Hyperrealismus spielen Skulpturen eine große Rolle: Duane Hanson schuf lebensgroße Alltagsmenschen mit echter Kleidung, John De Andrea Aktfiguren, und Ron Mueck macht seine Figuren riesig oder winzig. " +
      "In der Malerei provoziert Gottfried Helnwein, Roberto Bernardi malt Glas und Süßigkeiten, und bei Robin Eley ist sogar die Plastikfolie um die Menschen nur gemalt.",
  },

  // 15–19 · Werkbeispiele
  paare: [
    {
      kicker: "05 · WERKBEISPIELE",
      title: "Pioniere: Die Vorlage wird zum Bild",
      werke: ["morley_amsterdam", "gertsch_medici"],
      notes:
        `Links: ${cap("morley_amsterdam")}. Morley malte das Passagierschiff nach einem gedruckten Werbebild und übertrug es mit einem Raster Feld für Feld. Bei manchen Schiffsbildern malte er sogar den weißen Postkartenrand mit – er malt also nicht das Schiff, sondern ein Bild vom Schiff. ` +
        `Rechts: ${cap("gertsch_medici")}. Fünf junge Männer lehnen an einer Bauabsperrung der Firma Medici – daher der Titel. Das Bild ist vier mal sechs Meter groß, entstand nach einem einzigen Schnappschuss und brachte Gertsch 1972 auf der documenta 5 den Durchbruch.`,
    },
    {
      kicker: "05 · WERKBEISPIELE",
      title: "Amerikanischer Alltag: Auto und Schaufenster",
      werke: ["bechtle_pontiac", "eddy_shoes"],
      notes:
        `Links: ${cap("bechtle_pontiac")}. Bechtle steht hier mit seiner Frau und seinen Kindern vor dem Familienauto. Das Bild wirkt wie ein ganz normales Familienfoto – und genau das ist der Punkt: Bechtle zeigt die Ordnung der amerikanischen Vorstadt, ohne sie zu bewerten. Das ist das Merkmal Neutralität. ` +
        `Rechts: ${cap("eddy_shoes")}. Man blickt in ein Schuhgeschäft; Spiegelungen der Straße legen sich über die Schuhe, sodass man kaum sagen kann, was vor und was hinter der Scheibe ist. ` +
        "Frage an euch: Welche Merkmale erkennt ihr hier wieder? (kurz Antworten abwarten: Spiegelungen, Schärfe, Alltagsmotiv)",
    },
    {
      kicker: "05 · WERKBEISPIELE",
      title: "Konsum und Vergänglichkeit",
      werke: ["bell_gumball", "flack_marilyn"],
      notes:
        `Links: ${cap("bell_gumball")}. Ein Kaugummiautomat, vergrößert auf 1,68 Meter. „Sugar Daddy“ ist übrigens eine amerikanische Karamell-Lutscher-Marke. Bell zeigt, wie Licht in Glas und glänzenden Kugeln gespiegelt und gebrochen wird – ein billiges Konsumprodukt wird zum monumentalen Bild. ` +
        `Rechts: ${cap("flack_marilyn")}. Ein Vanitas-Stillleben rund um ein Foto der jungen Marilyn Monroe: Sanduhr, Kerze, Obst und Schminke stehen für Schönheit und Vergänglichkeit. Flack hat die Dinge arrangiert, fotografiert und das Dia direkt auf die Leinwand projiziert. Hier wird der Fotorealismus emotional.`,
    },
    {
      kicker: "05 · WERKBEISPIELE · HYPERREALISMUS",
      title: "Der Mensch als Skulptur",
      cool: true,
      werke: ["hanson_supermarket", "mueck_mask"],
      notes:
        "Jetzt zum Hyperrealismus – an diesen beiden Werken weise ich seine zusätzlichen Merkmale nach. " +
        `Links: ${cap("hanson_supermarket")}. Eine Frau mit Lockenwicklern schiebt einen Einkaufswagen voller echter Verpackungen. Hanson hat die Figur über einem lebenden Menschen abgeformt und bemalt; die Kleidung ist echt. Besucher halten sie oft für eine echte Person. Anders als die kühlen Fotorealisten übt Hanson Kritik an der Konsumgesellschaft. ` +
        `Rechts: ${cap("mueck_mask")}. Muecks eigener Kopf, etwa viermal so groß wie in Wirklichkeit, liegt wie schlafend auf der Seite – jede Pore ist zu sehen. Mueck übertreibt den Maßstab, das kann kein Foto, und das löst Gefühle aus. Von hinten ist der Kopf hohl wie eine Maske: Die Illusion wird bewusst gebrochen.`,
    },
    {
      kicker: "05 · WERKBEISPIELE · HYPERREALISMUS",
      title: "Provokation und Wahrnehmung",
      cool: true,
      werke: ["helnwein_epiphany", "thielker_exhale"],
      notes:
        `Links: ${cap("helnwein_epiphany")}. Der Österreicher Helnwein beschäftigt sich mit der NS-Vergangenheit. In seiner Serie „Epiphany“ verbindet er die Weihnachtsszene – Maria mit dem Kind – mit Männern in Uniformen der NS-Zeit. Gerade weil das Bild so fotografisch und sachlich wirkt, ist es verstörend: Helnwein kritisiert, wie die NS-Vergangenheit verdrängt wurde. ` +
        `Rechts: ${cap("thielker_exhale")}. Wir blicken durch eine verregnete Windschutzscheibe. Die Tropfen sind gestochen scharf, die Landschaft dahinter verschwimmt – Thielker malt, wie eine Kameralinse sieht. Der Hyperrealismus ist also bis heute lebendig.`,
    },
  ],

  // 20 · Fazit
  fazit: {
    title: "Wirklicher als die Wirklichkeit?",
    antwortKicker: "MEINE ANTWORT",
    antwort: "Ja – und nein.",
    antwortText: "Ja, weil Estes schärfer malt, als Auge oder Kamera sehen. Nein, weil die Bilder nie die Wirklichkeit zeigen, sondern ein Foto davon – ein Bild von einem Bild.",
    frage: "Ist es Kunst, ein Foto perfekt abzumalen?",
    punkte: [
      { icon: "TbAlertTriangle", t: "Kritik", d: "Vorwurf des bloßen Abmalens: technisch perfekt, aber ohne eigene Idee." },
      { icon: "TbEye", t: "Bedeutung", d: "Die Werke zeigen, wie sehr wir Bildern vertrauen." },
      { icon: "TbDeviceMobile", t: "Aktualität", d: "Smartphones, Filter, KI-Bilder: Was ist heute noch „echt“?" },
      { icon: "TbHelp", t: "Frage an euch", d: "Ist es Kunst, ein Foto perfekt abzumalen?" },
    ],
    notes:
      "Zurück zu meiner Leitfrage: Wirklicher als die Wirklichkeit? Meine Antwort: Ja und nein. Ja, weil ein Bild wie das von Estes schärfer ist, als wir oder eine Kamera es je sehen könnten. Nein, weil die Bilder nie die Wirklichkeit selbst zeigen, sondern immer ein Foto davon – ein Bild von einem Bild. " +
      "Kritiker warfen dem Fotorealismus bloßes Abmalen vor. Ich sehe das anders: Die Künstler wählen aus, kombinieren und verändern – Estes setzt Fotos zusammen, Mueck verändert den Maßstab. Vor allem zeigen sie, wie sehr wir Bildern vertrauen. " +
      "In einer Zeit, in der jeder ständig fotografiert, Fotos filtert und KI täuschend echte Bilder erzeugt, ist das aktueller denn je. " +
      "Deshalb meine Frage an euch: Ist es Kunst, ein Foto perfekt abzumalen? (Diskussion) – Vielen Dank für eure Aufmerksamkeit!",
  },

  quellen: {
    kicker: "ANHANG",
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
    kicker: "ANHANG",
    title: "Bildnachweise",
    hinweis: "Abbildungen nur zu Unterrichtszwecken (§ 60a UrhG); Rechte bei den Künstlern bzw. Nachlässen. Webseiten abgerufen am 25.10.2026. Die drei Abbildungen des Handouts (Estes, Close, Hanson) sind hier mit nachgewiesen.",
    notes: "Bildnachweise – nicht vortragen, nur kurz zeigen.",
  },
};

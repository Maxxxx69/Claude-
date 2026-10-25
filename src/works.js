// Werkdaten – geprüft an Museums-/Galerieseiten (Recherche 25.10.2026).
// ratio = Breite / Höhe; bestimmt die Rahmengröße, solange kein Bild in bilder/<id>.jpg liegt.
// quelle = Seite mit Abbildung und Werkangaben (für die Bildnachweise); bild_url = direkte Bilddatei (optional, für bilder_laden.py)
module.exports = {
  goings_airstream: {
    kuenstler: "Ralph Goings", titel: "Airstream", titel_de: "Airstream-Wohnwagen", jahr: "1970",
    technik: "Öl auf Leinwand", masse: "152,3 × 213,5 cm", sammlung: "mumok Wien (Leihgabe Sammlung Ludwig, Aachen)",
    ratio: 1.40, merkmal: "Spiegelungen auf Aluminium in grellem Sonnenlicht",
    quelle: "mumok.at/en/online-collection/detail/airstream-1355",
  },
  estes_booths: {
    kuenstler: "Richard Estes", titel: "Telephone Booths", titel_de: "Telefonzellen", jahr: "1967",
    technik: "Acryl auf Masonit", masse: "122 × 175,3 cm", sammlung: "Museo Nacional Thyssen-Bornemisza, Madrid",
    ratio: 1.437, merkmal: "Spiegelungen in Glas und Metall, durchgehende Schärfe",
    quelle: "museothyssen.org/en/collection/artists/estes-richard/telephone-booths",
  },
  close_big: {
    kuenstler: "Chuck Close", titel: "Big Self-Portrait", titel_de: "Großes Selbstbildnis", jahr: "1967–68",
    technik: "Acryl auf Leinwand (Airbrush)", masse: "273,1 × 212,1 cm", sammlung: "Walker Art Center, Minneapolis",
    ratio: 0.777, merkmal: "Raster, Airbrush, mitgemalte fotografische Unschärfe",
    quelle: "walkerart.org/collections/artworks/big-self-portrait",
  },
  morley_amsterdam: {
    kuenstler: "Malcolm Morley", titel: "SS Amsterdam in Front of Rotterdam", titel_de: "Die SS Amsterdam vor Rotterdam", jahr: "1966",
    technik: "Acryl auf Leinwand", masse: "ca. 158 × 214 cm", sammlung: "Privatsammlung",
    ratio: 1.36, merkmal: "Werbebild als Vorlage – per Raster Feld für Feld übertragen",
    quelle: "petzel.com/collect/malcolm-morley4",
  },
  gertsch_medici: {
    kuenstler: "Franz Gertsch", titel: "Medici", titel_de: "", jahr: "1971/72",
    technik: "Dispersion auf ungrundiertem Halbleinen", masse: "400 × 600 cm", sammlung: "Ludwig Forum Aachen (Dauerleihgabe)",
    ratio: 1.5, merkmal: "4 × 6 m nach einem Schnappschuss – Durchbruch auf der documenta 5",
    quelle: "guide.kunstmuseumbern.ch/en/artwork/12884",
  },
  bechtle_pontiac: {
    kuenstler: "Robert Bechtle", titel: "’61 Pontiac", titel_de: "", jahr: "1968–69",
    technik: "Öl auf Leinwand", masse: "151,8 × 214 cm", sammlung: "Whitney Museum of American Art, New York",
    ratio: 1.41, merkmal: "Familienschnappschuss als Vorlage – Chrom und Lack glänzen",
    quelle: "whitney.org/collection/works/493",
    bild_url: "https://upload.wikimedia.org/wikipedia/en/5/54/Robert_Bechtle%2C_%E2%80%9961_Pontiac%2C_1968%E2%80%9369.jpg",
  },
  eddy_shoes: {
    kuenstler: "Don Eddy", titel: "New Shoes for H", titel_de: "Neue Schuhe für H", jahr: "1973–74",
    technik: "Acryl auf Leinwand", masse: "111,7 × 121,9 cm", sammlung: "Cleveland Museum of Art",
    ratio: 1.09, merkmal: "Schaufenster: Spiegelung und Durchblick überlagern sich",
    quelle: "clevelandart.org/art/1974.53",
  },
  flack_marilyn: {
    kuenstler: "Audrey Flack", titel: "Marilyn (Vanitas)", titel_de: "", jahr: "1977",
    technik: "Öl über Acryl auf Leinwand", masse: "243,8 × 243,8 cm", sammlung: "University of Arizona Museum of Art, Tucson",
    ratio: 1.0, merkmal: "Vanitas-Stillleben – Dia direkt auf die Leinwand projiziert",
    quelle: "uarizona.pastperfectonline.com (Inv.-Nr. 1982.035.001)",
  },
  bell_gumball: {
    kuenstler: "Charles Bell", titel: "Gum Ball No. 10: „Sugar Daddy“", titel_de: "Kaugummiautomat Nr. 10", jahr: "1975",
    technik: "Öl auf Leinwand", masse: "167,6 × 167,6 cm", sammlung: "Solomon R. Guggenheim Museum, New York",
    ratio: 1.0, merkmal: "Kaugummiautomat auf 1,68 m vergrößert – Licht in Glas",
    quelle: "guggenheim.org/artwork/artist/charles-bell",
  },
  hanson_supermarket: {
    kuenstler: "Duane Hanson", titel: "Supermarket Lady", titel_de: "", jahr: "1969/70",
    technik: "Polyesterharz, bemalt; echte Kleidung und Waren", masse: "lebensgroß", sammlung: "Ludwig Forum Aachen",
    ratio: 0.8, merkmal: "Abguss vom lebenden Modell – echte Kleidung, echte Waren",
    quelle: "ludwigforum.de/en/museum/restoration-workshop/supermarket-lady",
  },
  mueck_mask: {
    kuenstler: "Ron Mueck", titel: "Mask II", titel_de: "Maske II", jahr: "2001–02",
    technik: "Mischtechnik (u. a. Polyesterharz, Glasfaser, Kunsthaar)", masse: "77,2 × 118,1 × 85,1 cm", sammlung: "San Francisco Museum of Modern Art",
    ratio: 1.53, merkmal: "Kopf in etwa vierfacher Größe – jede Pore sichtbar",
    quelle: "sfmoma.org (Art Supporting Foundation to SFMOMA)",
    bild_url: "https://upload.wikimedia.org/wikipedia/commons/d/d9/%27Mask_ll%27_%282962794280%29.jpg",
  },
  helnwein_epiphany: {
    kuenstler: "Gottfried Helnwein", titel: "Epiphany II (Adoration of the Shepherds)", titel_de: "Epiphanie II (Anbetung der Hirten)", jahr: "1998",
    technik: "Öl und Acryl auf Leinwand", masse: "249,6 × 334 cm", sammlung: "de Young Museum, San Francisco",
    ratio: 1.34, merkmal: "Christliches Bildthema trifft NS-Bildwelt – Hyperrealismus als Provokation",
    quelle: "famsf.org/artworks/epiphany-ii-adoration-of-the-shepherds",
  },
  thielker_exhale: {
    kuenstler: "Gregory Thielker", titel: "Exhale", titel_de: "Ausatmen", jahr: "2023",
    technik: "Öl auf Leinen", masse: "101,6 × 152,4 cm", sammlung: "Guy Hepner Gallery, New York",
    ratio: 1.5, merkmal: "Tropfen gestochen scharf, Landschaft unscharf – wie durch eine Linse",
    quelle: "guyhepner.com/artworks/9873-gregory-thielker-exhale-2023",
  },
};

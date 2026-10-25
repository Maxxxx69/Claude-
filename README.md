# Referat: Fotorealismus & Hyperrealismus

| Datei | Inhalt |
|---|---|
| `Fotorealismus_Hyperrealismus.pptx` | Präsentation (22 Folien, 16:9) mit vollständigem Vortragstext in den Sprechernotizen |
| `Handout_Fotorealismus_Hyperrealismus.docx` | Handout, genau 1 A4-Blatt beidseitig (2 Druckseiten), ohne Quellen (laut Vorgabe) |
| `Handout_Fotorealismus_Hyperrealismus.pdf` | Handout als PDF zum Verschicken über Edupage |
| `src/` | Generator-Skripte (Texte in `src/texts.js`, Werkdaten in `src/works.js`) |

## In Keynote öffnen

Keynote → *Ablage → Öffnen* → `Fotorealismus_Hyperrealismus.pptx` → danach *Ablage → Sichern* als Keynote-Datei.
Schriften: Georgia (Titel) und Arial (Text) sind auf jedem Mac vorhanden.
Die Sprechernotizen siehst du in Keynote unter *Darstellung → Moderatornotizen einblenden*. Hinter jeder Notiz steht die geschätzte Sprechzeit.

## Vor dem Vortrag erledigen

1. **Name, Kurs, Datum eintragen:** Titelfolie (Folie 3) und Handout-Kopf. Am einfachsten in `src/texts.js` bei `meta` eintragen und neu bauen, sonst direkt in Keynote bzw. Pages/Word.
2. **Abbildungen einsetzen:** Alle grauen Rahmen „Abbildung einfügen“ sind Platzhalter mit dem genauen Werk. Wo du die Bilder findest, steht auf der Folie „Bildnachweise“ (Museumsseiten).
   - **Empfohlen:** Bilder als `bilder/<id>.jpg` speichern (z. B. `bilder/estes_booths.jpg`; die IDs stehen in `src/works.js`) und neu bauen. Rahmen und Ecken passen sich dann automatisch an das Bild an, und auch das Handout bekommt die drei Bilder.
   - **Alternativ in Keynote:** Platzhalter-Rechteck, Symbol und Text löschen, Bild hineinziehen und an die gelben Ecken anpassen.
3. **Handout als PDF** mindestens zwei Werktage vorher über Edupage schicken.
4. **Einmal laut mit Stoppuhr proben:** Ziel 12–14 Minuten inklusive Publikumsfragen.
5. Optional in Keynote: zwischen Folie 1 und 2 den Übergang „Zauberei“ setzen und auf den Karten-Folien „Aufbau“-Effekte hinzufügen.

## Neu bauen (nach Änderungen an Texten oder Bildern)

```bash
python3 src/bilder_laden.py   # lädt Bilder aus works.js → bild_url (wo vorhanden)
src/build.sh                  # baut .pptx und .docx, prüft beide, rendert Vorschaubilder
```

Benötigt Node.js mit `pptxgenjs`, `sharp`, `react-icons`, `react`, `react-dom`, `docx` sowie LibreOffice (nur für die Vorschau).

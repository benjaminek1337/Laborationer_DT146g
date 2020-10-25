
# Laboration 4
## Environment & Tools / Utvecklingsmiljö & Verktyg
Windows 10, Visual Studio Code, Git version: 2.28.0.windows.1

## Purpose / Syfte
Syftet med denna laboration upplevde jag vara att fördjupa kunskaperna
inom JS genom att skapa bokningsformuläret med fler rörliga delar än
vad bildvisaren har, och således bekantas med JS lite mer.

## Procedures / Genomförande
Uppgifter som behövde utföras för att uppnå målet:

- Skapa utrymme för bokningsformuläret och sätesväljaren genom
  HTML/CSS

- Skapa inmatningar för namn och personnr, samt knappar för att boka
  biljett, samt för att rensa alla fält

- Generera bokningsbara säten, i detta fall dynamiskt genererade knappar

- Skapa kontroller för huruvida formuläret är korrekt ifyllt eller inte,
  för att kunna få genomföra bokningen, samt låsa upp bokningsknappen

- Ge sätena klick-event för att välja ett säte (lagras i en global 
  variabel), se till att valt säte får fokus i gränssnittet samt 
  för att kontrollera om formuläret nu är ifyllt eller inte

- Lagra genomförda bokningar i en array, där genomförda bokningar ser
  till att ett redan bokat säte ej kan bokas igen, och visualiseras 
  som upptaget i gränssnittet

- Generera biljett, validerbar i enighet med HTML5-standard, samt   presentera
  biljetten i ett nytt fönster, även förberett för utskrift genom CSS.

- Skapa funktion för att rensa formuläret

- Skapa sessionstorage för att kunna spara bokningarna, samt pågående bokning
  så länge fliken i webbläsaren inte är stängd, och se till att allt laddas in
  vid sidladdning om det finns någon lagrad data

### Revision
- Kommenterat koden

- Sett till att endast ett load event väntar i main.js

- Reviderat labb 3s del av main.js i enighet med tidigare laboration

- Ändrat personnr-validatorn till att vara mer tillåtande i enighet med rätten till lika villkor
  

## Discussion / Diskussion
Rolig liten utmaning, det mesta här var bekant sen innan. Sessionstorage var nytt för mig, då vi i systerprogrammet Informatik arbetat mycket med webb, men då använt oss av cookies på serversidan. Det var dock ingen jobbigare nöt att knäcka.
Fältvalidering via regex var lyckligtvis inte obligatoriskt, jag gjorde en rudimentär check för personnummret, men det blev lite hackigt. Resten av mitt jobb känns ok.

Då denna uppgift endast behandlade platsbokning med 18 säten uppdelade på 6 rader hårdkodade jag det. Men ponera att det fanns flera olika flygplan med olika säteskonfigurationer, då hade jag fått se till att den hämtade data om ett specifikt flygplan, och att detta reflekteras i gränssnittet. Men det kändes vara utanför scopet för denna uppgift.

Huruvida script-taggen ska placeras i head eller body, jag har inte läst på 
allt för mycket om just det ämnet, men allmän koncensus när jag kikar på
nätet verkar det som att de allra flesta anser att script-taggen gör sig bra
längst ned i body, så DOM-elementen är tillgängliga då scriptfilen laddas in.
Vad finns det för argument för att placera taggen inuti head istället?


function highlightCurrentLesson() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const day = now.getDay();
    // Sonntag = 0, Montag = 1, ... Samstag = 6
    const tbodys = document.getElementsByTagName("tbody");
    const tbody = tbodys[0];
    const rows = tbody.rows;

    // Alle Hervorhebungen entfernen
    for (let row of rows) {
        for (let cell of row.cells) {
            cell.classList.remove("highlight");
        }
    }
    // passende Zeit finden
    for (let row of rows) {
        const zeitText = row.cells[0].innerText; // z. B. "08:00 - 09:00"
        var zeiten = zeitText.split(" Uhr - ");
        zeiten[1] = zeiten[1].split(" ")[0];
        const [start, ende] = zeiten.map(t => {
            const [h, m] = t.split(":").map(Number);
            return h * 60 + m;
        });
        const aktuelleMinuten = hours * 60 + minutes;
        if (aktuelleMinuten >= start && aktuelleMinuten < ende) {
            // Wenn Montag-Freitag (1–5)
            if (day >= 1 && day <= 5) {
                row.cells[day].classList.add("highlight");
            }
            break;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // gleich beim Laden ausführen
    highlightCurrentLesson();
});
// alle 10 Sekunden aktualisieren
setInterval(highlightCurrentLesson,  10 * 1000);


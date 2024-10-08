import http from 'k6/http';  // Importiert das HTTP-Modul von K6 für HTTP-Anfragen
import { sleep } from 'k6';   // Importiert die Schlaf-Funktion von K6

// Basis-URL für die API, entweder aus Umgebungsvariablen oder Standardwert
const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';

// Konfiguration der Testoptionen
export let options = {
    stages: [
        { duration: '30s', target: 100 },  // Steigert die Nutzerzahl auf 100 über 30 Sekunden
        { duration: '1m', target: 250 },    // Steigert die Nutzerzahl auf 250 über 1 Minute
        { duration: '1m', target: 500 },    // Steigert die Nutzerzahl auf 500 über 1 Minute
        { duration: '2m', target: 0 }        // Reduziert die Nutzerzahl auf 0 über 2 Minuten
    ]
};

// Hauptfunktion, die bei jedem Testdurchlauf aufgerufen wird
export default function () {
    http.get(`${BASE_URL}/feedback`);  // Führt eine GET-Anfrage an die Feedback-Route aus
    sleep(1);                            // Wartet 1 Sekunde, bevor die nächste Anfrage gesendet wird
}

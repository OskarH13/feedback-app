import http from 'k6/http';  // Importiert das HTTP-Modul von K6 für HTTP-Anfragen
import { check } from 'k6';  // Importiert die Funktion zur Überprüfung von Anfragen
import { Rate } from 'k6/metrics';  // Importiert die Rate-Metrik zur Verfolgung von Fehlern

// Definiert eine neue Rate-Metrik zur Erfassung von Fehlern
export let errorRate = new Rate('errors');

// Basis-URL für die API, entweder aus Umgebungsvariablen oder Standardwert
const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';

// Konfiguration der Testoptionen
export let options = {
    thresholds: {
        "errors": ["rate==0"]  // Erwartet keine Fehler
    }
};

// Hilfsfunktion zum Überprüfen von Anfragen und Hinzufügen zur Fehlerstatistik
const addCheck = (response, checks) => {
    let passed = check(response, checks);
    if (!passed) {
        errorRate.add(1);  // Zählt den Fehler, wenn die Prüfung fehlschlägt
    }
}

// POST /feedback - Fügt neues Feedback hinzu
const createFeedback = () => {
    const payload = JSON.stringify({
        title: 'Test Feedback',
        text: 'This is a test feedback created by integration tests.'
    });

    const headers = { 'Content-Type': 'application/json' };  // Setzt den Content-Type Header

    const response = http.post(`${BASE_URL}/feedback`, payload, { headers });  // Führt die POST-Anfrage aus

    addCheck(response, {
        'POST /feedback valid data: status code 201 (Created)': (res) => res.status === 201,
        'POST /feedback response has message': (res) => res.json('message') === 'Feedback erfolgreich gespeichert.'
    });
};

// POST /feedback - Testet das Hinzufügen von Feedback ohne Daten
const createFeedbackNoData = () => {
    const payload = JSON.stringify({});
    
    const headers = { 'Content-Type': 'application/json' };  // Setzt den Content-Type Header

    const response = http.post(`${BASE_URL}/feedback`, payload, { headers });  // Führt die POST-Anfrage aus

    addCheck(response, {
        'POST /feedback missing data: status code 400 (Bad Request)': (res) => res.status === 400,
        'POST /feedback error message for missing data': (res) => res.json('message') === 'title und text sind im body erforderlich.'
    });
};

// POST /feedback - Testet das Hinzufügen von Feedback ohne Titel
const createFeedbackNoTitle = () => {
    const payload = JSON.stringify({
        text: 'This is feedback with no title.'
    });
    
    const headers = { 'Content-Type': 'application/json' };  // Setzt den Content-Type Header

    const response = http.post(`${BASE_URL}/feedback`, payload, { headers });  // Führt die POST-Anfrage aus

    addCheck(response, {
        'POST /feedback missing title: status code 400 (Bad Request)': (res) => res.status === 400,
        'POST /feedback error message for missing title': (res) => res.json('message') === 'title und text sind im body erforderlich.'
    });
};

// POST /feedback - Testet das Hinzufügen von Feedback ohne Text
const createFeedbackNoText = () => {
    const payload = JSON.stringify({
        title: 'Feedback without text.'
    });
    
    const headers = { 'Content-Type': 'application/json' };  // Setzt den Content-Type Header

    const response = http.post(`${BASE_URL}/feedback`, payload, { headers });  // Führt die POST-Anfrage aus

    addCheck(response, {
        'POST /feedback missing text: status code 400 (Bad Request)': (res) => res.status === 400,
        'POST /feedback error message for missing text': (res) => res.json('message') === 'title und text sind im body erforderlich.'
    });
};

// POST /feedback - Testet das Hinzufügen von ungültigen Daten
const createFeedbackInvalidData = () => {
    const payload = JSON.stringify({
        invalidtitle: 'Invalid title.',
        invalidtext: 'Invalid text'
    });
    
    const headers = { 'Content-Type': 'application/json' };  // Setzt den Content-Type Header

    const response = http.post(`${BASE_URL}/feedback`, payload, { headers });  // Führt die POST-Anfrage aus

    addCheck(response, {
        'POST /feedback invalid data: status code 400 (Bad Request)': (res) => res.status === 400,
        'POST /feedback error message for invalid data': (res) => res.json('message') === 'title und text sind im body erforderlich.'
    });
};

// GET /feedback - Ruft alle Feedback-Einträge ab
const getAllFeedback = () => {
    const response = http.get(`${BASE_URL}/feedback`);  // Führt die GET-Anfrage aus

    addCheck(response, {
        'GET /feedback status code 200 (OK)': (res) => res.status === 200,
        'GET /feedback response contains an array': (res) => Array.isArray(res.json())
    });
};

// DELETE /feedback/:title - Löscht Feedback anhand des Titels
const deleteFeedback = () => {
    const response = http.del(`${BASE_URL}/feedback/Test Feedback`);  // Führt die DELETE-Anfrage aus

    addCheck(response, {
        'DELETE /feedback/:title status code 200 (OK)': (res) => res.status === 200,
        'DELETE /feedback/:title response has message': (res) => res.json('message') === 'Feedback erfolgreich geloescht.'
    });
};

// DELETE /feedback/:title - Versucht, nicht vorhandenes Feedback zu löschen
const deleteNonExistentFeedback = () => {
    const response = http.del(`${BASE_URL}/feedback/NonExistentFeedback`);  // Führt die DELETE-Anfrage aus

    addCheck(response, {
        'DELETE /feedback/:title status code 404 (Not Found)': (res) => res.status === 404,
        'DELETE /feedback/:title response has error message': (res) => res.json('message') === 'Feedback nicht gefunden.'
    });
};

// Hauptfunktion, die bei jedem Testdurchlauf aufgerufen wird
export default function () {
    createFeedback();              // Fügt Feedback hinzu
    createFeedbackNoData();        // Testet leeres Feedback
    createFeedbackNoTitle();       // Testet Feedback ohne Titel
    createFeedbackNoText();        // Testet Feedback ohne Text
    createFeedbackInvalidData();   // Testet ungültige Daten
    getAllFeedback();              // Ruft alle Feedbacks ab
    deleteFeedback();              // Löscht Feedback
    deleteNonExistentFeedback();   // Versucht, nicht vorhandenes Feedback zu löschen
}

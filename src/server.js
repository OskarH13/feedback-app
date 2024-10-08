import express from 'express';  // Importiert das Express-Paket
import cors from 'cors';  // Importiert das CORS-Paket für Cross-Origin Resource Sharing
import feedbackRouter from './routes/feedbackRoutes.js';  // Importiert die Feedback-Routen
import { createTable } from './db.js';  // Importiert die Funktion zum Erstellen der Tabelle

// Erstellen der Express-App
const app = express();
const PORT = 3000;  // Definiert den Port, auf dem der Server laufen soll

// Setup CORS
app.use(cors());  // Aktiviert CORS, um Anfragen von anderen Ursprüngen zuzulassen
// Middleware für das Parsen von JSON-Daten
app.use(express.json());  // Ermöglicht das Parsen von JSON im Anforderungs-Body

// Erstellen der Feedback-Tabelle
createTable();  // Ruft die Funktion auf, um die Feedback-Tabelle zu erstellen

// Verwendung der Feedback-Routen
app.use('/', feedbackRouter);  // Bindet die Feedback-Routen an die Haupt-URL

// Startet die App
app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);  // Gibt eine Bestätigung aus, dass der Server läuft
});



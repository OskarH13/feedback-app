import pkg from 'pg';  // Importiert das PostgreSQL-Paket

const { Pool } = pkg;  // Destrukturiert die Pool-Klasse aus dem Paket

/**
 * Erstellt eine neue Verbindungspool-Instanz für PostgreSQL.
 * 
 * Die Verbindungsparameter werden aus Umgebungsvariablen geladen:
 * - DB_USER: Benutzername der Datenbank.
 * - DB_HOST: Hostname der Datenbank.
 * - DB_NAME: Name der Datenbank.
 * - DB_PASSWORD: Passwort des Benutzers.
 * - DB_PORT: Portnummer, auf der die Datenbank läuft.
 */
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

/**
 * Erstellt eine Feedback-Tabelle, falls sie nicht bereits existiert.
 * 
 * Diese Funktion erstellt eine Tabelle namens "feedback" mit den folgenden Spalten:
 * - id: Primärschlüssel, automatisch inkrementiert (SERIAL).
 * - title: Titel des Feedbacks, nicht leer (VARCHAR(255)).
 * - text: Der eigentliche Feedback-Text, nicht leer (TEXT).
 */
const createTable = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS feedback (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                text TEXT NOT NULL
            );
        `);
        console.log("Tabelle erfolgreich erstellt oder existiert bereits.");
    } catch (error) {
        console.error('Fehler beim Erstellen der Tabelle: ', error);
    }
}

export { pool, createTable };

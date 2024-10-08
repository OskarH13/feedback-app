import { pool } from './db.js';

/**
 * Fügt ein neues Feedback in die Datenbank ein.
 * 
 * @param {string} title - Der Titel des Feedbacks.
 * @param {string} text - Der Textinhalt des Feedbacks.
 * @returns {Object} - Das eingefügte Feedback-Objekt, das aus der Datenbank zurückgegeben wird.
 */
export const addFeedback = async (title, text) => {
    // SQL-Abfrage, die ein Feedback mit Titel und Text in die Datenbank einfügt
    const query = `INSERT INTO feedback (title, text) VALUES ($1, $2) RETURNING *;`;
    
    // Ausführen der Abfrage mit den übergebenen Parametern (title, text)
    const result = await pool.query(query, [title, text]);

    // Rückgabe des eingefügten Feedbacks
    return result.rows[0];
}

/**
 * Ruft alle Feedback-Einträge aus der Datenbank ab.
 * 
 * @returns {Array} - Ein Array von Feedback-Objekten.
 */
export const getAllFeedback = async () => {
    // SQL-Abfrage, die alle Feedback-Datensätze aus der Tabelle feedback auswählt
    const query = `SELECT * FROM feedback;`;
    
    // Ausführen der Abfrage
    const result = await pool.query(query);

    // Rückgabe aller Feedbacks als Array von Objekten
    return result.rows;
}

/**
 * Löscht ein Feedback basierend auf dem Titel.
 * 
 * @param {string} title - Der Titel des zu löschenden Feedbacks.
 * @returns {Object} - Das gelöschte Feedback-Objekt oder eine leere Rückgabe, wenn kein Feedback gefunden wurde.
 */
export const deleteFeedbackByTitle = async (title) => {
    // SQL-Abfrage, die das Feedback mit dem angegebenen Titel löscht
    const query = `DELETE FROM feedback WHERE title = $1 RETURNING *;`;
    
    // Ausführen der Abfrage mit dem Titel als Parameter
    const result = await pool.query(query, [title]);

    // Rückgabe des gelöschten Feedbacks (falls gefunden)
    return result;
}

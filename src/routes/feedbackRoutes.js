import express from 'express';
import { addFeedback, getAllFeedback, deleteFeedbackByTitle } from '../controllers/feedbackController.js';
import { feedbackValidation } from '../middleware/validation.js';
import { sendSuccess, sendError } from '../utils/responseHelper.js';

const feedbackRouter = express.Router();

/**
 * POST /feedback
 * 
 * Fügt neues Feedback hinzu.
 * 
 * @route {POST} /feedback
 * @param {Object} req - Das Anforderungsobjekt enthält das Feedback in req.body (title, text).
 * @param {Object} res - Das Antwortobjekt, das das Ergebnis der Anfrage an den Client sendet.
 * 
 * Validierungsmiddleware: Stellt sicher, dass die Felder 'title' und 'text' ausgefüllt sind.
 * Erfolgreiche Anfrage: Speichert das Feedback und gibt eine Erfolgsmeldung zurück.
 * Fehlerhafte Anfrage: Gibt eine Fehlermeldung zurück, wenn ein Fehler auftritt.
 */
feedbackRouter.post('/feedback', feedbackValidation, async (req, res) => { 
    try {
        const { title, text } = req.body;  // Extrahiert title und text aus dem Anfrage-Body
        const newFeedback = await addFeedback(title, text);  // Fügt das Feedback in die Datenbank ein
        sendSuccess(res, newFeedback, "Feedback erfolgreich gespeichert.");  // Erfolgreiche Antwort
    } catch (error) {
        sendError(res, "Fehler beim Speichern des Feedbacks.");  // Fehlerhafte Antwort
    }
});

/**
 * GET /feedback
 * 
 * Ruft alle Feedback-Einträge ab.
 * 
 * @route {GET} /feedback
 * @param {Object} req - Das Anforderungsobjekt.
 * @param {Object} res - Das Antwortsobjekt, das die Feedback-Daten an den Client sendet.
 * 
 * Erfolgreiche Anfrage: Gibt alle gespeicherten Feedback-Einträge zurück.
 * Fehlerhafte Anfrage: Gibt eine Fehlermeldung zurück, wenn ein Fehler auftritt.
 */
feedbackRouter.get('/feedback', async (req, res) => {
    try {
        const feedback = await getAllFeedback();  // Ruft alle Feedbacks aus der Datenbank ab
        sendSuccess(res, feedback, "Feedback erfolgreich abgefragt.");  // Erfolgreiche Antwort
    } catch (error) {
        sendError(res, "Fehler beim Abruf des Feedbacks.");  // Fehlerhafte Antwort
    }
});

/**
 * DELETE /feedback/:title
 * 
 * Löscht ein Feedback basierend auf dem Titel.
 * 
 * @route {DELETE} /feedback/:title
 * @param {Object} req - Das Anforderungsobjekt enthält den Titel als URL-Parameter.
 * @param {Object} res - Das Antwortsobjekt, das das Ergebnis der Anfrage an den Client sendet.
 * 
 * Erfolgreiche Anfrage: Löscht das Feedback und gibt eine Erfolgsmeldung zurück.
 * Fehlerhafte Anfrage: Gibt eine Fehlermeldung zurück, wenn der Titel nicht gefunden oder ein anderer Fehler auftritt.
 */
feedbackRouter.delete('/feedback/:title', async (req, res) => {
    try {
        const { title } = req.params;  // Extrahiert den Titel aus den URL-Parametern
        const result = await deleteFeedbackByTitle(title);  // Löscht das Feedback basierend auf dem Titel
        
        if (result.rowCount === 0) {
            return sendError(res, "Feedback nicht gefunden", 404);  // Feedback wurde nicht gefunden
        }
        sendSuccess(res, null, "Feedback erfolgreich gelöscht.");  // Erfolgreiche Löschung
    } catch (error) {
        sendError(res, "Fehler beim Löschen des Feedbacks.");  // Fehlerhafte Antwort
    }
});

export default feedbackRouter;

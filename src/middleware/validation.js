import { body, validationResult } from 'express-validator';

/**
 * Validierungsmiddleware für Feedback-Formulare.
 * 
 * Diese Middleware validiert die Felder 'title' und 'text' im Feedback-Formular.
 * - 'title' muss ausgefüllt sein, andernfalls wird eine Fehlermeldung zurückgegeben.
 * - 'text' muss ebenfalls ausgefüllt sein, andernfalls wird eine Fehlermeldung zurückgegeben.
 * 
 * Bei einer fehlerhaften Validierung wird eine JSON-Antwort mit den Fehlern und einem HTTP-Statuscode 400 gesendet.
 */
export const feedbackValidation = [
    // Überprüft, ob das 'title'-Feld nicht leer ist
    body('title').notEmpty().withMessage("Titel ist erforderlich."),
    
    // Überprüft, ob das 'text'-Feld nicht leer ist
    body('text').notEmpty().withMessage("Text ist erforderlich."),

    /**
     * Überprüft, ob Validierungsfehler vorhanden sind.
     * 
     * @param {Request} req - Das eingehende Anforderungsobjekt.
     * @param {Response} res - Das Antwortobjekt, um die Antwort zu senden.
     * @param {Function} next - Die nächste Middleware-Funktion im Stapel.
     * 
     * Falls Fehler vorhanden sind, wird eine JSON-Antwort mit den Fehlern zurückgegeben.
    

/**
 * Sendet eine erfolgreiche Antwort zurück.
 * 
 * Diese Funktion wird verwendet, um eine standardisierte Erfolgsmeldung mit den
 * entsprechenden Daten und einer optionalen Nachricht an den Client zu senden.
 * 
 * @param {Object} res - Das Antwortobjekt, um die Antwort an den Client zu senden.
 * @param {Object} data - Die Daten, die an den Client zurückgegeben werden.
 * @param {string} [message="Anfrage erfolgreich."] - Eine optionale Nachricht, die standardmäßig gesetzt ist.
 */
export const sendSuccess = (res, data, message = "Anfrage erfolgreich.") => {
    // Senden einer Antwort mit Statuscode 200 (OK) und der Erfolgsnachricht und Daten
    res.status(200).json({ message, data });
};

/**
 * Sendet eine Fehlerantwort zurück.
 * 
 * Diese Funktion wird verwendet,

/**
 * Fehlerbehandlungs-Middleware für Express.
 * 
 * Diese Middleware fängt alle Fehler ab, die im Anwendungsfluss auftreten,
 * und sendet eine standardisierte Fehlermeldung als Antwort an den Client.
 * 
 * @param {Error} err - Das Fehlerobjekt, das aufgetreten ist.
 * @param {Request} req - Das eingehende Anforderungsobjekt.
 * @param {Response} res - Das Antwortobjekt, das verwendet wird, um die Antwort zu senden.
 * @param {Function} next - Die nächste Middleware-Funktion im Stapel.
 */
export const errorHandler = (err, req, res, next) => {
    // Protokolliert den Fehlerstack in der Konsole für Debugging-Zwecke
    console.error(err.stack);

    // Sendet eine 500-Fehlermeldung (Internal Server Error) als JSON-Antwort an den Client
    res.status(500).json({ error: "Internal Server Error" });
};

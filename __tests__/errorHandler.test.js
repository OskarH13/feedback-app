// __tests__/errorHandler.test.js
import { errorHandler } from '../middlewares/errorHandler';
import express from 'express';
import request from 'supertest';

const app = express();

// Definiere eine Route, die absichtlich einen Fehler auslöst
app.get('/error', (req, res) => {
    throw new Error('Test Error');
});

// Anwenden der Error-Handler-Middleware
app.use(errorHandler);

describe('Error Handler Middleware', () => {
    it('should handle errors and return 500', async () => {
        const response = await request(app).get('/error');

        expect(response.status).toBe(500);
        expect(response.body.error).toBe('Internal Server Error');
    });
});

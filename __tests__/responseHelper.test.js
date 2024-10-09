// __tests__/responseHelper.test.js
import { sendSuccess, sendError } from '../utils/responseHelper';

describe('Response Helper', () => {
    const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };

    // Reset Mocks nach jedem Test
    afterEach(() => {
        jest.clearAllMocks();
    });

    // Test für erfolgreiche Antwort
    it('should send success response with default message', () => {
        sendSuccess(mockRes, { id: 1, title: 'Test' });

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: 'Operation successful',
            data: { id: 1, title: 'Test' },
        });
    });

    // Test für fehlerhafte Antwort
    it('should send error response with custom status code', () => {
        sendError(mockRes, 'An error occurred', 400);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({ error: 'An error occurred' });
    });
});

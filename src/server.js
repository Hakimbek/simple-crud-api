import { createServer } from 'node:http';
import { sendJSON } from './utils/sendJSON.js';
import { PORT, USER_URL } from './constants.js';
import { getUser, addUser, editUser, deleteUser } from './user/user.js';

const users = [];

const server = createServer((req, res) => {
    try {
        const { method, url } = req;

        if (url.startsWith(USER_URL)) {
            const userId = url.split('/')[3];

            switch (method) {
                case 'GET':
                    getUser(res, users, userId);
                    break;
                case 'POST':
                    addUser(req, res, users);
                    break;
                case 'PUT':
                    editUser(req, res, users, userId);
                    break;
                case 'DELETE':
                    deleteUser(res, users, userId);
                    break;
                default:
                    sendJSON(res, 405, { message: 'Method not allowed' });
            }
        } else {
            sendJSON(res, 404, { message: 'Route not found' });
        }
    } catch {
        sendJSON(res, 500, { message: 'Internal server error' });
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
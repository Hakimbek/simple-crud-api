import { createServer } from 'node:http';
import { validate, v4 as uuidv4 } from 'uuid'

const PORT = process.env.PORT || 3000;

const users = [];

const server = createServer((req, res) => {
    const { method, url } = req;

    const sendJSON = (status, data) => {
        res.writeHead(status, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));
    };

    const getBody = () =>
        new Promise((resolve) => {
            let body = '';
            req.on('data', (chunk) => (body += chunk));
            req.on('end', () => {
                try {
                    resolve(JSON.parse(body || '{}'));
                } catch {
                    resolve({});
                }
            });
        });

    if (method === 'GET' && url === '/api/users') {
        sendJSON(200, users);
    } else if (method === 'GET' && url.startsWith('/api/users/')) {
        const userId = url.split('/')[3];
        const user = users.find(user => user.id === userId);

        if (!validate(userId)) {
            sendJSON(400, { message: 'Invalid user ID format' });
            return;
        }

        if (user) {
            sendJSON(200, user);
        } else {
            sendJSON(404, { message: 'User not found' });
        }
    } else if (url === '/api/users' && method === 'POST') {
        getBody().then((body) => {
            if (!body.username) {
                return sendJSON(400, { message: 'Username is required' });
            }

            if (typeof body.username !== 'string') {
                return sendJSON(400, { message: 'Username must be a string' });
            }

            if (!body.age) {
                return sendJSON(400, { message: 'Age is required' });
            }

            if (typeof body.age !== 'number') {
                return sendJSON(400, { message: 'Age must be a number' });
            }

            if (!body.hobbies) {
                return sendJSON(400, { message: 'Hobbies are required' });
            }

            if (!Array.isArray(body.hobbies)) {
                return sendJSON(400, { message: 'Hobbies must be an array' });
            }

            const newUser = {
                id: uuidv4(),
                username: body.username,
                age: body.age,
                hobbies: body.hobbies,
            };

            users.push(newUser);
            sendJSON(201, newUser);
        });
    } else if (url.startsWith('/api/users') && method === 'PUT') {
        const userId = url.split('/')[3];

        if (!validate(userId)) {
            sendJSON(400, { message: 'Invalid user ID format' });
            return;
        }

        return getBody().then((body) => {
            const index = users.findIndex((user) => user.id === userId);
            if (index === -1) return sendJSON(404, { message: 'User not found' });

            users[index] = { ...users[index], ...body };
            sendJSON(200, users[index]);
        });
    } else if (url.startsWith('/api/users/') && method === 'DELETE') {
        const userId = url.split('/')[3];

        if (!validate(userId)) {
            sendJSON(400, { message: 'Invalid user ID format' });
            return;
        }

        const index = users.findIndex((user) => user.id === userId);

        if (index === -1) {
            return sendJSON(404, { message: 'User not found' });
        }

        const deletedUser = users[index];
        users.splice(index, 1);
        return sendJSON(204);
    } else {
        sendJSON(404, { message: 'Route not found' });
    }
});

server.listen(PORT, () => {
    console.log('🚀 Server running at http://localhost:3000');
});
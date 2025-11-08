import { v4 as uuidv4 } from "uuid";
import { sendJSON } from "../utils/sendJSON.js";
import { getBody } from "../utils/getBody.js";
import { validateUUID } from '../utils/validateUUID.js';
import { validateBody } from '../utils/validateBody.js';

export const getUser = (res, users, userId) => {
    if (userId) {
        const user = users.find(user => user.id === userId);

        if (validateUUID(res, userId)) {
            return;
        }

        if (!user) {
            return sendJSON(res, 404, { message: 'User not found' });
        }

        sendJSON(res, 200, user);
    } else {
        sendJSON(res, 200, users);
    }
}

export const addUser = async (req, res, users) => {
    const body = await getBody(req);
    const validation = validateBody(body);

    if (!validation.isValid) {
        return sendJSON(res, 404, { message: validation.message });
    }

    const newUser = {
        id: uuidv4(),
        username: body.username,
        age: body.age,
        hobbies: body.hobbies,
    };

    users.push(newUser);
    sendJSON(res, 201, newUser);
}

export const editUser = async (req, res, users, userId) => {
    if (validateUUID(res, userId)) {
        return;
    }

    const body = await getBody(req);
    const index = users.findIndex((user) => user.id === userId);
    const validation = validateBody(body);

    if (!validation.isValid) {
        return sendJSON(res, 404, { message: validation.message });
    }

    users[index] = { ...users[index], ...body };
    sendJSON(res, 200, users[index]);
}

export const deleteUser = (res, users, userId) => {
    if (validateUUID(res, userId)) {
        return;
    }

    const index = users.findIndex((user) => user.id === userId);

    if (index === -1) {
        return sendJSON(res, 404, { message: 'User not found' });
    }

    users.splice(index, 1);
    return sendJSON(res, 204);
}
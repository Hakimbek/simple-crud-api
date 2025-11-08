import { validate } from "uuid";
import { sendJSON } from "./sendJSON.js";

export const validateUUID = (res, uuid) => {
    if (!validate(uuid)) {
        sendJSON(res, 400, { message: 'Invalid user ID format' });
        return true;
    }

    return false;
}
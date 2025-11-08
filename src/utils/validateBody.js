export const validateBody = (body) => {
    if (!body.username) {
        return { isValid: false, message: 'Username is required' };
    }

    if (typeof body.username !== 'string') {
        return { isValid: false, message: 'Username must be a string' };
    }

    if (!body.age) {
        return { isValid: false, message: 'Age is required' };
    }

    if (typeof body.age !== 'number') {
        return { isValid: false, message: 'Age must be a number' };
    }

    if (!body.hobbies) {
        return { isValid: false, message: 'Hobbies are required' };
    }

    if (!Array.isArray(body.hobbies)) {
        return { isValid: false, message: 'Hobbies must be an array' };
    }

    return { isValid: true };
}
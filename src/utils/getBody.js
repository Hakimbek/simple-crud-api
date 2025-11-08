export const getBody = (req) =>
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
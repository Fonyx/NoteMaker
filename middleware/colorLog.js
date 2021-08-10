/**
 * middleware that logs out user request details in color
 */

const customLog = (req, res, next) => {
    const fgInfo = '/x1b[36m';
    const fgWarning = '/x1b[35m';
    const fgDanger = '/x1b[31m';
    switch (req.method) {
        case 'GET': {
            console.info(`${fgInfo}${req.method} request to ${req.path}`);
        }
        case 'POST': {
            console.info(`${fgWarning}${req.method} request to ${req.path}`);
        }
        case 'DELETE': {
            console.info(`${fgDanger}${req.method} request to ${req.path}`);
        }
    }

    next();
}

module.exports = customLog;
/**
 * middleware that logs out user request details in color
 */

const customLog = (req, res, next) => {
    const fgLog = '\x1b[32m'
    const fgInfo = '\x1b[36m';
    const fgWarning = '\x1b[35m';
    const fgDanger = '\x1b[31m';
    switch (req.method) {
        case 'GET': {
            console.info(`${fgInfo}`, `${req.method} request to ${req.path}`);
            break;
        }
        case 'POST': {
            console.info(`${fgWarning}`, `${req.method} request to ${req.path}`);
            break;
        }
        case 'DELETE': {
            console.info(`${fgDanger}`, `${req.method} request to ${req.path}`);
            break;
        }
        default: {
            console.log(`${fgLog}`, `${req.method} request to ${req.path}`);
        }
    }

    next();
}

module.exports = customLog;
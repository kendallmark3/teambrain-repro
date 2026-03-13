"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
/** Centralized error handler — prevents unhandled exceptions from leaking stack traces to clients. */
function errorHandler(err, req, res, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
next) {
    console.error('[ErrorHandler]', err.message);
    res.status(500).json({ error: 'Internal server error' });
}

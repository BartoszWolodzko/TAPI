"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    console.error(err);
    return res.status(500).json({
        message: 'unknown error ' + err
    });
};
exports.default = errorHandler;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fourOhFour = (_req, res) => {
    return res.status(404)
        .json({ message: 'not found' });
};

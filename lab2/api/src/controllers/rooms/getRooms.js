import {rooms} from "../../mocks/plan";

/**
 * @param {Request} _req
 * @param {Response} res
 * @returns {Response}
 * @description Get all rooms
 * @example GET /rooms
 **/

const getRooms = (_req, res) => {
    return res.status(200).json(rooms);
};

export default getRooms;
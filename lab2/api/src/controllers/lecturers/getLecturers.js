import {lectures} from "../../mocks/plan";

/**
 * @param {Request} _req
 * @param {Response} res
 * @returns {Response}
 * @description Get all lectures
 * @example GET /lectures
 **/

const getLectures = (_req, res) => {
    return res.status(200).json(lectures);
};

export default getLectures;
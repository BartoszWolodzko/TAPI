import {studentsGroups} from "../../mocks/plan";
/**
 * @param {Request} _req
 * @param {Response} res
 * @returns {Response}
 * @description Get all studentsGroups
 * @example GET /studentsGroups
 **/

const getGroups = (_req, res) => {
    return res.status(200).json(studentsGroups);
};

export default getGroups;
import {students} from "../../mocks/plan";

/**
 * @param {Request} _req
 * @param {Response} res
 * @returns {Response}
 * @description Get all students
 * @example GET /students
 **/

const getStudent = (_req, res) => {
    return res.status(200).json(students);
};

export default getStudent;
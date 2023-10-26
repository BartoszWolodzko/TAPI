import {studentsGroups} from "../../../mocks/plan";
/**
 * @param {Request} _req
 * @param {Response} res
 * @returns {Response}
 * @description Get all studentsGroups
 * @example GET /studentsGroups/:id
 **/

const getGroup = (_req, res) => {
    const id = _req.params.id;

    if (id === undefined) {
        return res.status(400).json({message: 'Bad request'});
    } else {
        const data = studentsGroups.find(item => item.id === Number(id));
        if (!data) {
            return res.status(404).json({message: 'studentsGroups not found'});
        }
        return res.status(200).json(data);
    }
};

export default getGroup;
import {rooms} from "../../../mocks/plan";
/**
 * @param {Request} _req
 * @param {Response} res
 * @returns {Response}
 * @description Get all studentsGroups
 * @example GET /rooms/:id
 **/

const getRoom = (_req, res) => {
    const id = _req.params.id;

    if (id === undefined) {
        return res.status(400).json({message: 'Bad request'});
    } else {
        const data = rooms.find(item => item.id === Number(id));
        if (!data) {
            return res.status(404).json({message: 'lecturer not found'});
        }
        return res.status(200).json(data);
    }
};

export default getRoom;
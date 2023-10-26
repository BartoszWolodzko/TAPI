import {students} from "../../../mocks/plan";
/**
 * @param {Request} _req
 * @param {Response} res
 * @returns {Response}
 * @description Get all students
 * @example GET /students/:id
 **/

const getStudent = (_req, res) => {
    const id = _req.params.id;

    if (id === undefined) {
        return res.status(400).json({message: 'Bad request'});
    } else {
        const student = students.find(item => item.id === Number(id));
        if (!student) {
            return res.status(404).json({message: 'Student not found'});
        }
        return res.status(200).json(student);
    }
};

export default getStudent;
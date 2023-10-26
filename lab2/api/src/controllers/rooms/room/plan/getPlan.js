import {schedule} from "../../../../mocks/plan";
/**
 * @param {Request} _req
 * @param {Response} res
 * @returns {Response}
 * @description Get plan information for studentsGroups
 * @example GET /lectures/:id/plan
 * @example GET /lectures/:id/plan?from=2021-01-01&to=2021-12-31
 * @example GET /lectures/:id/plan?from=2021-01-01
 * @example GET /lectures/:id/plan?to=2021-12-31
 **/

const getPlan = (_req, res) => {
    //optional filter from to
    let {from, to} = _req.query;
    let data = schedule;
    if (from) {
        data = data.filter(item => item.start >= new Date(from));
    }
    if (to) {
        data = data.filter(item => item.end <= new Date(to));
    }

    const id = _req.params.id;

    if (id === undefined) {
        return res.status(400).json({message: 'Bad request'});
    }

    data = data.filter(item => item.room.id === Number(id));

    return res.status(200).json(data);
};

export default getPlan;
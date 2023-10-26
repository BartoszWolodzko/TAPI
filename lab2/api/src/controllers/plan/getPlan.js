import {plan} from "../../mocks/plan";

/**
 * @param {Request} _req
 * @param {Response} res
 * @returns {Response}
 * @description Get plan information
 * @example GET /plan
 * @example GET /plan?from=2021-01-01&to=2021-12-31
 **/

const getPlan = (_req, res) => {
    //optional filter from to
    let {from, to} = _req.query;
    let schedule = plan;

    if (from) {
        schedule = schedule.filter(item => item.start >= new Date(from));
    }
    if (to) {
        schedule = schedule.filter(item => item.end <= new Date(to));
    }

    return res.status(200).json(schedule);
};

export default getPlan;
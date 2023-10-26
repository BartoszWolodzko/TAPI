import express from 'express';
import getGroups from "../../controllers/groups/getGroups";
import getGroup from "../../controllers/groups/group/getGroup";
import getPlan from "../../controllers/groups/group/plan/getPlan";

const router = express.Router()

router.get('/', getGroups)
router.get('/:id?', getGroup)
router.get('/:id/plan', getPlan)
export default router
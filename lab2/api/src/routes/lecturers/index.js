import express from 'express';
import getLecturers from "../../controllers/lecturers/getLecturers";
import getLecturer from "../../controllers/lecturers/lecture/getLecturer";
import getPlan from "../../controllers/lecturers/lecture/plan/getPlan";

const router = express.Router()

router.get('/', getLecturers)
router.get('/:id', getLecturer)
router.get('/:id/plan', getPlan)
export default router
import express from 'express';
import getStudents from "../../controllers/students/getStudents";
import getStudent from "../../controllers/students/student/getStudent";
import getPlan from "../../controllers/students/student/plan/getPlan";

const router = express.Router()

router.get('/', getStudents)
router.get('/:id', getStudent)
router.get('/:id/plan', getPlan)
export default router
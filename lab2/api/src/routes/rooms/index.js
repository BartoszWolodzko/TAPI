import express from 'express';
import getRooms from "../../controllers/rooms/getRooms";
import getRoom from "../../controllers/rooms/room/getRoom";
import getPlan from "../../controllers/rooms/room/plan/getPlan";

const router = express.Router()

router.get('/', getRooms)
router.get('/:id', getRoom)
router.get('/:id/plan', getPlan)
export default router
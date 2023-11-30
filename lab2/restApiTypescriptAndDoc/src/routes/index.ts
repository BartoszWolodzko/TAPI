import {Router} from 'express';

import { studentsRouter } from './students/students-router';
import { lecturersRouter } from './lecturers/lecturers-route';
import { roomsRouter } from './rooms/rooms-router';
import { groupsRouter } from './groups/groups-router';
import { planRouter } from './plan-route';
import {rootRouter} from "./root-route";

export const routes = Router();

routes.use('/api', rootRouter);
routes.use('/api/students', studentsRouter);
routes.use('/api/lecturers', lecturersRouter);
routes.use('/api/rooms', roomsRouter);
routes.use('/api/groups', groupsRouter);
routes.use('/api/plan', planRouter);

routes.get('/', (req, res) => {
    res.send('Hello World!');
} );
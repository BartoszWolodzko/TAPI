import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import config from './config';
// Apply routes before error handling
import root from './routes/root';
import plan from './routes/plan';
import students from './routes/students';
import groups from './routes/groups';
import rooms from './routes/rooms';
import lecturers from './routes/lecturers';
// Apply error handling last
import fourOhFour from './middleware/fourOhFour';
import errorHandler from './middleware/errorHandler';

const app = express()

// Apply most middleware first
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.use(cors({
    origin: config.clientOrigins[config.nodeEnv]
}))

app.use(helmet())
app.use(morgan('tiny'))

app.use('/', root)

app.use('/plan', plan)

app.use('/students', students)

app.use('/groups', groups)

app.use('/rooms', rooms)

app.use('/lecturers', lecturers)

app.use(fourOhFour)

app.use(errorHandler)


export default app
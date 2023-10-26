import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import config from './config';

const app = express()

// Apply most middleware first
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(cookieParser())

    app.use(cors({
        origin: config.clientOrigins[config.nodeEnv]
    }))

    app.use(helmet())
    app.use(morgan('tiny'))

// Apply routes before error handling
    import root from './routes/root';
    app.use('/', root)

    import plan from './routes/plan';
    app.use('/plan', plan)

    import students from './routes/students';
    app.use('/students', students)

    import groups from './routes/groups';
    app.use('/groups', groups)

    import rooms from './routes/rooms';
    app.use('/rooms', rooms)

    import lecturers from './routes/lecturers';
    app.use('/lecturers', lecturers)

// Apply error handling last
    import fourOhFour from './middleware/fourOhFour';
    app.use(fourOhFour)

    import errorHandler from './middleware/errorHandler';
    app.use(errorHandler)



export default app
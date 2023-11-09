import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

const app = express()

// Apply most middleware first
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.use(cors({
    origin: '*'
}))

app.use(helmet())
app.use(morgan('tiny'))

app.get('/', (req, res) => {
    res.send('Hello World!')
});

const coursesProto = grpc
    .loadPackageDefinition(protoLoader
        .loadSync('../grpc/proto/courses.proto'));
const coursesGrpc = new coursesProto.CourseService("127.0.0.1:9090", grpc.ChannelCredentials.createInsecure());
app.get('/courses', (req, res) => {
    coursesGrpc.GetAllCourses({}, (err, response) => {
        if (err) {
            console.error(err);
            return;
        }
        res.send(response);
    });
});

app.get('/course/:id', (req, res) => {
    let id = req.params.id
    coursesGrpc.GetCourse({id: id}, (err, response) => {
        if (err) {
            console.error(err);
            return;
        }
        res.send(response);
    });
})

const groupsProto = grpc
    .loadPackageDefinition(protoLoader
        .loadSync('../grpc/proto/groups.proto'));
const groupsGrpc = new groupsProto.GroupService("127.0.0.1:9090", grpc.ChannelCredentials.createInsecure());
app.get('/groups', (req, res) => {
    groupsGrpc.GetAllGroups({}, (err, response) => {
        if (err) {
            console.error(err);
            return;
        }
        res.send(response);
    });
});

app.get('/group/:id', (req, res) => {
    let id = req.params.id
    groupsGrpc.GetGroup({id: id}, (err, response) => {
        if (err) {
            console.error(err);
            return;
        }
        res.send(response);
    });
})

app.listen(3000, () => {
    console.log(`🚀 Listening on 3000 with 🚀`)
})
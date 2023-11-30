import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import fs from "fs";

let courses = fs.readFileSync("../data/data/courses.json", "utf-8");
courses = JSON.parse(courses);

let students = fs.readFileSync("../data/data/students.json", "utf-8");
students = JSON.parse(students);

let lecturers = fs.readFileSync("../data/data/lecturers.json", "utf-8");
lecturers = JSON.parse(lecturers);

let groups = fs.readFileSync("../data/data/groups.json", "utf-8");
groups = JSON.parse(groups);

let rooms = fs.readFileSync("../data/data/rooms.json", "utf-8");
rooms = JSON.parse(rooms);

const server = new grpc.Server();
const coursesProto = grpc
    .loadPackageDefinition(protoLoader
        .loadSync('./proto/courses.proto'));

server.addService(coursesProto.CourseService.service, {
    GetCourse: (request, response) => {
        const course = courses.find((course) => course.id === request.request.id);
        response(null, course);
    },
    GetAllCourses: (request, response) => {
        response(null, {courses: courses});
    }
})
const groupsProto = grpc
    .loadPackageDefinition(protoLoader
        .loadSync('./proto/groups.proto'));

server.addService(groupsProto.GroupService.service, {
    GetGroup: (request, response) => {
        const group = groups.find((group) => group.id === request.request.id);
        response(null, group);
    },
    GetAllGroups: (request, response) => {
        response(null, {groups: groups});
    }
})

const lecturersProto = grpc
    .loadPackageDefinition(protoLoader
        .loadSync('./proto/lecturers.proto'));

server.addService(lecturersProto.LecturerService.service, {
    GetGroup: (request, response) => {
        const group = groups.find((group) => group.id === request.request.id);
        response(null, group);
    },
    GetAllGroups: (request, response) => {
        response(null, {groups: groups});
    }
})

server.bindAsync('127.0.0.1:9090', grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(`Listening on port ${port}`);
    server.start();
});



// const helloProto = grpc
//     .loadPackageDefinition(protoLoader
//         .loadSync('./proto/hello.proto'));
// server.addService(helloProto.HelloService.service, {
//    HelloMessage: (request, response) => {
//        console.log(request.request);
//        response(null, {message: `Hello ${request.request.message}`});
//    },
//    Time: (call) => {
//          const date = new Date();
//          call.write({time: date.toISOString()});
//          setTimeout(() => {
//               call.write({time: date.toISOString()});
//               call.end();
//          }, 5000);
//    },
//     Ping: (call) => {
//         call.on('data', (data) => {
//             console.log(data);
//             call.write({message: 'Pong'});
//         });
//         call.on('end', () => {
//             call.end();
//         });
//     }
// });
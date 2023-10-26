import express from 'express';
import cors from 'cors';
import {ApolloServer} from "@apollo/server";
import {expressMiddleware} from "@apollo/server/express4";


import * as fs from "fs";

let port = 8989
const app = express();
app.use(cors({
    origin: "*"
}))


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

const typeDefs = `#graphql
type Query {
    courses: [Course]
    students: [Student]
    lecturers: [Lecturer]
    groups: [Group]
    rooms: [Room]
}

type Course {
    id: Int!
    name: String!
    lecturer: Lecturer
    groups: [Group]
}

type Student {
    id: ID!
    name: String!
    group: Group
}

type Lecturer {
    id: ID!
    name: String!
    courses: [Course]
}

type Group {
    id: ID!
    students: [Student]
    courses: [Course]
    room: Room
}

type Room {
    id: ID!
    groups: [Group]
}
`;


const resolvers = {
    Query: {
        courses: () => courses,
        students: () => students,
        lecturers: () => lecturers,
        groups: () => groups,
        rooms: () => rooms,
    },
    Course: {
        lecturer: (parent) => lecturers.find(l => l.id === parent.lecturer),
        groups: (parent) => groups.filter(group => {
                return group.courses.includes(parent.id)
            }
        )
    },
    Student: {
        group: (parent) => {
            return groups.find(g => {
                return parent.assignedGroups.includes(g.id)
            })
        }
    },
    Lecturer: {
        courses: (parent) => courses.filter(c => {
            return parent.id === c.lecturer
        })
    },
    Group: {
        students: (parent) => students.filter(s => parent.students.includes(s.id)),
        courses: (parent) => courses.filter(c => parent.courses.includes(c.id)),
        room: (parent) => rooms.find(room => {
            return room.courses.some(course => {
                return parent.courses.includes(course)
            })
        })
    },
    Room: {
        groups: (parent) => groups.filter(g => {
            return g.courses.some(course => {
                return parent.courses.includes(course)
            })
        })
    }
};

const server = new ApolloServer({typeDefs, resolvers});
await server.start();

app.use('/graphql', cors(), express.json(), expressMiddleware(server))
app.listen(port, () => {
    console.log("Started on " + port)
})
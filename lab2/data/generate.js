import {generateCourse, generateLecturer, generateStudent} from "./generator.js";
import fs from "fs";

const students = [];
const lecturers = [];
const courses = [];
const rooms = [];
const groups = [];

for (let i = 0; i < 1000; i++) {
    const student = generateStudent(i);
    students.push(student);
    for (const group of student.assignedGroups) {
        if (!groups.find(g => g.id === group)) {
            groups.push({
                id: group,
                students: [],
                courses: []
            });
        }
        groups.find(g => g.id === group).students.push(student.id);
    }
}

for (let i = 0; i < 100; i++) {
    const course = generateCourse(i);
    courses.push(course);
    if (!lecturers.find(l => l.id === course.lecturer)) {
        lecturers.push(generateLecturer(course.lecturer));
    }
    lecturers.find(l => l.id === course.lecturer).assignedCourses.push(course.id);
    if (!rooms.find(r => r.id === course.room)) {
        rooms.push({
            id: course.room,
            courses: [],
        });
    }
    rooms.find(r => r.id === course.room).courses.push(course.id);
    if (!groups.find(g => g.id === course.group)) {
        groups.push({
            id: course.group,
            students: [],
            courses: []
        });
    }
    groups.find(g => g.id === course.group).courses.push(course.id);
}

const writeToFile = (data, dataName) => {
    fs.writeFile(`./data/${dataName}.json`, JSON.stringify(data), {flag: "w+"}, err => {
        if (err) {
            console.error(err);
        }
    });
}

writeToFile(students, 'students');
writeToFile(lecturers, 'lecturers');
writeToFile(courses, 'courses');
writeToFile(rooms, 'rooms');
writeToFile(groups, 'groups');

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schedule = exports.rooms = exports.lectures = exports.studentsGroups = exports.students = void 0;
const faker_1 = require("@faker-js/faker");
exports.students = [];
exports.studentsGroups = [];
exports.lectures = [];
exports.rooms = [];
exports.schedule = [];
faker_1.faker.seed(123);
for (let i = 0; i < 100; i++) {
    exports.students.push({
        id: i,
        name: faker_1.faker.person.fullName(),
        email: faker_1.faker.internet.email(),
        phone: faker_1.faker.phone.number(),
        address: faker_1.faker.location.streetAddress(),
        birthday: faker_1.faker.date.past(),
    });
}
for (let i = 0; i < 10; i++) {
    exports.studentsGroups.push({
        id: i,
        name: faker_1.faker.string.alphanumeric({ casing: 'upper', length: 4 }),
        students: exports.students.slice(i * 10, (i + 1) * 10),
    });
}
for (let i = 0; i < 10; i++) {
    exports.lectures.push({
        id: i,
        name: faker_1.faker.person.fullName(),
        email: faker_1.faker.internet.email(),
        phone: faker_1.faker.phone.number(),
        address: faker_1.faker.location.streetAddress(),
        birthday: faker_1.faker.date.past(),
    });
}
for (let i = 0; i < 10; i++) {
    exports.rooms.push({
        id: faker_1.faker.string.uuid(),
        name: faker_1.faker.string.alphanumeric({ casing: 'upper', length: 4 }),
        capacity: faker_1.faker.number.int({ min: 15, max: 100 })
    });
}
for (let i = 0; i < 10; i++) {
    let date = new Date(faker_1.faker.date.future());
    exports.schedule.push({
        id: faker_1.faker.string.uuid(),
        start: date,
        end: new Date(date.getTime() + 60 * 60 * 24),
        lecturer: exports.lectures[i],
        room: exports.rooms[i],
        group: exports.studentsGroups[i],
    });
}

import {faker} from '@faker-js/faker';

export const students = [];
export const studentsGroups = [];
export const lectures = [];
export const rooms = [];
export const schedule = [];

faker.seed(123)

for (let i = 0; i < 100; i++) {
    students.push({
        id: i,
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        address: faker.location.streetAddress(),
        birthday: faker.date.past(),
        group: studentsGroups[i % 10],
    });
}

for (let i = 0; i < 10; i++) {
    studentsGroups.push({
        id: i,
        name: faker.string.alphanumeric({casing: 'upper', length: 4}),
        students: Array(10).fill(i * 10).map((_, j) => i * 10 + j),
        schedule: Array(10).fill(i * 10).map((_, j) => i * 10 + j),
    });
}

for (let i = 0; i < 10; i++) {
    lectures.push({
        id: i,
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        address: faker.location.streetAddress(),
        birthday: faker.date.past(),
        courses: Array(10).fill(i * 10).map((_, j) => i * 10 + j),
    });
}

for (let i = 0; i < 10; i++) {
    rooms.push({
        id: i,
        name: faker.string.alphanumeric({casing: 'upper', length: 4}),
        capacity: faker.number.int({min: 15, max: 100}),
        courses: Array(10).fill(i * 10).map((_, j) => i * 10 + j),
    });
}

for (let i = 0; i < 10; i++) {
    let date = new Date(faker.date.future())
    schedule.push({
        id: i,
        start: date,
        end: new Date(date.getTime() + 60 * 60 * 24),
        lecturer: Array(10).fill(i * 10).map((_, j) => i * 10 + j),
        room: Array(10).fill(i * 10).map((_, j) => i * 10 + j),
        group: Array(10).fill(i * 10).map((_, j) => i * 10 + j),
        name: faker.lorem.sentence(),
    });
}

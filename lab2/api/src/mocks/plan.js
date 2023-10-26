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
    });
}

for (let i = 0; i < 10; i++) {
    studentsGroups.push({
        id: i,
        name: faker.string.alphanumeric({casing: 'upper', length: 4}),
        students: students.slice(i * 10, (i + 1) * 10),
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
    });
}

for (let i = 0; i < 10; i++) {
    rooms.push({
        id: faker.string.uuid(),
        name: faker.string.alphanumeric({casing: 'upper', length: 4}),
        capacity: faker.number.int({ min: 15, max: 100 })
    });
}

for (let i = 0; i < 10; i++) {
    let date = new Date(faker.date.future())
    schedule.push({
        id: faker.string.uuid(),
        start: date,
        end: new Date(date.getTime() + 60 * 60 * 24),
        lecturer: lectures[i],
        room: rooms[i],

        group: studentsGroups[i],
    });
}

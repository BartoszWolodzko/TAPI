import {faker} from '@faker-js/faker';
interface Student {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    birthday: Date;
}
interface StudentGroup {
    id: number;
    name: string;
    students: Student[];
}
interface Lecture {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    birthday: Date;
}
interface Room {
    id: string;
    name: string;
    capacity: number;
}
interface Schedule {
    id: string;
    start: Date;
    end: Date;
    lecturer: Lecture;
    room: Room;

    group: StudentGroup;
}
export const students:Student[] = [];
export const studentsGroups: StudentGroup[] = [];
export const lectures:Lecture[] = [];
export const rooms:Room[] = [];
export const schedule:Schedule[] = [];

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
        capacity: faker.number.int({min: 15, max: 100})
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

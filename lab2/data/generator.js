import {Faker, pl} from '@faker-js/faker';
import {addMinutes, getMinutes, setMinutes, startOfMinute} from "date-fns";

const STUDENT_ID = 0;

const locFaker = new Faker({
    locale: [pl]
});

const roundToNearestMinutes = (date, interval) => {
    const roundedMinutes = Math.floor(getMinutes(date) / interval) * interval;
    return setMinutes(startOfMinute(date), roundedMinutes);
}

export const generateStudent = (id) => {
    locFaker.seed(Number(id) + STUDENT_ID);
    const assignedGroups = new Set(locFaker.helpers.multiple(() => locFaker.number.int({
        max: 5,
        min: 1
    }), {count: {min: 2, max: 5}}));
    return {
        id: id,
        name: locFaker.person.firstName(),
        surname: locFaker.person.lastName(),
        email: locFaker.internet.email(),
        assignedGroups: [...assignedGroups],
    };
}

export const generateLecturer = (id) => {
    locFaker.seed(Number(id) + STUDENT_ID);
    return {
        id: id,
        name: locFaker.person.firstName(),
        surname: locFaker.person.lastName(),
        email: locFaker.internet.email(),
        assignedCourses: locFaker.helpers.multiple(() => locFaker.number.int({max: 100, min: 1}), {
            count: {
                min: 2,
                max: 5
            }
        })
    };
}

export const generateCourse = (id) => {
    locFaker.seed(Number(id) + STUDENT_ID);
    const startDate = roundToNearestMinutes(locFaker.date.future(), 15);
    return {
        id: id,
        name: locFaker.string.alpha({length: 3, casing: "upper"}),
        description: locFaker.lorem.paragraph(),
        lecturer: locFaker.number.int({max: 20, min: 1}),
        group: locFaker.number.int({max: 5, min: 1}),
        room: locFaker.string.numeric({length: 3}),
        date: {
            start: startDate,
            end: addMinutes(startDate, 90)
        }
    };
}
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { ITeacher } from './teachers';
import { IDepartment } from './department';

export class AppData implements InMemoryDbService {

    createDb() {
        const teachers: ITeacher[] = [
            {
                id: 1,
                teacherFirstName: 'John',
                teacherLastName: 'Goodman',
                teacherDateOfEmployment: '2016-05-19',
                teacherDepartment: { id: 234, name: 'English'},
                teacherRating: 3.2
            },
            {
                id: 2,
                teacherFirstName: 'Francis',
                teacherLastName: 'Frederickson',
                teacherDateOfEmployment: '2014-02-11',
                teacherDepartment: { id: 45, name: 'Philosophy'},
                teacherRating: 4.2
            },
            {
                id: 3,
                teacherFirstName: 'Wilson',
                teacherLastName: 'Bladder',
                teacherDateOfEmployment: '2011-11-23',
                teacherDepartment: { id: 122, name: 'Mathematics'},
                teacherRating: 4.4
            }
        ];
        const departments: IDepartment[] = [
            { id: 234, name: 'English'},
            { id: 45, name: 'Philosophy'},
            { id: 122, name: 'Mathematics'},
            { id: 97, name: 'Biology'},
            { id: 23, name: 'Physics'},
            { id: 1, name: 'Chemistry'}
        ];

        return {
            teachers,
            departments
        };
    }
}

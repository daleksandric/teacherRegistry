import { IDepartment } from './department';

export interface ITeacher {
    id: number;
    teacherFirstName: string;
    teacherLastName: string;
    teacherDateOfEmployment: string;
    teacherDepartment: IDepartment;
    teacherRating: number;
}

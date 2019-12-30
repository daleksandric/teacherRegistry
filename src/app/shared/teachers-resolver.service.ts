import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { map } from 'rxjs/operators';
import { TeacherService } from '../teachers/teachers.service';

@Injectable ()
export class TeachersResolver implements Resolve<any> {
    constructor(private teacherService: TeacherService) {

    }
    resolve() {
        return this.teacherService.getTeachers().pipe(map(teachers => teachers));
    }
}

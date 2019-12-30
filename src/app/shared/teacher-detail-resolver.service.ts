import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';
import { TeacherService } from '../teachers/teachers.service';

@Injectable()
export class TeacherDetailResolver implements Resolve<any> {
    constructor(private teacherService: TeacherService) {}

    resolve( route2: ActivatedRouteSnapshot ) {
        const param = route2.paramMap.get('id');
        if (param) {
            const id = +param;
            return this.teacherService.getTeacher(id).pipe(map(teacher => teacher));
        }
        return null;
    }
}

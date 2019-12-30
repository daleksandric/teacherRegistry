import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';
import { TeacherService } from '../teachers/teachers.service';
import { forkJoin, Observable } from 'rxjs';

@Injectable()
export class TeacherEditResolver implements Resolve<any> {
    constructor(private teacherService: TeacherService) {}

    resolve( route: ActivatedRouteSnapshot ) {
        const param = route.paramMap.get('id');
        if (param) {
            const id = +param;
            return forkJoin([
                this.teacherService.getTeacher(id),
                this.teacherService.getDepartments()
            ]).pipe(
                map(result => {
                    return {
                        teacher: result[0],
                        departments: result[1],
                    };
                })
            );
        }
        return null;
    }
}

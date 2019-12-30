import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { ITeacher } from './teachers';
import { IDepartment } from './department';

@Injectable({
    providedIn: 'root'
})

export class TeacherService {
    private teachersUrl = 'api/teachers';
    private departmentsUrl = 'api/departments';

    constructor( private http: HttpClient) {}

    getDepartments(): Observable<IDepartment[]> {
      return this.http.get<IDepartment[]>(this.departmentsUrl);
    }

    getTeachers(): Observable<ITeacher[]> {
        return this.http.get<ITeacher[]>(this.teachersUrl);
    }

    getTeacher(id: number): Observable<ITeacher> {
        if (id === 0) {
          return of(this.initializeTeacher());
        }
        const url = `${this.teachersUrl}/${id}`;
        return this.http.get<ITeacher>(url)
        .pipe(
          tap(data => {
                console.log('getTeacher: ' + JSON.stringify(data));
          }),
          catchError(this.handleError)
        );
    }

    createTeacher(teacher: ITeacher): Observable<ITeacher> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      teacher.id = null;
      return this.http.post<ITeacher>(this.teachersUrl, teacher, { headers })
        .pipe(
          tap(data => console.log('createTeacher: ' + JSON.stringify(data))),
          catchError(this.handleError)
        );
    }

    deleteTeacher(id: number): Observable<{}> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const url = `${this.teachersUrl}/${id}`;
      return this.http.delete<ITeacher>(url, { headers })
        .pipe(
          tap(data => console.log('deleteTeacher: ' + id)),
          catchError(this.handleError)
        );
    }

    updateTeacher(teacher: ITeacher): Observable<ITeacher> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const url = `${this.teachersUrl}/${teacher.id}`;
      return this.http.put<ITeacher>(url, teacher, { headers })
        .pipe(
          tap(() => console.log('updateTeacher: ' + teacher.id)),
          // Return the product on an update
          map(() => teacher),
          catchError(this.handleError)
        );
    }

    private initializeTeacher(): ITeacher {
        return {
        id: 0,
        teacherFirstName: null,
        teacherLastName: null,
        teacherDateOfEmployment: null,
        teacherDepartment: null,
        teacherRating: null
        };
      }

      private handleError(err) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage: string;
        if (err.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          errorMessage = `An error occurred: ${err.error.message}`;
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
        }
        console.error(err);
        return throwError(errorMessage);
      }
}

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SharedModule } from '../shared/shared.module';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AppData } from './app-data';

import { TeachersComponent } from './teachers.component';
import { TeachersDetailComponent } from './teachers-detail.component';
import { TeacherEditComponent } from './teacher-edit.component';

import { TeachersResolver } from '../shared/teachers-resolver.service';
import { TeacherService } from './teachers.service';
import { TeacherDetailResolver } from '../shared/teacher-detail-resolver.service';
import { TeacherEditResolver } from '../shared/teacher-edit-resolver.service';


@NgModule({
    imports: [
        NgbModule,
        FontAwesomeModule,
        SharedModule,
        ReactiveFormsModule,
        InMemoryWebApiModule.forRoot(AppData),
        RouterModule.forChild([
            { path: 'teachers', component: TeachersComponent, resolve: {teachers: TeachersResolver}},
            { path: 'teachers/:id', component: TeachersDetailComponent, resolve: {teacher: TeacherDetailResolver}},
            { path: 'teachers/:id/edit', component: TeacherEditComponent, resolve: {pageData: TeacherEditResolver}},
        ])
    ],
    declarations: [
        TeachersComponent,
        TeachersDetailComponent,
        TeacherEditComponent,
        TeacherEditComponent,
    ],
    providers: [
        TeacherService,
        TeacherEditResolver,
        TeacherDetailResolver,
        TeachersResolver
    ]
})

export class TeacherModule { }

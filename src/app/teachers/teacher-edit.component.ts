import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable} from 'rxjs';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

import { ITeacher } from './teachers';
import { TeacherService } from './teachers.service';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { NumberValidators } from '../shared/number.validator';
import { IDepartment } from './department';

@Component({
  selector: 'app-ngbd-datepicker-popup',
  templateUrl: './teacher-edit.component.html'
})
export class TeacherEditComponent implements OnInit, OnDestroy {
  faCalendarAlt = faCalendarAlt;

  pageTitle = 'Teacher Edit';

  private sub: Subscription;
  errorMessage: string;
  teacherForm: FormGroup;
  maxDate: NgbDate;

  teacher: ITeacher;
  departments: IDepartment[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private teacherService: TeacherService,
              private calendar: NgbCalendar) {}

  ngOnInit(): void {
    this.maxDate = this.calendar.getToday();
    this.teacherForm = this.fb.group({
      teacherFirstName: ['', { validators: [Validators.required,
                              Validators.minLength(3),
                              Validators.maxLength(50)],
                              updateOn: 'blur'}],
      teacherLastName: ['', { validators: [Validators.required,
                              Validators.minLength(3),
                              Validators.maxLength(50)],
                              updateOn: 'blur'}],
      teacherDateOfEmployment: [''],
      teacherDepartment: ['', { validators: [Validators.required]}],
      teacherRating: ['', NumberValidators.range(1, 5)]
    });

    this.sub = this.route.paramMap.subscribe(
      params => {

        this.getDepartments();

        const id = +params.get('id');
        this.getTeacher(id);
      });
  }

  getTeacher(id: number): void {
    const pageData = this.route.snapshot.data.pageData;
    this.displayTeacher(pageData.teacher);
  }

  getDepartments(): void {
    const pageData = this.route.snapshot.data.pageData;
    this.departments = pageData.departments;
  }

  displayTeacher(teacher: ITeacher): void {
    if (this.teacherForm) {
      this.teacherForm.reset();
    }
    this.teacher = teacher;

    if (this.teacher.id === 0) {
      this.pageTitle = 'Add Teacher';
    } else {
      this.pageTitle = `Edit Teacher: ${this.teacher.teacherLastName}, ${this.teacher.teacherFirstName} `;
    }

    // Update the data on the form
    this.teacherForm.patchValue({
      teacherFirstName: this.teacher.teacherFirstName,
      teacherLastName: this.teacher.teacherLastName,
      teacherDateOfEmployment: this.convertDate(this.teacher.teacherDateOfEmployment),
      teacherDepartment: this.teacher.teacherDepartment.id,
      teacherRating: this.teacher.teacherRating
    });
  }

  saveTeacher(): void {
    if (this.teacherForm.valid) {
      if (this.teacherForm.dirty) {
        const p = { ...this.teacher, ...this.teacherForm.value };

        p.teacherDateOfEmployment = `${p.teacherDateOfEmployment.year}-${p.teacherDateOfEmployment.month}-${p.teacherDateOfEmployment.day}`;

        for (const department of this.departments) {
          if (parseInt(p.teacherDepartment, 10) === department.id) {
            p.teacherDepartment = department;
            break;
          }
        }

        if (p.id === 0) {
          this.teacherService.createTeacher(p)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        } else {
          this.teacherService.updateTeacher(p)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        }
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  convertDate(stringDate: string): NgbDate {
    const dateParts = stringDate.split('-');
    const result = new NgbDate(Number(dateParts[0]), Number(dateParts[1]), Number(dateParts[2]));
    return result;
  }

  onSaveComplete(): void {
    this.router.navigate(['/teachers']);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

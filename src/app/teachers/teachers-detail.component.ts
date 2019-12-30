import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherService } from './teachers.service';

import { ITeacher } from './teachers';

@Component({
  templateUrl: './teachers-detail.component.html',
  styleUrls: ['./teachers-detail.component.css']
})
export class TeachersDetailComponent implements OnInit {
  pageTitle = 'Teacher Details';
  errorMessage = '';
  teacher: ITeacher | undefined;

  constructor(  private route: ActivatedRoute,
                private router: Router,
                private teacherService: TeacherService) {
  }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getTeacher(id);
    }
  }

  getTeacher(id: number) {
    this.teacher = this.route.snapshot.data.teacher;
  }

  deleteTeacher(): void {
    if (this.teacher.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the teacher: ${this.teacher.teacherFirstName}, ${this.teacher.teacherLastName}?`)) {
        this.teacherService.deleteTeacher(this.teacher.id)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
      }
    }
  }

  onSaveComplete(): void {
    this.router.navigate(['/teachers']);
  }

  onBack(): void {
    this.router.navigate(['/teachers']);
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ITeacher } from './teachers';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {
  pageTitle = 'Teacher List';

  teachers: ITeacher[] = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.teachers = this.route.snapshot.data.teachers;
  }

}

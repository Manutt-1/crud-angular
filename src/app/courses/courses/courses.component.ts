import { CommonModule, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, of } from 'rxjs';

import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { SharedModule } from "../../shared/shared.module";
import { Course } from '../model/course';
import { CoursesService } from './../services/courses.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [AppMaterialModule, NgIf, CommonModule, SharedModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit {

  dialog = inject(MatDialog);

  courses$: Observable<Course[]>;
  //courses: Course[] = []
  displayedColumns = ['name', 'category'];

  //coursesService: CoursesService;

  constructor(private coursesService: CoursesService) {
    //this.courses
    //this.coursesService = new CoursesService();
    //this.coursesService.list().subscribe(courses => this.courses = courses);
    this.courses$ = this.coursesService.list()
    .pipe(
      catchError(error => {
        this.onError('Error ao carregar cursos :(')
        return of([]);
      })
    );

  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  ngOnInit(): void {
    this.coursesService.list();
  }

}

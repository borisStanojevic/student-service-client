import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CoursesComponent } from "./courses/courses.component";
import { StudentsComponent } from "./students/students.component";
import { HomeComponent } from "./home/home.component";
import { CourseComponent } from "./course/course.component";
import { StudentComponent } from "./student/student.component";
import { ErrorComponent } from "./error/error.component";

//Od specificnih ka opstim
const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "courses/:id",
    component: CourseComponent
  },
  {
    path: "courses",
    component: CoursesComponent
  },
  {
    path: "students/:id",
    component: StudentComponent
  },
  {
    path: "students",
    component: StudentsComponent
  },
  {
    path: "**",
    component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]
})
export class AppRoutingModule {}

import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CoursesComponent } from "./courses/courses.component";
import { StudentsComponent } from "./students/students.component";
import { HomeComponent } from "./home/home.component";
import { CourseComponent } from "./course/course.component";
import { StudentComponent } from "./student/student.component";
import { ErrorComponent } from "./error/error.component";
import { ProfessorComponent } from "./professor/professor.component";
import { ProfessorsComponent } from "./professors/professors.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { StudentCoursesComponent } from "./student-courses/student-courses.component";
import { LecturerCoursesComponent } from "./lecturer-courses/lecturer-courses.component";
import { StudentTransactionsComponent } from "./student-transactions/student-transactions.component";
import { ProfileComponent } from "./profile/profile.component";
import { StudentDocumentsComponent } from "./student-documents/student-documents.component";

const routes: Routes = [
  {
    path: "auth/login",
    component: LoginComponent
  },
  {
    path: "auth/logout",
    component: LoginComponent
  },
  {
    path: "profiles/me",
    component: ProfileComponent
  },
  {
    path: "auth/register",
    component: RegisterComponent
  },
  {
    path: "students/me/courses",
    component: StudentCoursesComponent
  },
  {
    path: "students/me/transactions",
    component: StudentTransactionsComponent
  },
  {
    path: "students/me/documents",
    component: StudentDocumentsComponent
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
    path: "lecturers/me/courses",
    component: LecturerCoursesComponent
  },

  {
    path: "lecturers/:id",
    component: ProfessorComponent
  },
  {
    path: "lecturers",
    component: ProfessorsComponent
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
    path: "",
    component: HomeComponent
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

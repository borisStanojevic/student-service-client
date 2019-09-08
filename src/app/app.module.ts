import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { AppComponent } from "./app.component";
import { StudentComponent } from "./student/student.component";
import { StudentsComponent } from "./students/students.component";
import { CourseComponent } from "./course/course.component";
import { CoursesComponent } from "./courses/courses.component";
import { HomeComponent } from "./home/home.component";
import { ErrorComponent } from "./error/error.component";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";
import { StudentService } from "./services/student.service";
import { ProfessorComponent } from "./professor/professor.component";
import { ProfessorsComponent } from "./professors/professors.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { PaymentComponent } from "./payment/payment.component";
import { CourseAttendanceComponent } from "./course-attendance/course-attendance.component";
import { CourseLecturingComponent } from "./course-lecturing/course-lecturing.component";
import { ExamComponent } from "./exam/exam.component";
import { CourseService } from "./services/course.service";

@NgModule({
  //Ovdje registrujemo sve komponente da bi bile vidljive angularu
  declarations: [
    AppComponent,
    StudentComponent,
    StudentsComponent,
    CourseComponent,
    CoursesComponent,
    HomeComponent,
    ErrorComponent,
    ProfessorComponent,
    ProfessorsComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    PaymentComponent,
    CourseAttendanceComponent,
    CourseLecturingComponent,
    ExamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [StudentService, CourseService],
  bootstrap: [AppComponent]
})
export class AppModule {}

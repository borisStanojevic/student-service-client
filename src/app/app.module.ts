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
import { CourseService } from "./services/course.service";
import { ProfessorService } from "./services/professor.service";
import { CourseLecturingService } from "./services/course-lecturing.service";
import { AuthService } from "./services/auth.service";
import { StudentCoursesComponent } from './student-courses/student-courses.component';
import { LecturerCoursesComponent } from './lecturer-courses/lecturer-courses.component';
import { StudentTransactionsComponent } from './student-transactions/student-transactions.component';
import { ProfileComponent } from './profile/profile.component';
import { StudentDocumentsComponent } from './student-documents/student-documents.component';  

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
    StudentCoursesComponent,
    LecturerCoursesComponent,
    StudentTransactionsComponent,
    ProfileComponent,
    StudentDocumentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [
    StudentService,
    ProfessorService,
    CourseService,
    CourseLecturingService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

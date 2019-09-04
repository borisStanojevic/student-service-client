import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
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
import { FooterComponent } from './footer/footer.component';

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
    FooterComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpModule],
  providers: [StudentService],
  bootstrap: [AppComponent]
})
export class AppModule {}

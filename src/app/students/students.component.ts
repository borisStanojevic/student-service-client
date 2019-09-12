import { Component, OnInit } from "@angular/core";
import { StudentService } from "../services/student.service";
import { AppError } from "./../common/app-error";
import { NotFoundError } from "../common/not-found-error";
import { BadInput } from "./../common/bad-input";

@Component({
  selector: "app-students",
  templateUrl: "./students.component.html",
  styleUrls: ["./students.component.css"]
})
export class StudentsComponent implements OnInit {
  allowAdding: boolean = true;
  private students: any[] = [];

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.studentService
      .getAll()
      .subscribe(
        students => (this.students = students),
        (error: AppError) => alert(JSON.stringify(error))
      );
  }

  onCreateStudent(nameInput: HTMLInputElement) {
    let student = { name: nameInput.value };
    this.students.splice(0, 0, student);

    nameInput.value = "";

    this.studentService.create(student).subscribe(
      newStudent => {
        this.students[0]["id"] = newStudent.id;
      },
      (error: AppError) => {
        this.students.splice(0, 1);

        if (error instanceof BadInput) {
          //this.form.setErrors(error.originalError)
          alert("Bad request");
        } else alert("An unexpected error occured");
      }
    );
  }

  onUpdateStudent(student: any) {
    this.studentService.update(student).subscribe(
      updatedStudent => {
        alert(updatedStudent);
      },
      (error: Response) => {
        alert("An unexpected error occured");
      }
    );
  }

  onDeleteStudent(student: any) {
    const index = this.students.indexOf(student);
    this.students.splice(index, 1);

    this.studentService.delete(student).subscribe(
      () => {},
      (error: AppError) => {
        this.students.splice(index, 0, student);
        if (error instanceof NotFoundError)
          alert("This student has already been deleted");
        else alert("An unexpected error occured");
      }
    );
  }
}

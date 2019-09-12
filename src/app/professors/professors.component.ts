import { Component, OnInit } from "@angular/core";
import { ProfessorService } from "./../professor.service";
import { AppError } from "../common/app-error";
import { NotFoundError } from "../common/not-found-error";

@Component({
  selector: "app-professors",
  templateUrl: "./professors.component.html",
  styleUrls: ["./professors.component.css"]
})
export class ProfessorsComponent implements OnInit {
  private lecturers: any[] = [];
  constructor(private lecturerService: ProfessorService) {}

  ngOnInit() {
    this.lecturerService
      .getAll()
      .subscribe(
        lecturers => (this.lecturers = lecturers),
        (error: AppError) => alert(JSON.stringify(error))
      );
  }

  onDeleteLecturer(lecturer: any) {
    const index = this.lecturers.indexOf(lecturer);
    this.lecturers.splice(index, 1);

    this.lecturerService.delete(lecturer).subscribe(
      () => {},
      (error: AppError) => {
        this.lecturers.splice(index, 0, lecturer);
        if (error instanceof NotFoundError)
          alert("This lecturer has already been deleted");
        else alert("An unexpected error occured");
      }
    );
  }
}

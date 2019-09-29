import { Component, OnInit } from "@angular/core";
import { StudentService } from "../services/student.service";
import { getAuthToken } from "./../common/util/auth-util";
import { AppError } from "../common/app-error";

@Component({
  selector: "app-student-documents",
  templateUrl: "./student-documents.component.html",
  styleUrls: ["./student-documents.component.css"]
})
export class StudentDocumentsComponent implements OnInit {
  private myDocuments: any[];
  private documentToUpload: File;
  constructor(private studentService: StudentService) {}

  onDocumentSelect(event) {
    this.documentToUpload = event.target.files[0];
  }

  onDeleteDocument(documentId: number) {
    this.studentService.deleteMyDocument(getAuthToken(), documentId).subscribe(
      () => {
        this.studentService
          .getMyDocuments(getAuthToken())
          .subscribe(
            documents => (this.myDocuments = documents),
            (error: AppError) => alert(JSON.stringify(error))
          );
      },
      (error: AppError) => alert(JSON.stringify(error))
    );
  }

  onSubmit() {
    this.studentService
      .uploadDocument(getAuthToken(), this.documentToUpload)
      .subscribe(
        () => {
          this.studentService
            .getMyDocuments(getAuthToken())
            .subscribe(
              documents => (this.myDocuments = documents),
              (error: AppError) => alert(JSON.stringify(error))
            );
        },
        (error: AppError) => alert(JSON.stringify(error))
      );
  }

  ngOnInit() {
    this.studentService
      .getMyDocuments(getAuthToken())
      .subscribe(
        documents => (this.myDocuments = documents),
        (error: AppError) => alert(JSON.stringify(error))
      );
  }
}

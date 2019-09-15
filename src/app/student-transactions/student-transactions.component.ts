import { Component, OnInit } from "@angular/core";
import { StudentService } from "../services/student.service";
import { getAuthenticatedUser } from "../common/util/auth-util";
import { getAuthToken } from "./../common/util/auth-util";
import { AppError } from "./../common/app-error";

@Component({
  selector: "app-student-transactions",
  templateUrl: "./student-transactions.component.html",
  styleUrls: ["./student-transactions.component.css"]
})
export class StudentTransactionsComponent implements OnInit {
  private authenticatedStudent: any;
  private myTransactions: any[] = [];

  constructor(private studentService: StudentService) {
    this.authenticatedStudent = getAuthenticatedUser();
  }

  ngOnInit() {
    if (!this.authenticatedStudent) return null;
    if (this.authenticatedStudent.role !== "STUDENT") return;

    this.studentService
      .getMyTransactions(getAuthToken())
      .subscribe(transactions => {
        this.myTransactions = transactions;
        (error: AppError) => {
          alert(error);
        };
      });
  }
}

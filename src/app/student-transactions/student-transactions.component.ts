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
  public myBalance: number;

  constructor(private studentService: StudentService) {
    this.authenticatedStudent = getAuthenticatedUser();
  }

  makeDeposit(value: number) {
    if (value < 0 || value > 10000)
      return alert("Please specify positive amount up to 10 000");

    if (confirm(`Are you sure you want to make ${value} deposit`)) {
      this.studentService.makeDeposit(getAuthToken(), value).subscribe(() => {
        this.studentService
          .getMyTransactions(getAuthToken())
          .subscribe(transactions => {
            this.myTransactions = transactions;
            (error: AppError) => {
              alert(error);
            };
          });

        this.studentService
          .getBalance(getAuthToken())
          .subscribe(({ amount }) => {
            this.myBalance = amount;
            (error: AppError) => {
              alert(error);
            };
          });
        (error: AppError) => {
          alert(error);
        };
      });
    }
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

    this.studentService.getBalance(getAuthToken()).subscribe(({ amount }) => {
      this.myBalance = amount;
      (error: AppError) => {
        alert(error);
      };
    });
  }
}

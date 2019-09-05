import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  courses = [{ id: 1, name: "CS50" }, { id: 2, name: "CS101" }];
  course: string;
  constructor() {}

  submit(loginForm) {
    console.log(loginForm);
  }
  ngOnInit() {}
}

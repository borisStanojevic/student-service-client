import { Component, OnInit } from "@angular/core";
import {
  getAuthenticatedUser,
  unauthenticateUser
} from "../common/util/auth-util";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  private authenticatedUser: any;
  private unauthenticateUser = unauthenticateUser;

  constructor() {
    this.authenticatedUser = getAuthenticatedUser();
  }

  ngOnInit() {}
}

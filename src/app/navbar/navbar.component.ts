import { Component, OnInit } from "@angular/core";
import {
  getAuthenticatedUser,
  unauthenticateUser
} from "../common/util/auth-util";
import { Router } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  private authenticatedUser: any;

  doUnauthenticateUser() {
    unauthenticateUser();
    window.location.replace("/auth/login");
  }

  constructor(private router: Router) {
    this.authenticatedUser = getAuthenticatedUser();
  }

  ngOnInit() {
    this.authenticatedUser = getAuthenticatedUser();
  }
}

import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { BadInput } from "./../common/bad-input";
import { Unauthenticated } from "../common/unauthenticated";
import { Forbidden } from "../common/forbidden";
import { NotFoundError } from "../common/not-found-error";
import { AppError } from "./../common/app-error";
import { DataService } from "./data-service";

@Injectable()
export class AuthService extends DataService {
  constructor(http: Http) {
    super("http://localhost:8080/auth/sign-in", http);
  }

  getProfileData(myJwt: string) {
    const url = "http://localhost:8080/auth/me";
    const options = {
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${myJwt}`
      })
    };

    return this.http
      .get(url, options)
      .map(response => response.json())
      .catch(this.handleError);
  }

  updateProfileData(myJwt: string, profileData) {
    const url = "http://localhost:8080/auth/me";
    const options = {
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${myJwt}`
      })
    };

    return this.http
      .put(url, profileData, options)
      .map(response => response.json())
      .catch(this.handleError);
  }
}

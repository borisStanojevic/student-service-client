import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
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
}

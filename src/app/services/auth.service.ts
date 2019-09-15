import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { BadInput } from "./../common/bad-input";
import { Unauthenticated } from "../common/unauthenticated";
import { Forbidden } from "../common/forbidden";
import { NotFoundError } from "../common/not-found-error";
import { AppError } from "./../common/app-error";

@Injectable()
export class AuthService {
  private url: string;
  private httpOptions: any;

  constructor(private http: Http) {
    this.url = "http://localhost:8080/auth";
    this.httpOptions = {
      headers: new Headers({ "Content-Type": "application/json" })
    };
  }

  login(resource: any) {
    return this.http
      .post(`${this.url}/sign-in`, JSON.stringify(resource), this.httpOptions)
      .map(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    if (error.status === 400)
      return Observable.throw(new BadInput(error.json()));
    else if (error.status === 401)
      return Observable.throw(new Unauthenticated());
    else if (error.status === 403) return Observable.throw(new Forbidden());
    else if (error.status === 404) return Observable.throw(new NotFoundError());
    else return Observable.throw(new AppError(error));
  }
}

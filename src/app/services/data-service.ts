import { Injectable } from "@angular/core";
import { Http, RequestOptions, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { AppError } from "./../common/app-error";
import { NotFoundError } from "../common/not-found-error";
import { BadInput } from "./../common/bad-input";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import "rxjs/add/observable/throw";
import { Unauthenticated } from "../common/unauthenticated";
import { Forbidden } from "../common/forbidden";

@Injectable()
export class DataService {
  private httpOptions;
  constructor(private url: string, protected http: Http) {
    this.httpOptions = {
      headers: new Headers({ "Content-Type": "application/json" })
    };
  }

  create(resource: any) {
    return this.http
      .post(this.url, JSON.stringify(resource), this.httpOptions)
      .map(response => response.json())
      .catch(this.handleError);
  }

  getAll() {
    return this.http
      .get(this.url)
      .map(response => response.json())
      .catch(this.handleError);
  }

  getById(id: number) {
    return this.http
      .get(this.url + `/${id}`, this.httpOptions)
      .map(response => response.json())
      .catch(this.handleError);
  }

  update(resource: any) {
    return this.http
      .patch(`${this.url}/${resource.id}`, JSON.stringify(resource))
      .map(response => response.json())
      .catch(this.handleError);
  }

  delete(resource: any) {
    return this.http
      .delete(`${this.url}/${resource.id}`)
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

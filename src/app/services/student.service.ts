import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { DataService } from "./data-service";

@Injectable()
export class StudentService extends DataService {
  constructor(http: Http) {
    super("http://localhost:8080/students", http);
  }

  getCoursesAttending(id: number) {
    const url = `${this.url}/${id}/courses`;
    return this.http
      .get(url)
      .map(response => response.json())
      .catch(this.handleError);
  }
}

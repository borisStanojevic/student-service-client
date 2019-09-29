import { Injectable } from "@angular/core";
import { DataService } from "./data-service";
import { Http, Headers } from "@angular/http";

@Injectable()
export class ProfessorService extends DataService {
  constructor(http: Http) {
    super("http://localhost:8080/lecturers", http);
  }

  getCoursesLecturing(id: number) {
    const url = `${this.url}/${id}/courses`;
    return this.http
      .get(url)
      .map(response => response.json())
      .catch(this.handleError);
  }

  getMyCourses(myJwt: string) {
    const url = `${this.url}/me/courses`;
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
}

import { Injectable } from "@angular/core";
import { DataService } from "./data-service";
import { Http } from "@angular/http";

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
}

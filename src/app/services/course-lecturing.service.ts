import { Injectable } from "@angular/core";
import { DataService } from "./data-service";
import { Http } from "@angular/http";

@Injectable()
export class CourseLecturingService extends DataService {
  constructor(http: Http) {
    super("http://localhost:8080/course-lecturings", http);
  }
}

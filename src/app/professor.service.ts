import { Injectable } from "@angular/core";
import { DataService } from "./services/data-service";
import { Http } from "@angular/http";

@Injectable()
export class ProfessorService extends DataService {
  constructor(http: Http) {
    super("http://localhost:8080/lecturers", http);
  }
}

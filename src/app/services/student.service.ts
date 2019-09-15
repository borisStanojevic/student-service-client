import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
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

  getMyTransactions(myJwt) {
    const url = `${this.url}/me/transactions`;
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

  applyForExam(myJwt: string, courseId: number) {
    const url = `${this.url}/me/courses/${courseId}/exams`;
    const options = {
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${myJwt}`
      })
    };

    return this.http
      .post(url, {}, options)
      .map(response => response.json())
      .catch(this.handleError);
  }

  unapplyForExam(myJwt: string, courseId: number) {
    const url = `${this.url}/me/courses/${courseId}/exams`;
    const options = {
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${myJwt}`
      })
    };
    return this.http
      .delete(url, options)
      .map(response => response.json())
      .catch(this.handleError);
  }
}

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

  getMyDocuments(myJwt: string) {
    const url = `${this.url}/me/documents`;
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

  uploadDocument(myJwt: string, document: File) {
    const url = `${this.url}/me/documents`;

    let formData: FormData = new FormData();
    formData.append("file", document);

    const options = {
      headers: new Headers({
        Authorization: `Bearer ${myJwt}`
      })
    };

    return this.http
      .post(url, formData, options)
      .map(response => {})
      .catch(this.handleError);
  }

  deleteMyDocument(myJwt: string, documentId: number) {
    const url = `${this.url}/me/documents/${documentId}`;

    const options = {
      headers: new Headers({
        Authorization: `Bearer ${myJwt}`,
        "Content-Type": "application/json"
      })
    };

    return this.http
      .delete(url, options)
      .map(response => {})
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

  makeDeposit(myJwt: string, amount: number) {
    const url = `${this.url}/me/deposit`;
    const options = {
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${myJwt}`
      })
    };

    return this.http
      .post(url, { amount }, options)
      .map(response => response.json())
      .catch(this.handleError);
  }

  getBalance(myJwt: string) {
    const url = `${this.url}/me/credit`;
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

  gradeStudent(lecturerJwt: string, courseAttendanceId: number, grade: number) {
    const url = `${this.url}/courses/${courseAttendanceId}`;
    const options = {
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${lecturerJwt}`
      })
    };

    return this.http
      .patch(url, { grade }, options)
      .map(response => response.json())
      .catch(this.handleError);
  }
}

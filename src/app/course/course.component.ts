import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/combineLatest";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";

@Component({
  selector: "app-course",
  templateUrl: "./course.component.html",
  styleUrls: ["./course.component.css"]
})
export class CourseComponent implements OnInit {
  //Injektujemo ActivatedRoute objekat u konstruktor da bismo pristupili route parametrima
  id: number;

  constructor(private route: ActivatedRoute, private router: Router) {}

  onSave() {
    this.router.navigate(["/courses"], {
      queryParams: { page: 1, orderBy: "name" }
    });
  }

  ngOnInit() {
    //Da bismo se subscribovali na vise observable-a (npr i parametre rute i parametre query-ja)
    // Observable.combineLatest([this.route.paramMap, this.route.queryParamMap])
    //   .switchMap(combined => {
    //     const id = combined[0].get("id");
    //     const orderBy = combined[1].get("orderBy");

    //     return this.service.getAll({ id, orderBy });
    //   })
    //   .subscribe(courses => (this.courses = courses));

    //paramMap Property koji nam daje sve parametre rute
    this.route.paramMap.subscribe(params => {
      //+ ispred string konvertuje u broj ako je broj
      this.id = +params.get("id");
    });
  }
}

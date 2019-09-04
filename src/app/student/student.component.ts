import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-student",
  templateUrl: "./student.component.html",
  styleUrls: ["./student.component.css"]
})
export class StudentComponent implements OnInit {
  id: number;
  student: object;

  constructor(private route: ActivatedRoute, private router: Router) {}

  onSave() {
    this.router.navigate(["/students"]);
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = +params.get("id");
    });
  }
}

import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-professor",
  templateUrl: "./professor.component.html",
  styleUrls: ["./professor.component.css"]
})
export class ProfessorComponent implements OnInit {
  id: number;
  constructor(private route: ActivatedRoute, private router: Router) {}

  onSave() {
    this.router.navigate(["/professors"]);
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = +params.get("id");
    });
  }
}

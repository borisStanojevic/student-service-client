import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  //ili
  // template: `
  //   <h2>App Component</h2>
  //   <app-students></app-students>
  // `,
  styleUrls: ["./app.component.css"]
  //ili
  // styles: [
  //   `
  //     h2 {
  //       color: dodgerblue;
  //     }
  //   `
  // ]
})
export class AppComponent {
  title = "app";
}

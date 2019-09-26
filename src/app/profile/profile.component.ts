import { Component, OnInit } from "@angular/core";
import { StudentService } from "./../services/student.service";
import { ProfessorService } from "./../services/professor.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "./../services/auth.service";
import { getAuthToken } from "../common/util/auth-util";
import { AppError } from "./../common/app-error";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  private form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.form = this.formBuilder.group({
      id: ["", [], []],
      email: ["", [Validators.required], []],
      firstName: ["", [Validators.required], []],
      lastName: ["", [Validators.required], []],
      address: ["", [], []],
      phoneNumber: ["", [], []]
    });
  }

  get id() {
    return this.form.get("id");
  }
  get email() {
    return this.form.get("email");
  }
  get firstName() {
    return this.form.get("firstName");
  }
  get lastName() {
    return this.form.get("lastName");
  }
  get address() {
    return this.form.get("address");
  }
  get phoneNumber() {
    return this.form.get("phoneNumber");
  }

  onSave() {
    this.authService
      .updateProfileData(getAuthToken(), this.form.value)
      .subscribe(
        () => {
          alert("Succesfully updated profile data.");
          this.authService.getProfileData(getAuthToken()).subscribe(
            profileData => {
              console.log(JSON.stringify(profileData));
              this.form.patchValue(profileData);
            },
            (error: AppError) => alert(error)
          );
        },
        (error: AppError) => {
          alert(JSON.stringify(error));
        }
      );
  }

  ngOnInit() {
    this.authService.getProfileData(getAuthToken()).subscribe(
      profileData => {
        console.log(JSON.stringify(profileData));
        this.form.patchValue(profileData);
      },
      (error: AppError) => alert(error)
    );
  }
}

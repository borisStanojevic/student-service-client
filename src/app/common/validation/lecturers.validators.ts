import { AbstractControl, ValidationErrors, FormArray } from "@angular/forms";

export class LecturersValidators {
  static cannotBeEmpty(control: AbstractControl): ValidationErrors | null {
    if ((control.value as FormArray).length === 0) {
      return { cannotBeEmpty: true };
    }
  }
}

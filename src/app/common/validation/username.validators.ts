import { AbstractControl, ValidationErrors } from "@angular/forms";

export class UsernameValidators {
  static cannotContainSpace(control: AbstractControl): ValidationErrors | null {
    if ((control.value as string).indexOf(" ") >= 0)
      return { cannotContainSpace: true };
    //   return {minLength: {
    //       requiredLength: 10,
    //       actualLength: control.value
    //   }}
  }

  static shouldBeUnique(
    control: AbstractControl
  ): Promise<ValidationErrors> | null {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === "mitar123") resolve({ shouldBeUnique: true });
        else resolve(null);
      }, 1500);
    });
  }
}

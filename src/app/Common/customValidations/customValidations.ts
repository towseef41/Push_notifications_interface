export class CustomValidator {
  // Validates phone number
  static phoneValidator(number): any {
    if (number.pristine) {
      return null;
    }
    const PHONE_REGEXP = /^(?:91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/;
    number.markAsTouched();
    if (PHONE_REGEXP.test(number.value)) {
      return null;
    }
    return {
      invalidNumber: true,
    };
  }
}

export class PasswordValidator {
  // Validates Password
  static passwordValidator(password): any {
    if (password.pristine) {
      return null;
    }
    const PHONE_REGEXP = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,100})/;
    password.markAsTouched();
    if (PHONE_REGEXP.test(password.value)) {
      return null;
    }
    return {
      invalidPassword: true,
    };
  }
}

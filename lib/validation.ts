type UserState_TP = {
  name?: string;
  email: string;
  password: string ;
};

export function registrationValidation(userState: UserState_TP) {
  let errors = { name: "", email: "", password: "", other: "" };

  if (!userState.name || userState.name.trim().length === 0) {
    errors.name = "name is required";
  }
  if (!userState.email.includes("@")) {
    errors.email = "invalid email";
  }
  if (!userState.email) {
    errors.email = "email is required";
  }
  if (userState.password.length < 8) {
    errors.password = "password must be 8 digit or more";
  }
  return errors;
}

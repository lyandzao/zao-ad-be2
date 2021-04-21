export class LoginDTO {
  readonly username: string;
  readonly password: string;
  readonly role: string;
}

export class RegisterDTO extends LoginDTO {}

// export class ProfileDTO {
//   readonly username: string;
// }

export class ForgetPasswordDTO {
  readonly email: string;
}

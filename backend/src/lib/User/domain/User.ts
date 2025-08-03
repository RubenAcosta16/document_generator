import { UserEmail } from "./Props/UserEmail";
import { UserId } from "./Props/UserId";
import { UserName } from "./Props/UserName";
import { UserPassword } from "./Props/UserPassword";

export class User {
  id: UserId;
  name: UserName;
  email: UserEmail;
  password: UserPassword;

  constructor(
    id: UserId,
    name: UserName,
    email: UserEmail,
    password: UserPassword
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  public mapToPrimitives() {
    return {
      id: this.id.value,
      name: this.name.value,
      email: this.email.value,
      password: this.password.value,
    };
  }

  public mapToPrimitivesNoPassword() {
    return {
      id: this.id.value,
      name: this.name.value,
      email: this.email.value,
    };
  }
}

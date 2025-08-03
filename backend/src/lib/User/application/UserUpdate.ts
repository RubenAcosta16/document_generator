import { UserEmail } from "../domain/Props/UserEmail";
import { UserId } from "../domain/Props/UserId";
import { UserName } from "../domain/Props/UserName";
import { UserPassword } from "../domain/Props/UserPassword";
import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";
import { UserError } from "../domain/errors";
// import { roles } from "../UserTypes";

export class UserUpdate {
  constructor(private repository: UserRepository) {}

  async run(
    id: string,
    name: string,
    email: string,
    password: string
  ): Promise<void> {
    // esto es para evitar que el usuario se actualice con un email ya existente
    const userFoundEmail = await this.repository.findByEmail(
      new UserEmail(email)
    );
    if (userFoundEmail && userFoundEmail.id.value !== id) {
      throw new UserError("Email already exists");
    }

    const user = new User(
      new UserId(id),
      new UserName(name),
      new UserEmail(email),
      new UserPassword(password)
    );

    return await this.repository.update(user);
  }
}

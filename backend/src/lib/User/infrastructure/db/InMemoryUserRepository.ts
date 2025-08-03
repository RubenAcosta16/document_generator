import { UserEmail } from "../../domain/Props/UserEmail";
import { UserId } from "../../domain/Props/UserId";
import { UserName } from "../../domain/Props/UserName";
import { UserPassword } from "../../domain/Props/UserPassword";
import { User } from "../../domain/User";
import { UserRepository } from "../../domain/UserRepository";
// import { roles } from "../../UserTypes";

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [
    new User(
      new UserId("user1"),
      new UserName("John Doe"),
      new UserEmail("john.doe@example.com"),
      new UserPassword(
        "$2b$10$7VZztbkDMPJID42SyZw.P.603xHcxiAt4yIF0M198Q2Y/Oo8PistK"
      )
    ),
    new User(
      new UserId("user2"),
      new UserName("Jane Smith"),
      new UserEmail("jane.smith@example.com"),
      new UserPassword(
        "$2b$10$7VZztbkDMPJID42SyZw.P.603xHcxiAt4yIF0M198Q2Y/Oo8PistK"
      )
    ),
  ];
  async create(user: User): Promise<void> {
    this.users.push(user);
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findById(id: UserId): Promise<User | null> {
    return this.users.find((user) => user.id.value === id.value) || null;
  }

  async update(user: User): Promise<void> {
    const index = this.users.findIndex((u) => u.id.value === user.id.value);
    if (index === -1) {
      throw new Error("Cannot update: user not found in infrastructure");
    }
    this.users[index] = user;
  }

  async delete(id: UserId): Promise<void> {
    this.users = this.users.filter((user) => user.id.value !== id.value);
  }

  async findByEmail(email: UserEmail): Promise<User | null> {
    return this.users.find((user) => user.email.value === email.value) || null;
  }
}

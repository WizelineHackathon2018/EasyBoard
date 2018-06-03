export class User {
  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  id: number;
  firstName: string;
  lastName: string;
  avatar: string;
}

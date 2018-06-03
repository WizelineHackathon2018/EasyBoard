import { User } from '../common/user.model';

export class Blocker {
  id: number;
  name: string;
  raisedBy: User;
  constructor(name: string) {
    this.name = name;
    this.raisedBy = new User('', '');
  }
}

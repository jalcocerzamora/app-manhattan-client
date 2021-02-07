import { Role } from './role.enum';

export class Login {
  Username: string = '';
  Password: string = '';
  Firstname?: string;
  Lastname?: string;
  Role?: Role = Role.Undefined;
  Token?: string;
}

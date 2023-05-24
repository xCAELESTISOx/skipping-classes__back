import { User, UserRole } from '../user.entity';

export class CreateUserDTO implements Omit<User, 'id' | 'skips' | 'group'> {
  firstname: string;
  middlename: string;
  role: UserRole;
  lastname: string;
}

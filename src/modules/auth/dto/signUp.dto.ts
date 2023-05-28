import { User } from '../../users/user.entity';

export class SignUpDTO
  implements Omit<User, 'id' | 'role' | 'groups' | 'skips'>
{
  firstname: string;
  middlename: string;
  lastname: string;
  email: string;
  password: string;
}

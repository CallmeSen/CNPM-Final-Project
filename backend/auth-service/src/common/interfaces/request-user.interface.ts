import { Role } from '../decorators/roles.decorator';

export interface RequestUser {
  userId: string;
  role: Role;
  email?: string;
  name?: string;
}

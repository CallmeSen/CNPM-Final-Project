import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export type Role =
  | 'customer'
  | 'admin'
  | 'superAdmin'
  | 'super-admin'
  | 'restaurant'
  | 'delivery';

export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

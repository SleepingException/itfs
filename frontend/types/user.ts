export interface IUser {
  id: number;
  fullName: string;
  roles: E_ROLES;
  enabled: boolean;
}

export enum E_ROLES {
  ROLE_ADMIN = 'ROLE_ADMIN',
  ROLE_MANAGER = 'ROLE_MANAGER',
  ROLE_EMPLOYEE = 'ROLE_EMPLOYEE',
}

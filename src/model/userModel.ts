export type UserResponse = {
  username: string;
  fullName: string;
  email: string;
  role: string;
  token?: string;
};

enum Roles {
  ADMIN = 'ADMIN',
  CASHIER = 'CASHIER',
}
export type CreateUserRequest = {
  username: string;
  fullName: string;
  email: string;
  role: Roles;
  password: string;
};

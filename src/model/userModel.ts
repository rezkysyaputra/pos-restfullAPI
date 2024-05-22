export type CreateUserResponse = {
  username: string;
  fullName: string;
  email: string;
  role: string;
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

export type LoginUserResponse = {
  accessToken: string;
  refreshToken: string;
};

export type LoginUserRequest = {
  username: string;
  password: string;
};

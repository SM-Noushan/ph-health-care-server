export interface ILoginUser {
  email: string;
  password: string;
}

export interface IJwtTokenPayload {
  email: string;
  role: string;
}

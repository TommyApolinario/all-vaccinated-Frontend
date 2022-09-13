export interface ILogin {
  identification: string;
  password: string;
}

export interface ResponseLoginI {
  success: boolean;
  token: string;
}

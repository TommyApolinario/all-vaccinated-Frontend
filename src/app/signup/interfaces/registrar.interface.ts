export interface ISignup {
  identification: string;
  password: string;
  repeat_password: string;
  name: string;
  surname: string;
  email: string;
  birthday: Date | string;
  phone_number: string;
}

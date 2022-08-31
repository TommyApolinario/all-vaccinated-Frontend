import { Component, OnInit } from "@angular/core";

import { RegistrarService } from "./registrar.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  identificacion: string;
  password: string;
  repeat_password: string;
  name: string;
  surname: string;
  email: string;
  birthday: Date;
  phone_number: string;

  test: Date = new Date();
  focus;
  focus1;
  focus2;
  constructor(private ServicioR: RegistrarService) {}

  ResgistrarU() {
    this.ServicioR.RegistrarUsuario({
      identification: this.identificacion,
      password: this.password,
      repeat_password: this.password,
      name: this.name,
      surname: this.surname,
      email: this.email,
      birthday: this.birthday,
      phone_number: this.phone_number,
    });
  }

  ngOnInit() {}
}

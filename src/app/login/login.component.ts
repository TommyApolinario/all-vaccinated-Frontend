import { Component, OnInit } from "@angular/core";
import { ServiciolService } from "./serviciol.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  focus;
  focus1;
  identificacion: string;
  password: string;
  constructor(private ServicioL: ServiciolService, private _router: Router) {}

  ngOnInit() {}

  public IniciarSesion() {
    this.ServicioL.IniciarSesion({
      identification: this.identificacion,
      password: this.password,
    }).subscribe(
      (res) => {
        this._router.navigate(["home"]);
      },
      (err) => {
        if (err.status === 404) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Usuario Inexistente!",
            footer: '<a href="">Comprueba que el usuario este creado</a>',
          });
        }

        if (err.status === 401) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Contraseña incorrecta!",
            footer: '<a href="">Comprueba la constraseña</a>',
          });
        }
      }
    );
  }
}

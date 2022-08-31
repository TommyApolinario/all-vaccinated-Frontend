import { query } from "@angular/animations";
import { HttpClient } from "@angular/common/http";
import { Injectable, Query } from "@angular/core";
import { Router } from "@angular/router";
import { map, of, switchMap } from "rxjs";
import Swal from "sweetalert2";
import { ILogin } from "./interfaces/login.interface";

@Injectable({
  providedIn: "root",
})
export class ServiciolService {
  constructor(private http: HttpClient, private _router: Router) {}

  set token(token: string) {
    localStorage.setItem("token", token);
  }

  get token(): string {
    return localStorage.getItem("token") ?? "";
  }

  IniciarSesion(Credenciales: ILogin) {
    this.http
      .post<any>(
        "https://a535-186-70-98-171.sa.ngrok.io/api/auth/login",
        Credenciales,
        { observe: "response" }
      )
      .pipe(
        map((data) => {
          console.log("Here will be return response code Ex :200", data.status);

          if (data.status === 201) {
          }
          return data.status;
        })
      )
      .subscribe(
        (resp) => {
          console.log(resp);
          this._router.navigate(["home"]);
        },
        (err) => {
          console.log("status code--->" + err.status);

          if (err.status === 404) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Usuario Inexistente!",
              footer: '<a href="">Comprueba que el usuario este creado</a>',
            });
            console.log("usuario no encontrado");
          }

          if (err.status === 401) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Contraseña incorrecta!",
              footer: '<a href="">Comprueba la constraseña</a>',
            });
            console.log("usuario no encontrado");
          }
        }
      );
  }
}

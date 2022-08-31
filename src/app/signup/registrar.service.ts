import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { relativeTimeRounding } from "moment";
import { map } from "rxjs";
import { ISignup } from "./interfaces/registrar.interface";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class RegistrarService {
  constructor(private http: HttpClient, private _router: Router) {}

  RegistrarUsuario(Credenciales: ISignup) {
    console.log(Credenciales);
    this.http
      .post<any>(
        "https://5d4f-186-3-209-149.sa.ngrok.io/api/auth/register",
        Credenciales,
        { observe: "response" }
      )
      .pipe(
        map((data) => {
          console.log("Here will be return response code Ex :200", data.status);

          if (data.status === 201) {
            //HACE ALGUNA LOGICA PARA MOSTRAR LA ALERTA Y REDIRIGIR A EL LOGIN

            Swal.fire({
              icon: "success",
              title: "Usuario Registrado correctamente",
              showConfirmButton: false,
              timer: 1500,
            });
            this._router.navigate(["login"]);
          }

          return data.status;
        })
      )
      .subscribe(
        (resp) => {
          console.log(resp);
        },
        (err) => {
          console.log("status code--->" + err.status);

          if (err.status === 400) {
            //HACE ALGUNA LOGICA PARA NO HACER NADA COMO EL SEBASTIAN
          }
        }
      );
  }
}

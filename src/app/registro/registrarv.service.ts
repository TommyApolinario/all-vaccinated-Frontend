import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { map } from "rxjs";
import Swal from "sweetalert2";
import { IRegistrov } from "./interfaces/registro.interface";
import { ILaboratorio } from "./interfaces/laboratorioresponse.interface";

@Injectable({
  providedIn: "root",
})
export class RegistrarvService {
  constructor(private http: HttpClient, private _router: Router) {}

  Registrardatos(Datos: IRegistrov) {
    console.log(Datos);
    this.http
      .post<any>(
        "https://a535-186-70-98-171.sa.ngrok.io/api/auth/register",
        Datos,
        { observe: "response" }
      )
      .pipe(
        map((data) => {
          console.log("Here will be return response code Ex :200", data.status);

          if (data.status === 201) {
            //HACE ALGUNA LOGICA PARA MOSTRAR LA ALERTA Y REDIRIGIR A EL LOGIN

            Swal.fire({
              icon: "success",
              title: "Los datos se han registrado existosamente",
              showConfirmButton: false,
              timer: 1500,
            });
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
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "No se registraron los datos!",
              footer: '<a href="">Why do I have this issue?</a>',
            });
          }
        }
      );
  }

  RecibirLaborario() {
    return this.http.get<ILaboratorio>(
      "https://a535-186-70-98-171.sa.ngrok.io/api/laboratory"
    );
  }
}

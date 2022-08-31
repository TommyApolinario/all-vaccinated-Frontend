import { query } from "@angular/animations";
import { HttpClient } from "@angular/common/http";
import { Injectable, Query } from "@angular/core";
import { of, switchMap } from "rxjs";
import { ILogin } from "./interfaces/login.interface";

@Injectable({
  providedIn: "root",
})
export class ServiciolService {
  constructor(private http: HttpClient) {}

  set token(token: string) {
    localStorage.setItem("token", token);
  }

  get token(): string {
    return localStorage.getItem("token") ?? "";
  }

  IniciarSesion(Credenciales: ILogin) {
    this.http
      .post<any>(
        "https://5d4f-186-3-209-149.sa.ngrok.io/api/auth/login",
        Credenciales
      )
      .subscribe((resp) => {
        console.log(resp);
        if (resp.token) {
          this.token = resp.token;
        }
      });
  }
}

import { query } from "@angular/animations";
import { HttpClient } from "@angular/common/http";
import { Injectable, Query } from "@angular/core";
import { Router } from "@angular/router";
import { map, of, switchMap, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";
import { ILogin, ResponseLoginI } from "./interfaces/login.interface";
import { LocalServiceService } from "../shared/services/local-service/local-service.service";

@Injectable({
  providedIn: "root",
})
export class ServiciolService {
  private authenticated: boolean = false;

  constructor(
    private http: HttpClient,
    private _router: Router,
    private localService: LocalServiceService
  ) {}

  IniciarSesion(Credenciales: ILogin): Observable<ResponseLoginI> {
    return this.http
      .post<ResponseLoginI>(
        `${environment.urlAdress}/api/auth/login`,
        Credenciales
      )
      .pipe(
        switchMap((response) => {
          if (response.success) {
            this.localService.setJsonLS("token", response.token);
            this.authenticated = true;
          } else {
            this.authenticated = false;
          }

          return of(response);
        })
      );
  }

  checkAunthenticated(): Observable<boolean> {
    if (this.authenticated) {
      return of(true);
    }

    if (!this.localService.getJsonLS("token")) {
      return of(false);
    }

    return of(true);
  }

  /**
   * Sign out
   */
  signOut(): Observable<any> {
    // Remove the access token from the local storage
    this.localService.clearLS();
    // localStorage.removeItem('accessToken');

    // Set the authenticated flag to false
    this.authenticated = false;

    // Return the observable
    return of(true);
  }
}

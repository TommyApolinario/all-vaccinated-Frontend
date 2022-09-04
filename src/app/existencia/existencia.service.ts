import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";
import { IExistencia, editExistenceI } from "./interface/existencia.interface";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class ExistenciaService {
  constructor(private http: HttpClient, private _router: Router) {}

  listarExistencia(): Observable<IExistencia[]> {
    return this.http.get<IExistencia[]>(
      `${environment.urlAdress}/api/vaccines`
    );
  }

  deleteExistencia(cod: number): Observable<any> {
    return this.http.delete<any>(
      `${environment.urlAdress}/api/vaccines/${cod}`
    );
  }

  editExistencia(data: editExistenceI, id: number): Observable<any> {
    console.log(data);

    return this.http.put<any>(
      `${environment.urlAdress}/api/vaccines/${id}`,
      data
    );
  }
}

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";
import { IExistencia } from "./interface/existencia.interface";

@Injectable({
  providedIn: "root",
})
export class ExistenciaService {
  constructor(private http: HttpClient) {}

  listarExistencia(): Observable<IExistencia[]> {
    return this.http.get<IExistencia[]>(
      `${environment.urlAdress}/api/vaccines`
    );
  }
}

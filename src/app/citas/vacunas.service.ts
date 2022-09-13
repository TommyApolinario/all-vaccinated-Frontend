import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { IVacunas } from "./interfaces/vacunas.interface";

@Injectable({
  providedIn: "root",
})
export class VacunasService {
  constructor(private http: HttpClient, private _router: Router) {}

  RecibirVacuna() {
    return this.http.get<IVacunas[]>(`${environment.urlAdress}/api/vaccines`);
  }
}

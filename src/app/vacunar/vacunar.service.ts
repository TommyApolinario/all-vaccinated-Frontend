import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { IVacunasV } from "./interfaces/vacunas.interface";

@Injectable({
  providedIn: "root",
})
export class VacunarService {
  constructor(private http: HttpClient, private _router: Router) {}

  RecibirVacuna() {
    return this.http.get<IVacunasV[]>(`${environment.urlAdress}/api/vaccines`);
  }
}

import { Component, OnInit } from "@angular/core";
import { ServiciolService } from "./serviciol.service";

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
  constructor(private ServicioL: ServiciolService) {}

  ngOnInit() {}

  public IniciarSesion() {
    this.ServicioL.IniciarSesion({
      identification: this.identificacion,
      password: this.password,
    });
  }
}

import { Component, OnInit } from "@angular/core";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { NgbDate, NgbCalendar } from "@ng-bootstrap/ng-bootstrap";
import { IVacunas } from "./interfaces/vacunas.interface";
import { VacunasService } from "./vacunas.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { LocalServiceService } from "../shared/services/local-service/local-service.service";
import jwt_decode from "jwt-decode";
import { ISignup } from "../signup/interfaces/registrar.interface";

@Component({
  selector: "app-citas",
  templateUrl: "./citas.component.html",
  styleUrls: ["./citas.component.css"],
})
export class CitasComponent implements OnInit {
  test: Date = new Date();
  focus;
  focus1;
  focus2;

  fromDate: NgbDate;
  toDate: NgbDate;
  hoveredDate: NgbDate;
  closeResult: string;
  model1: NgbDate;
  model2: NgbDate;
  model: NgbDate;
  constructor(
    private modalService: NgbModal,
    calendar: NgbCalendar,
    private listvacunas: VacunasService,
    private fbuild: FormBuilder,
    private localService: LocalServiceService
  ) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), "d", 10);
  }

  listaVacuna: IVacunas[] = [];

  registerDateForm: FormGroup = this.fbuild.group({
    fecha: ["", Validators.required],
    hora: ["", Validators.required],
    vacuna: ["", Validators.required],
    descripcion: ["", Validators.required],
    nombre_paciente: ["", Validators.required],
    identificacion: ["", Validators.required],
    correo: ["", Validators.required],
    telefono: ["", Validators.required],
  });

  open(content, type, modalDimension) {
    if (modalDimension === "sm" && type === "modal_mini") {
      this.modalService
        .open(content, {
          windowClass: "modal-mini",
          size: "sm",
          centered: true,
        })
        .result.then(
          (result) => {
            this.closeResult = `Closed with: ${result}`;
          },
          (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          }
        );
    } else if (modalDimension === "" && type === "Notification") {
      this.modalService
        .open(content, { windowClass: "modal-danger", centered: true })
        .result.then(
          (result) => {
            this.closeResult = `Closed with: ${result}`;
          },
          (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          }
        );
    } else {
      this.modalService.open(content, { centered: true }).result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
  isRangeStart(date: NgbDate) {
    return this.model1 && this.model2 && date.equals(this.model1);
  }
  isRangeEnd(date: NgbDate) {
    return this.model1 && this.model2 && date.equals(this.model2);
  }
  isInRange(date: NgbDate) {
    return date.after(this.model1) && date.before(this.model2);
  }
  isActive(date: NgbDate) {
    return date.equals(this.model1) || date.equals(this.model2);
  }
  endDateChanged(date) {
    if (
      this.model1 &&
      this.model2 &&
      (this.model1.year > this.model2.year ||
        (this.model1.year === this.model2.year &&
          this.model1.month > this.model2.month) ||
        (this.model1.year === this.model2.year &&
          this.model1.month === this.model2.month &&
          this.model1.day > this.model2.day))
    ) {
      this.model1 = this.model2;
    }
  }
  startDateChanged(date) {
    if (
      this.model1 &&
      this.model2 &&
      (this.model1.year > this.model2.year ||
        (this.model1.year === this.model2.year &&
          this.model1.month > this.model2.month) ||
        (this.model1.year === this.model2.year &&
          this.model1.month === this.model2.month &&
          this.model1.day > this.model2.day))
    ) {
      this.model2 = this.model1;
    }
  }
  ngOnInit(): void {
    this.getUserLogin();
    this.listvacunas.RecibirVacuna().subscribe((Vacunas) => {
      if (Vacunas) {
        this.listaVacuna = Vacunas;
      }
    });
    this.constrolsListener();
  }

  constrolsListener(): void {
    this.registerDateForm.get("vacuna").valueChanges.subscribe((res) => {
      let objectVaccine: IVacunas = this.listaVacuna.find(
        (data) => data.name === res
      );

      if (objectVaccine) {
        this.registerDateForm
          .get("descripcion")
          .setValue(objectVaccine.description);
      } else {
        this.registerDateForm.get("descripcion").setValue("");
      }
    });
  }

  getUserLogin(): void {
    let token = this.localService.getJsonLS("token");

    let user: ISignup = this.getDecodedToken(token);

    if (user) {
      console.log(user);
      this.registerDateForm
        .get("nombre_paciente")
        .setValue(user?.name + " " + user?.surname);
      this.registerDateForm
        .get("identificacion")
        .setValue(user?.identification);
      this.registerDateForm.get("telefono").setValue(user?.phone_number);
      this.registerDateForm.get("correo").setValue(user?.email);
    }
  }

  getDecodedToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
}

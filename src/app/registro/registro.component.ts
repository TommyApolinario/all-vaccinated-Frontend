import { Component, OnInit } from "@angular/core";
import { RegistrarService } from "../signup/registrar.service";
import { ILaboratorio } from "./interfaces/laboratorioresponse.interface";
import { RegistrarvService } from "./registrarv.service";
import {
  NgbDate,
  NgbCalendar,
  ModalDismissReasons,
  NgbModal,
} from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-registro",
  templateUrl: "./registro.component.html",
  styleUrls: ["./registro.component.css"],
})
export class RegistroComponent implements OnInit {
  test: Date = new Date();
  fromDate: NgbDate;
  toDate: NgbDate;
  hoveredDate: NgbDate;
  closeResult: string;
  model1: NgbDate;
  model2: NgbDate;
  model: NgbDate;
  modelb: NgbDate;

  laboratorylist: ILaboratorio[] = [];

  //variables para enviar datos al servicio

  Nombre: string;
  Descripcion: string;
  lote: string;
  fecha_adminision: Date;
  fecha_caducidad: Date;
  id_laboratorio: number;
  cantidad: number;

  registerVaccineForm: FormGroup = this.fbuil.group({
    nombre: ["", Validators.required],
    descripcion: ["", Validators.required],
    lote: ["", Validators.required],
    fecha_admision: ["", Validators.required],
    fecha_expiracion: ["", Validators.required],
    cantidad: ["", Validators.required],
    id_laboratorio: ["", Validators.required],
  });

  constructor(
    private modalService: NgbModal,
    private fbuil: FormBuilder,
    calendar: NgbCalendar,
    private registrarv: RegistrarvService
  ) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), "d", 10);
  }

  RegistrarVacuna() {
    let nameAux = this.registerVaccineForm.get("id_laboratorio").value;
    let laboratoryObject = this.laboratorylist.find(
      (res) => res.name === nameAux
    );

    if (laboratoryObject) {
      this.registrarv.Registrardatos({
        name: this.registerVaccineForm.get("nombre").value,
        description: this.registerVaccineForm.get("descripcion").value,
        lote: this.registerVaccineForm.get("lote").value,
        admission_date: this.registerVaccineForm.get("fecha_admision").value,
        expiration_date: this.registerVaccineForm.get("fecha_expiracion").value,
        id_laboratory: laboratoryObject.id,
        quantity: Number(this.registerVaccineForm.get("cantidad").value),
      });
    }
  }

  public listaLaboratorio = [];
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
    this.registrarv.RecibirLaborario().subscribe((Laboratorios) => {
      if (Laboratorios) {
        this.laboratorylist = Laboratorios;
      }
    });
  }
}

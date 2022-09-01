import { Component, OnInit } from "@angular/core";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ExistenciaService } from "./existencia.service";
import { IExistencia } from "./interface/existencia.interface";

@Component({
  selector: "app-existencia",
  templateUrl: "./existencia.component.html",
  styleUrls: ["./existencia.component.css"],
})
export class ExistenciaComponent implements OnInit {
  closeResult: string;

  constructor(
    private modalService: NgbModal,
    private existenciaService: ExistenciaService
  ) {}

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
            this.closeResult = "Closed with: $result";
          },
          (reason) => {
            this.closeResult = "Dismissed $this.getDismissReason(reason)";
          }
        );
    } else if (modalDimension === "" && type === "Notification") {
      this.modalService
        .open(content, { windowClass: "modal-danger", centered: true })
        .result.then(
          (result) => {
            this.closeResult = "Closed with: $result";
          },
          (reason) => {
            this.closeResult = "Dismissed $this.getDismissReason(reason)";
          }
        );
    } else {
      this.modalService.open(content, { centered: true }).result.then(
        (result) => {
          this.closeResult = "Closed with: $result";
        },
        (reason) => {
          this.closeResult = "Dismissed $this.getDismissReason(reason)";
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
      return "with: $reason";
    }
  }
  existenciaList: IExistencia[] = [];

  ngOnInit(): void {
    this.getExistencias();
  }

  getExistencias(): void {
    this.existenciaService.listarExistencia().subscribe((res) => {
      if (res) {
        this.existenciaList = res;
      }
    });
  }
}

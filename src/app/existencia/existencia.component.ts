import { Component, OnInit } from "@angular/core";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ExistenciaService } from "./existencia.service";
import { IExistencia } from "./interface/existencia.interface";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";

@Component({
  selector: "app-existencia",
  templateUrl: "./existencia.component.html",
  styleUrls: ["./existencia.component.css"],
})
export class ExistenciaComponent implements OnInit {
  closeResult: string;

  editExistenciaForm: FormGroup = this.fb.group({
    name: ["", []],
    lote: ["", []],
    admission_date: ["", []],
    expiration_date: ["", []],
  });

  checkConfirmedData: FormControl = new FormControl({ value: "false" }, [
    Validators.required,
  ]);

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private existenciaService: ExistenciaService,
    private router: Router
  ) {}

  content = null;

  open(content, type, modalDimension, item: any) {
    console.log(content, type, modalDimension, "EJEMPLO MODAL");
    this.content = content;
    this.editExistenciaForm.patchValue(item, { emitEvent: false });
    this.editExistenciaForm.get("admission_date").setValue(item.admissionDate);
    this.editExistenciaForm
      .get("expiration_date")
      .setValue(item.expirationDate);

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
    this.subscribeControls();
  }

  subscribeControls(): void {
    this.checkConfirmedData.valueChanges.subscribe((res) => {
      console.log(res);
    });
  }

  getExistencias(): void {
    this.existenciaService.listarExistencia().subscribe((res) => {
      if (res) {
        this.existenciaList = res;
      }
    });
  }
  deleteElement(index: number) {
    console.log(index);
    debugger;
    this.existenciaService.deleteExistencia(index).subscribe(
      (res) => {
        if (res.success) {
          Swal.fire({
            icon: "success",
            title: "El registro se ha eliminado correctamente.",
            showConfirmButton: false,
            timer: 1500,
          });

          this.getExistencias();
        }
      },
      (err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Error en la transacción.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    );
  }

  editRow(id: number): void {
    let dataExistenceFormAux = JSON.parse(
      JSON.stringify(this.editExistenciaForm.getRawValue())
    );
    this.existenciaService
      .editExistencia(dataExistenceFormAux, id)
      .subscribe((res) => {
        if (res) {
          this.getExistencias();

          Swal.fire({
            icon: "success",
            title: "El registro se ha editado correctamente.",
            showConfirmButton: false,
            timer: 1500,
          });
          this.refresh();
        }
      });
  }

  /**
   * Para refrescar el comoponente
   */
  refresh() {
    let currentUrl = this.router.url;
    console.log(currentUrl);
    this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}

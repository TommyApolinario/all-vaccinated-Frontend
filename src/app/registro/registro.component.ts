import { Component, OnInit } from "@angular/core";
import { RegistrarService } from "../signup/registrar.service";
import {
  NgbDate,
  NgbCalendar,
  ModalDismissReasons,
  NgbModal,
} from "@ng-bootstrap/ng-bootstrap";

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
  constructor(private modalService: NgbModal, calendar: NgbCalendar) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), "d", 10);
  }
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

  ngOnInit(): void {}
}

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "../shared/shared.module";
import { SectionsModule } from "../sections/sections.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from "@angular/forms";
import { CitasComponent } from "./citas.component";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";

@NgModule({
  declarations: [CitasComponent],
  imports: [
    CommonModule,
    SharedModule,
    SectionsModule,
    FormsModule,
    NgbModule,
    NgxMaterialTimepickerModule,
  ],
})
export class CitasModule {}

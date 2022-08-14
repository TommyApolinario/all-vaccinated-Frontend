import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CitasComponent } from "./citas.component";
import { SectionsComponent } from "../sections/sections.component";
import { SharedModule } from "../shared/shared.module";
import { SectionsModule } from "../sections/sections.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from "@angular/forms";
import { DateTimePickerModule } from "@syncfusion/ej2-angular-calendars";

@NgModule({
  declarations: [CitasComponent],
  imports: [
    CommonModule,
    SharedModule,
    SectionsModule,
    FormsModule,
    NgbModule,
    DateTimePickerModule,
  ],
})
export class CitasModule {}

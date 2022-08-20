import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { SectionsModule } from "../sections/sections.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from "@angular/forms";
import { VacunarComponent } from "./vacunar.component";

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModule, SectionsModule, NgbModule, FormsModule],
})
export class VacunarModule {}

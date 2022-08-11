import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CitasComponent } from "./citas.component";
import { SectionsComponent } from "../sections/sections.component";
import { SharedModule } from "../shared/shared.module";
import { SectionsModule } from "../sections/sections.module";

@NgModule({
  declarations: [CitasComponent],
  imports: [CommonModule, SharedModule, SectionsModule],
})
export class CitasModule {}

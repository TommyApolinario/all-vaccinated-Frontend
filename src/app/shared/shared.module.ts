import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [FooterComponent, NavbarComponent],
  imports: [CommonModule, RouterModule, NgbModule],
  exports: [FooterComponent, NavbarComponent],
})
export class SharedModule {}

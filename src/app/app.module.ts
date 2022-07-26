import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app.routing";

import { AppComponent } from "./app.component";
import { SignupComponent } from "./signup/signup.component";
import { LandingComponent } from "./landing/landing.component";
import { ProfileComponent } from "./profile/profile.component";
import { HomeComponent } from "./home/home.component";

import { HomeModule } from "./home/home.module";
import { LoginComponent } from "./login/login.component";
import { SharedModule } from "./shared/shared.module";
import { VacunarComponent } from "./vacunar/vacunar.component";
import { HistoryComponent } from "./history/history.component";
import { ExistenciaComponent } from "./existencia/existencia.component";
import { RegistroComponent } from "./registro/registro.component";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,

    SignupComponent,
    LandingComponent,
    ProfileComponent,
    LoginComponent,
    VacunarComponent,
    HistoryComponent,
    ExistenciaComponent,
    RegistroComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    SharedModule,
    HomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

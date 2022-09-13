import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { ProfileComponent } from "./profile/profile.component";
import { SignupComponent } from "./signup/signup.component";
import { LandingComponent } from "./landing/landing.component";
import { LoginComponent } from "./login/login.component";
import { CitasComponent } from "./citas/citas.component";
import { VacunarComponent } from "./vacunar/vacunar.component";
import { HistoryComponent } from "./history/history.component";
import { ExistenciaComponent } from "./existencia/existencia.component";
import { RegistroComponent } from "./registro/registro.component";
import { AuthGuard } from "./core/auth/guards/auth.guard";
import { NoAuthGuard } from "./core/auth/guards/no-auth.guard";

const routes: Routes = [
  { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: "user-profile",
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  { path: "register", component: SignupComponent, canActivate: [NoAuthGuard] },
  { path: "landing", component: LandingComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent, canActivate: [NoAuthGuard] },
  { path: "citas", component: CitasComponent, canActivate: [AuthGuard] },
  { path: "vacunar", component: VacunarComponent, canActivate: [AuthGuard] },
  { path: "history", component: HistoryComponent, canActivate: [AuthGuard] },
  {
    path: "existencia",
    component: ExistenciaComponent,
    canActivate: [AuthGuard],
  },
  { path: "registro", component: RegistroComponent, canActivate: [AuthGuard] },
  { path: "", redirectTo: "login", pathMatch: "full" },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [],
})
export class AppRoutingModule {}

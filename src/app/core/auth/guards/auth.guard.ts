import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { LocalServiceService } from "../../../shared/services/local-service/local-service.service";
import { ServiciolService } from "../../../login/serviciol.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private _router: Router,
    private serviciolService: ServiciolService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.checkAuth();
  }

  checkAuth(): Observable<boolean> {
    return this.serviciolService.checkAunthenticated().pipe(
      switchMap((authenticated: boolean) => {
        if (!authenticated) {
          this._router.navigate(["login"]);
          return of(false);
        }

        return of(true);
      })
    );
  }
}

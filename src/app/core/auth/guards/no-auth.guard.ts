import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from "@angular/router";
import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { Router } from "@angular/router";
import { ServiciolService } from "../../../login/serviciol.service";

@Injectable({
  providedIn: "root",
})
export class NoAuthGuard implements CanActivate, CanLoad {
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

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkAuth();
  }

  checkAuth(): Observable<boolean> {
    return this.serviciolService.checkAunthenticated().pipe(
      switchMap((authenticated: boolean) => {
        if (authenticated) {
          this._router.navigate([""]);
          return of(false);
        }

        return of(true);
      })
    );
  }
}

import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { constant } from "../Common/constants";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    if (this.isloggedIn()) return true;
    return false;
  }

  public isloggedIn() {
    const token = localStorage.getItem(constant.ACCESS_TOKEN);
    if (token) return true;
    return false;
  }
}

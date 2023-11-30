import { Component } from "@angular/core";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.page.html",
  styleUrls: ["./auth.page.scss"],
})
export class AuthPage {
  constructor() {}

  isLogin: boolean = true;

  switch() {
    this.isLogin = !this.isLogin;
  }
}

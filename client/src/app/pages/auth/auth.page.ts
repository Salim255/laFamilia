import { Component, OnInit } from "@angular/core";

//import { SharedModule } from "src/app/shared/shared.module";
@Component({
  selector: "app-auth",
  templateUrl: "./auth.page.html",
  styleUrls: ["./auth.page.scss"],
})
export class AuthPage implements OnInit {
  constructor() {}

  isLogin: boolean = true;
  ngOnInit() {}
  switch() {
    this.isLogin = !this.isLogin;
  }
}

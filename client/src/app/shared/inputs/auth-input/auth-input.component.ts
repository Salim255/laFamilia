import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-auth-input",
  templateUrl: "./auth-input.component.html",
  styleUrls: ["./auth-input.component.scss"],
})
export class AuthInputComponent implements OnInit {
  constructor() {}

  placeHolder: string = "";

  ngOnInit() {}
}

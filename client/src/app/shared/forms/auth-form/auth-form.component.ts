import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
@Component({
  selector: "app-auth-form",
  templateUrl: "./auth-form.component.html",
  styleUrls: ["./auth-form.component.scss"],
})
export class AuthFormComponent implements OnInit {
  @Input() isLogin: boolean = true;
  @Output() switchHandler = new EventEmitter();
  constructor() {}

  ngOnInit() {}
  switch() {
    this.switchHandler.emit();
  }
}

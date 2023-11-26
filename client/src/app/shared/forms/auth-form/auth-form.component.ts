import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/services/auth/auth.service";
@Component({
  selector: "app-auth-form",
  templateUrl: "./auth-form.component.html",
  styleUrls: ["./auth-form.component.scss"],
})
export class AuthFormComponent {
  @Input() isLogin: boolean = true;
  @Output() switchHandler = new EventEmitter();
  constructor(private authService: AuthService) {}
  first_name: string = "";
  last_name: string = "";
  email: string = "";
  confirm_email: string = "";
  password: string = "";
  password_confirm: string = "";
  //
  private authSub!: Subscription;

  switch() {
    this.switchHandler.emit();
  }

  onChange(event: any) {}
  onSubmit(form: NgForm) {
    console.log(form);
    if (!form.valid) {
      return;
    }

    let authData = {
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      confirm_email: this.confirm_email,
      password: this.password,
      confirm_password: this.password_confirm,
    };

    this.authService.authenticate(this.isLogin, authData).subscribe({
      error: err => {
        console.log(err);
      },
      next: res => {
        this.authSub = this.authService.userIsAuthenticated.subscribe(data => {
          console.log("====================================");
          console.log(data);
          console.log("====================================");
        });
      },
    });
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnDestroy(): void {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }
}

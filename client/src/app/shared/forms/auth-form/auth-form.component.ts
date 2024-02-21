import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AuthService } from "src/app/services/auth/auth.service";
@Component({
  selector: "app-auth-form",
  templateUrl: "./auth-form.component.html",
  styleUrls: ["./auth-form.component.scss"],
})
export class AuthFormComponent implements OnInit {
  @Input() isLogin: boolean = true;
  @Output() switchHandler = new EventEmitter();
  constructor(private authService: AuthService, private router: Router) {}
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

  ngOnInit(): void {
    console.log("====================================");
    console.log("Hello world");
    console.log("====================================");
  }

  onChange(event: any) {}
  onSubmit(form: NgForm) {
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

    console.log("====================================");
    console.log(this.isLogin, authData);
    console.log("====================================");
    let authObs: Observable<any>;
    authObs = this.authService.authenticate(this.isLogin, authData);
    authObs.subscribe({
      error: err => {
        console.log(err, "hello error 👹👹");
      },
      next: res => {
        console.log(res);
        console.log(res, "hello error 👹👹");
        this.authSub = this.authService.userIsAuthenticated.subscribe(() => {
          this.router.navigateByUrl("/tabs/home");
        });
      },
    });
  }

  ngOnDestroy(): void {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }
}

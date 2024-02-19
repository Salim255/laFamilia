import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AccountService } from "src/app/services/account/account.service";
import { AuthService } from "src/app/services/auth/auth.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {
  isLoading = true;
  account: any;
  constructor(
    private accountService: AccountService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    console.log("====================================");
    console.log(this.isLoading);
    console.log("====================================");
    this.accountService.getAccount.subscribe(data => {
      console.log(data);
      if (data) {
        this.account = data[0];
        console.log("====================================");
        console.log(this.account);
        console.log("====================================");
      }
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.accountService.fetchUser().subscribe(() => {
      this.isLoading = false;
    });
  }
  logout() {
    this.authService.logout();
    this.router.navigateByUrl("/auth");
  }
}

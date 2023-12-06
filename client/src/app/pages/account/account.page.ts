import { Component, OnInit } from "@angular/core";
import { AccountService } from "src/app/services/account/account.service";
@Component({
  selector: "app-account",
  templateUrl: "./account.page.html",
  styleUrls: ["./account.page.scss"],
})
export class AccountPage implements OnInit {
  isLoading = true;
  account: any;
  constructor(private accountService: AccountService) {}

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
}

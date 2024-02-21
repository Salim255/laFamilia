import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { AuthPageRoutingModule } from "./auth-routing.module";

import { AuthPage } from "./auth.page";

import { SharedModule } from "src/app/shared/shared.module";
import { AuthInputComponent } from "src/app/shared/inputs/auth-input/auth-input.component";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, AuthPageRoutingModule],
  declarations: [AuthPage, SharedModule, AuthInputComponent],
})
export class AuthPageModule {}

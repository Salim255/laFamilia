import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { AuthPageRoutingModule } from "./auth-routing.module";

import { AuthPage } from "./auth.page";

import { AuthFormComponent } from "src/app/shared/forms/auth-form/auth-form.component";
import { AuthInputComponent } from "src/app/shared/inputs/auth-input/auth-input.component";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, AuthPageRoutingModule],
  declarations: [AuthPage, AuthFormComponent, AuthInputComponent],
})
export class AuthPageModule {}

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";

import { IonicModule } from "@ionic/angular";

import { FormsModule } from "@angular/forms";
import { AuthFormComponent } from "./forms/auth-form/auth-form.component";
import { AuthInputComponent } from "./inputs/auth-input/auth-input.component";

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [AuthFormComponent, AuthInputComponent],
  imports: [CommonModule, IonicModule, FormsModule],
  exports: [AuthFormComponent, AuthInputComponent],
})
export class SharedModule {}

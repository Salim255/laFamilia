import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { AuthFormComponent } from "./forms/auth-form/auth-form.component";
import { AuthInputComponent } from "./inputs/auth-input/auth-input.component";

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [AuthFormComponent, AuthInputComponent],
  imports: [AuthFormComponent, AuthInputComponent],
  exports: [AuthFormComponent, AuthInputComponent],
})
export class SharedModule {}

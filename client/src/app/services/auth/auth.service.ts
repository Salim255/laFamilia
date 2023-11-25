import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { environment as devEnvironment } from "src/environments/environment";

interface User {
  id: number;
  token: string;
}
interface authData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
}
@Injectable({
  providedIn: "root",
})
export class AuthService {
  private ENV = devEnvironment;
  constructor(private http: HttpClient) {}

  authenticate(mode: boolean, data: authData) {
    console.log("====================================");
    console.log(mode, data, this.ENV.apiURL);
    console.log("====================================");
    let dataToSend = mode ? { email: data.email, password: data.password } : data;
    return this.http.post<any>(`${this.ENV.apiURL}/${mode ? "login" : "signup"}`, dataToSend).pipe(
      tap(userData => {
        console.log(userData, "👽👽👽");
      }),
    );
  }

  autoLogin() {}
  logout() {}
}

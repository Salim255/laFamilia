import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subscription, map, tap } from "rxjs";
import { environment as devEnvironment } from "src/environments/environment";
import { User } from "src/app/models/user/user.model";

interface Auth {
  id: number;
  token: string;
  expiresIn: Date;
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
  private user = new BehaviorSubject<User | null>(null);
  constructor(private http: HttpClient) {}

  authenticate(mode: boolean, data: authData) {
    let dataToSend = mode ? { email: data.email, password: data.password } : data;

    return this.http.post<any>(`${this.ENV.apiURL}/${mode ? "login" : "signup"}`, dataToSend).pipe(
      tap(response => {
        this.setAuthData(response?.data);
      }),
    );
  }

  private setAuthData(authData: Auth) {
    const expirationTime = new Date(new Date().getTime() + +authData.expiresIn * 1000);
    let userId = authData.id;

    const buildUser = new User(userId, authData.token, expirationTime);

    this.user.next(buildUser);
  }

  get userIsAuthenticated() {
    return this.user.asObservable().pipe(
      map(user => {
        console.log(user);

        if (user) {
          return !!user.token;
        }
        return false;
      }),
    );
  }
  autoLogin() {}
  logout() {}
}

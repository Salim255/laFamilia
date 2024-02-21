import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { environment as devEnvironment } from "../../../environments/environment";
import { environment as prodEnvironment } from "../../../environments/environment.prod";
import { Preferences } from "@capacitor/preferences";
import { BehaviorSubject, from, map, switchMap, tap } from "rxjs";

interface Account {
  id: number;
  first_name: string;
  last_name: string;
  photo: string;
}
@Injectable({
  providedIn: "root",
})
export class AccountService {
  private ENV = devEnvironment.production ? prodEnvironment : devEnvironment;
  account = new BehaviorSubject<Account[] | null>(null);

  constructor(private http: HttpClient) {}

  fetchUser() {
    return from(Preferences.get({ key: "authData" })).pipe(
      map(storedData => {
        if (!storedData || !storedData.value) {
          return null;
        }

        const parseData = JSON.parse(storedData.value) as {
          id: number;
          _token: string;
          tokenExpirationDate: string;
        };

        return { token: parseData._token, id: parseData.id };
      }),
      switchMap(data => {
        console.log("====================================");
        console.log(data);
        console.log("====================================");
        return this.http.get<any>(`${this.ENV.apiURL}/users/${data?.id}`, {
          headers: { Authorization: `Bearer ${data?.token}` },
        });
      }),
      tap(data => {
        this.account.next(data.data);
      }),
    );
  }

  get getAccount() {
    return this.account.asObservable().pipe(
      map(data => {
        return data;
      }),
    );
  }
}

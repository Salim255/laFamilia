import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { environment as devEnvironment } from "../../../environments/environment";
import { environment as prodEnvironment } from "../../../environments/environment.prod";
import { Preferences } from "@capacitor/preferences";
import { BehaviorSubject, from, map, switchMap, tap } from "rxjs";

interface Profile {
  id: number;
  first_name: string;
  last_name: string;
  photo: string;
}
@Injectable({
  providedIn: "root",
})
export class ProfilesService {
  private ENV = devEnvironment.production ? prodEnvironment : devEnvironment;
  profiles = new BehaviorSubject<Profile[] | null>(null);

  constructor(private http: HttpClient) {}

  fetchProfiles() {
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

        return parseData._token;
      }),
      switchMap(token => {
        return this.http.get<any>(`${this.ENV.apiURLDev}/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }),
      tap(profiles => {
        this.profiles.next(profiles.data);
      }),
    );
  }

  get getProfiles() {
    return this.profiles.asObservable().pipe(
      map(data => {
        return data;
      }),
    );
  }
}

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { environment as devEnvironment } from "../../../environments/environment";
import { environment as prodEnvironment } from "../../../environments/environment.prod";
import { Preferences } from "@capacitor/preferences";
import { BehaviorSubject, from, map, switchMap, tap } from "rxjs";

interface Chats {
  id: number;
  type: string;
  created_at: Date;
  updated_at: Date;
  messages: any;
  chatUser: any;
  users: any;
}
@Injectable({
  providedIn: "root",
})
export class ChatsService {
  private ENV = devEnvironment.production ? prodEnvironment : devEnvironment;
  chats = new BehaviorSubject<Chats[] | null>(null);
  activeLogoutTimer: any;
  constructor(private http: HttpClient) {}

  fetchChats() {
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
        return this.http.get<any>(`${this.ENV.apiURL}/chats`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }),
      tap(chats => {
        console.log(chats);
        let fetchChats = chats.data;
        this.chats.next(fetchChats);
      }),
    );
  }

  get getChats() {
    return this.chats.asObservable().pipe(
      map(data => {
        console.log("====================================");
        console.log(data, "🔥🔥🔥");
        console.log("====================================");

        return data;
      }),
    );
  }
}

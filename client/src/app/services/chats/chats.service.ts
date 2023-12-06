import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { environment as devEnvironment } from "../../../environments/environment";
import { environment as prodEnvironment } from "../../../environments/environment.prod";
import { Preferences } from "@capacitor/preferences";
import { BehaviorSubject, Observable, from, map, switchMap, tap } from "rxjs";

interface Chats {
  id: number;
  type: string;
  created_at: Date;
  updated_at: Date;
  messages: any;
  chatUser: any;
  users: any;
  fakeChat: false;
}
@Injectable({
  providedIn: "root",
})
export class ChatsService {
  private ENV = devEnvironment.production ? prodEnvironment : devEnvironment;
  chats = new BehaviorSubject<Chats[] | null>(null);
  currentChat: any = null;
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
        return this.http.get<any>(`${this.ENV.apiURLDev}/chats`, {
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

  get getCurrentChat() {
    return this.currentChat;
  }
  sendMessage(message: string, chatId: number) {
    console.log("====================================");
    console.log("Hello ", message, chatId);
    console.log("====================================");
    return from(Preferences.get({ key: "authData" })).pipe(
      map(storedData => {
        console.log("====================================");
        console.log("from 💥💥💥", storedData, "Hello ");
        console.log("====================================");
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
        return this.http.post<any>(
          `${this.ENV.apiURLDev}/messages`,
          { chat_id: chatId, content: message },
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
      }),
      tap(data => {
        console.log("====================================");
        console.log(data);
        console.log("====================================");
        this.fetchChats();
        let obs = new Observable();
        obs = this.fetchChatByChatId(chatId);
        obs.subscribe((data: any) => {
          console.log("====================================");
          console.log(data.data[0]);
          console.log("====================================");
          this.currentChat = data.data[0];
        });
      }),
    );
  }

  fetchChatByChatId(chatId: number) {
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
        return this.http.get<any>(`${this.ENV.apiURLDev}/chats/${chatId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }),
      tap(chat => {
        console.log("====================================");
        console.log(chat, "Hello from updated chat 💥💥💥💥");
        console.log("====================================");
        this.currentChat = chat.data.data;
      }),
    );
  }
  get getChats() {
    return this.chats.asObservable().pipe(
      map(data => {
        return data;
      }),
    );
  }

  createDualChat(data: any) {
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
      switchMap((token: any) => {
        console.log(data, "Hello from data", token);

        return this.http.post<any>(`${this.ENV.apiURLDev}/chats`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }),
      tap(data => {
        console.log("====================================");
        console.log(data);
        console.log("Hello we start create chat 💥💥", data);
      }),
    );
  }
}

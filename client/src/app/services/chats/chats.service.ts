import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { environment as devEnvironment } from "../../../environments/environment";
import { environment as prodEnvironment } from "../../../environments/environment.prod";
import { Preferences } from "@capacitor/preferences";
import { BehaviorSubject, Observable, from, map, switchMap, tap } from "rxjs";
import { Chat } from "src/app/models/chat/chat.model";

@Injectable({
  providedIn: "root",
})
export class ChatsService {
  private ENV = devEnvironment.production ? prodEnvironment : devEnvironment;
  chats = new BehaviorSubject<Chat[] | null>(null);
  currentChat = new BehaviorSubject<Chat | null>(null);
  fakeChat: any = null;
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
        let fetchedChats = chats.data;
        this.chats.next(fetchedChats);
      }),
    );
  }

  setCurrentChat(chat: any) {
    console.log(chat);

    const buildChat = new Chat(
      chat.id,
      chat.type,
      chat.created_at,
      chat.updated_at,
      chat.messages,
      chat.chatuser,
      chat.users,
      chat.fakeChat,
    );
    this.currentChat.next(buildChat);
  }

  get getCurrentChat() {
    return this.currentChat.asObservable().pipe(
      map(data => {
        return data;
      }),
    );
  }

  sendMessage(message: string, chatId: number) {
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
        return this.http.post<any>(
          `${this.ENV.apiURL}/messages`,
          { chat_id: chatId, content: message },
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
      }),
      tap(data => {
        //To fetch all chats
        let obsChatFetching = new Observable();
        obsChatFetching = this.fetchChats();
        obsChatFetching.subscribe();

        //To fetch current chat
        let chatByIdObs = new Observable();
        chatByIdObs = this.fetchChatByChatId(chatId);
        chatByIdObs.subscribe((data: any) => {
          this.setCurrentChat(data.data[0]);
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
        console.log("chatId", chatId);

        return this.http.get<any>(`${this.ENV.apiURL}/chats/${chatId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }),
      tap(chat => {
        console.log("====================================");
        console.log(chat, "chat by id");
        console.log("====================================");
        //this.currentChat = chat.data.data;
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
    console.log("====================================");
    console.log(data, "Hello Data before send Chat with messages ");

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

        return this.http.post<any>(`${this.ENV.apiURL}/chats`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }),
      tap(data => {
        console.log("====================================");
        console.log(data);
        console.log("Created chat Data 🌈🌈☂️☂️🌊🌊💦💧 💥💥", data);
        this.setCurrentChat(data?.data);
        //1) Get created chat
        //2) Replace currentChat with created chat
      }),
    );
  }
}

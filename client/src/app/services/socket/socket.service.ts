import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { environment as devEnvironment } from "../../../environments/environment";
import { environment as prodEnvironment } from "../../../environments/environment.prod";
import io from "socket.io-client";
import { Observable } from "rxjs";
// socket.service.ts

@Injectable({
  providedIn: "root",
})
export class SocketService {
  private socket: any;

  constructor() {
    this.socket = io("http://localhost:4000");
  }

  // Add methods for emitting and listening to socket events
  sendMessage(message: string) {
    console.log("====================================");
    console.log(message);
    console.log("====================================");
    this.socket.emit("message", message);
  }

  userJoinedChat(user: any) {
    this.socket.emit("join", user);
    this.socket.on("typing", (user: any) => {
      console.log(user);
    });
  }
  receiveMessage() {
    return new Observable(observer => {
      this.socket.on("message", (data: any) => {
        observer.next(data);
      });
    });
  }
}

import { Component, OnInit, AfterViewInit } from "@angular/core";
import { ChatsService } from "src/app/services/chats/chats.service";
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs";
import io from "socket.io-client";
import { AuthService } from "src/app/services/auth/auth.service";
@Component({
  selector: "app-messenger",
  templateUrl: "./messenger.page.html",
  styleUrls: ["./messenger.page.scss"],
})
export class MessengerPage implements OnInit, AfterViewInit {
  chat: any;
  isLoading: boolean = false;
  message: string = "";
  socket: any;
  constructor(private chatService: ChatsService, private authService: AuthService) {
    this.socket = io("http://localhost:4000");
  }

  ngOnInit() {
    this.chat = this.chatService.getCurrentChat;
    console.log(this.chat);
    this.socket.on("refreshPage", () => {
      this.chat = this.chatService.getCurrentChat;
    });
  }

  onChange(event: any) {}

  onSubmit(form: NgForm) {
    if (!form.valid || this.message === "") {
      return;
    }

    if (this.chat.fakeChat) {
      console.log(this.chat, "Hello this chat ");

      //
      let loggedUserIdObs = new Observable();
      let localUserId;
      loggedUserIdObs = this.authService.userId;
      loggedUserIdObs.subscribe(data => {
        console.log(data, "logged user Data id ");
        localUserId = data;
      });

      ///
      let createChatObs = new Observable();

      let chatInfo = { usersId: [localUserId, this.chat.chatUser[0].id], content: this.message };
      console.log("====================================");
      console.log(chatInfo, "Data to send");
      console.log("====================================");
      createChatObs = this.chatService.createDualChat(chatInfo);

      createChatObs.subscribe({
        error: err => {
          console.log(err);
        },
        next: (res: any) => {
          /*  {
            "chatuser_id": 3,
            "user_id": 1,
            "chat_id": 2,
            "type": "dual"
        } */
          console.log("====================================");
          console.log(res, res.data.chat_id);
          console.log("====================================");
          // let chatId = res.data.chat_id;
          //let sendMessageObs = new Observable();
          // sendMessageObs = this.chatService.sendMessage(this.message, chatId);
          /*   sendMessageObs.subscribe({
            error: err => {
              console.log(err);
            },
            next: data => {
              console.log(this.chat);
              this.socket.emit("refresh", {});
              this.chat = this.chatService.getCurrentChat;
              this.message = "";
            },
          }); */
        },
      });
    }

    //////
    /*   let sendObs = new Observable();
    sendObs = this.chatService.sendMessage(this.message, this.chat.id);
    sendObs.subscribe({
      error: err => {
        console.log(err);
      },
      next: data => {
        console.log(this.chat);
        this.socket.emit("refresh", {});
        this.chat = this.chatService.getCurrentChat;
        this.message = "";
      },
    }); */
  }
  ionViewWillEnter() {
    this.isLoading = true;
    this.chat = this.chatService.getCurrentChat;
    this.isLoading = false;
  }
  ngAfterViewInit() {
    console.log("====================================");
    console.log("Hello");
    console.log("====================================");
  }
}

import { Component, OnInit, AfterViewInit } from "@angular/core";
import { ChatsService } from "src/app/services/chats/chats.service";
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs";
import io from "socket.io-client";
import { AuthService } from "src/app/services/auth/auth.service";
import { SocketService } from "src/app/services/socket/socket.service";
@Component({
  selector: "app-messenger",
  templateUrl: "./messenger.page.html",
  styleUrls: ["./messenger.page.scss"],
})
export class MessengerPage implements OnInit {
  chat: any;
  isLoading: boolean = false;
  message: string = "";
  socket: any;
  constructor(
    private chatService: ChatsService,
    private authService: AuthService,
    private socketService: SocketService,
  ) {
    //this.socket = io("http://localhost:4000");
  }

  ngOnInit() {
    this.isLoading = true;
    /*  this.chatService.getCurrentChat.subscribe(data => {
      this.chat = data;
      this.isLoading = false;
    });
 */
    /*  this.socket.on("refreshPage", () => {
      console.log(this.chat, "Log from socket 🍎🍎");
      this.chatService.getCurrentChat.subscribe(data => {
        console.log(this.chat, "Log from socket 🍎🍎");
        this.chat = data;
      });
    }); */
  }

  onChange(event: any) {}

  onSubmit(form: NgForm) {
    if (!form.valid || this.message === "") {
      return;
    }

    if (this.chat.fakeChat) {
      //

      ///
      let createChatObs = new Observable();

      let chatInfo = { partnerId: this.chat?.chatUser[0]?.id, content: this.message };

      createChatObs = this.chatService.createDualChat(chatInfo);

      createChatObs.subscribe({
        error: err => {
          console.log(err);
        },
        next: (res: any) => {
          this.chatService.getCurrentChat.subscribe(data => {
            this.chat = data;
            console.log("This must be last log", this.chat);
          });
        },
      });

      return;
    }

    //////
    let sendObs = new Observable();
    sendObs = this.chatService.sendMessage(this.message, this.chat.id);
    sendObs.subscribe({
      error: err => {
        console.log(err);
      },
      next: data => {
        console.log(this.chat);
        //this.socket.emit("refresh", {});
        if (data) {
          this.chatService.getCurrentChat.subscribe(data => {
            this.chat = data;
          });
        }

        this.socketService.sendMessage(this.message);
        this.message = "";
      },
    });
  }
  ionViewWillEnter() {
    this.isLoading = true;
    this.chatService.getCurrentChat.subscribe(data => {
      this.chat = data;

      this.isLoading = false;
      console.log(this.chat, "Hello");
    });
  }
}

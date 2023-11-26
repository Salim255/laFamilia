import { Component, OnInit } from "@angular/core";
import { ChatsService } from "src/app/services/chats/chats.service";
import { NgForm } from "@angular/forms";
@Component({
  selector: "app-messenger",
  templateUrl: "./messenger.page.html",
  styleUrls: ["./messenger.page.scss"],
})
export class MessengerPage implements OnInit {
  chat: any;
  isLoading: boolean = false;
  message: string = "";
  constructor(private chatService: ChatsService) {}

  ngOnInit() {
    this.chat = this.chatService.getCurrentChat;
    console.log(this.chat);
  }

  onChange(event: any) {
    console.log("hello");
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.chatService.sendMessage(this.message);
  }
  ionViewWillEnter() {
    this.isLoading = true;
    this.chat = this.chatService.getCurrentChat;
    this.isLoading = false;
    console.log("====================================");
    console.log(this.chat);
    console.log("====================================");
  }
}

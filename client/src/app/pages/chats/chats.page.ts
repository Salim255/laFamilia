import { Component, OnInit } from "@angular/core";
import { ChatsService } from "../../services/chats/chats.service";

@Component({
  selector: "app-chats",
  templateUrl: "./chats.page.html",
  styleUrls: ["./chats.page.scss"],
})
export class ChatsPage implements OnInit {
  isLoading: boolean = false;
  chats!: any;
  constructor(private chatService: ChatsService) {}

  ngOnInit() {
    this.chatService.getChats.subscribe(chats => {
      this.chats = chats;
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.chatService.fetchChats().subscribe(chats => {
      this.isLoading = false;
    });
  }
}

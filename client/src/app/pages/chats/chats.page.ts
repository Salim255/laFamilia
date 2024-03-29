import { Component, OnInit } from "@angular/core";
import { ChatsService } from "../../services/chats/chats.service";
import { SocketService } from "src/app/services/socket/socket.service";
import { Route, Router } from "@angular/router";

@Component({
  selector: "app-chats",
  templateUrl: "./chats.page.html",
  styleUrls: ["./chats.page.scss"],
})
export class ChatsPage implements OnInit {
  isLoading: boolean = false;
  chats!: any;
  searchTerm: string = "";
  showClearBtn: boolean = false;
  constructor(
    private chatService: ChatsService,
    private router: Router,
    private socketService: SocketService,
  ) {}

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

  addChat() {
    this.router.navigateByUrl("/tabs/profiles");
  }
  openChat(item: any) {
    if (item) {
      console.log("====================================");
      console.log(item);
      console.log("====================================");
      this.chatService.setCurrentChat(item);
      this.socketService.userJoinedChat(item?.chatuser[0]);
      this.router.navigateByUrl("/tabs/messenger");
    }
  }

  clearSearch() {
    this.searchTerm = "";
    this.showClearBtn = false;
  }

  onInputChange(event: any): void {
    // Access the changed value using event.target.value
    this.searchTerm = event.target.value;
    if (this.searchTerm.length > 0) {
      this.showClearBtn = true;
    } else {
      this.showClearBtn = false;
    }
  }
}

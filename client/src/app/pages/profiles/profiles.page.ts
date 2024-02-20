import { Component, OnInit } from "@angular/core";
import { ProfilesService } from "src/app/services/profile/profile.service";
import { ChatsService } from "src/app/services/chats/chats.service";
import { Router } from "@angular/router";
interface Profile {
  id: number;
  first_name: string;
  last_name: string;
  photo: string;
}
@Component({
  selector: "app-profiles",
  templateUrl: "./profiles.page.html",
  styleUrls: ["./profiles.page.scss"],
})
export class ProfilesPage implements OnInit {
  profiles: any = null;
  searchTerm: string = "";
  showClearBtn: boolean = false;
  constructor(
    private profileService: ProfilesService,
    private router: Router,
    private chatService: ChatsService,
  ) {}

  ngOnInit() {
    this.profileService.getProfiles.subscribe(data => {
      this.profiles = data;
    });
  }

  ionViewWillEnter() {
    this.profileService.fetchProfiles().subscribe(data => {});
  }
  onCreateDualChat(item: Profile) {
    let fakeChat = {
      id: item.id,
      type: "dual",
      messages: null,
      chatuser: [{ id: item.id }],
      users: [
        {
          id: item.id,
          first_name: item.first_name,
          last_name: item.last_name,
          photo: null,
        },
      ],
      fakeChat: true,
    };
    this.chatService.setCurrentChat(fakeChat);
    this.router.navigateByUrl("/tabs/messenger", { replaceUrl: true });
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

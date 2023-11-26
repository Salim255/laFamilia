import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { TabsPage } from "./tabs.page";

const routes: Routes = [
  {
    path: "",
    component: TabsPage,
    children: [
      {
        path: "home",
        loadChildren: () => import("../home/home.module").then(m => m.HomePageModule),
      },
      {
        path: "chats",
        loadChildren: () => import("../chats/chats.module").then(m => m.ChatsPageModule),
      },
      {
        path: "account",
        loadChildren: () => import("../account/account.module").then(m => m.AccountPageModule),
      },
    ],
  },

  {
    path: "messenger",
    loadChildren: () => import("../messenger/messenger.module").then(m => m.MessengerPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}

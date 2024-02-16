import {Route, Routes} from '@angular/router';
import {AppComponent} from "./app.component";
import {MatchComponent} from "./match/match.component";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () => import("./home/home.component").then(m => m.HomeComponent)
  },
  {
    path: "match/:id",
    loadComponent: () => import("./match/match.component").then(m => m.MatchComponent)
  },

  {
    path: "team/:id",
    loadComponent: () => import("./team/team.component").then(m => m.TeamComponent)
  },

  {
    path: "player/:id",
    loadComponent: () => import("./player/player.component").then(m => m.PlayerComponent)
  }
];

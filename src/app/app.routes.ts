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
  },

  {
    path: "matches",
    loadComponent: () => import("./matches/matches.component").then(m => m.MatchesComponent)
  },

  {
    path: "players",
    loadComponent: () => import("./players/players.component").then(m => m.PlayersComponent)
  },

  {
    path: "injuries",
    loadComponent: () => import("./injuries/injuries.component").then(m => m.InjuriesComponent)
  },

  {
    path: "**",
    pathMatch: "full",
    loadComponent: () => import("./not-found/not-found.component").then(m => m.NotFoundComponent)
  }
];

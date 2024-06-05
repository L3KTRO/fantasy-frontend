import {Component, OnInit} from '@angular/core';
import {FormationComponent} from "../components/formation/formation.component";
import {HeaderComponent} from "../components/header/header.component";
import {MatchFieldComponent} from "../components/match-field/match-field.component";
import {PlayerFieldComponent} from "../components/player/player-field/player-field.component";
import {ConnectBackendService} from "../connect-backend.service";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {Match, Player} from "../../data/types";
import {map, Observable} from "rxjs";

@Component({
  selector: 'home',
  standalone: true,
  imports: [
    FormationComponent,
    HeaderComponent,
    MatchFieldComponent,
    PlayerFieldComponent,
    AsyncPipe,
    NgIf,
    NgForOf,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  idealFormation: Observable<Player[]> = this.backService.getTeamPlayers(15);
  matches = this.getMatches()
  players = this.getBestPlayers()

  constructor(public backService: ConnectBackendService) {
  }


  getMatches() {
    let matches: Match[] = [];

    this.backService.getMatches().subscribe(data => {
      const filteredMatches = data
        .filter(match => match.matchState == 7)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      for (let i = 0; i < 5 && i < filteredMatches.length; i++) {
        matches.push(filteredMatches[i]);
      }
    });

    return matches;
  }

  getBestPlayers() {
    let players: Player[] = [];

    this.backService.getPlayers().subscribe(data => {
      const sortedPlayer = data
        .sort((a, b) => b.points - a.points);
      for (let i = 0; i < 5 && i < sortedPlayer.length; i++) {
        players.push(sortedPlayer[i]);
      }
    });

    return players;
  }
}

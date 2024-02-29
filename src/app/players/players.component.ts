import { Component } from '@angular/core';
import {HeaderComponent} from "../components/header/header.component";
import {Player} from "../../data/types";
import {ConnectBackendService} from "../connect-backend.service";
import {MatchFieldComponent} from "../components/match-field/match-field.component";
import {NgForOf} from "@angular/common";
import {PlayerFieldComponent} from "../components/player/player-field/player-field.component";

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [
    HeaderComponent,
    MatchFieldComponent,
    NgForOf,
    PlayerFieldComponent
  ],
  templateUrl: './players.component.html',
  styleUrl: './players.component.scss'
})
export class PlayersComponent {
  playersChunked = this.getBestPlayers();

  constructor(private backService: ConnectBackendService) {
  }

  getBestPlayers() {
    let players: Player[] = [];
    let chunked: Player[][] = [];

    this.backService.getPlayers().subscribe(data => {
      const sortedPlayer = data
        .sort((a, b) => b.points - a.points);
      for (let i = 0; i < 15 && i < sortedPlayer.length; i++) {
        players.push(sortedPlayer[i]);
      }

      const chunkSize = 5;
      for (let i = 0; i < players.length; i += chunkSize) {
        const chunk = players.slice(i, i + chunkSize);
        chunked.push(chunk);
      }
    });

    return chunked;
  }

}

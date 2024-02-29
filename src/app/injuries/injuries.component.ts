import { Component } from '@angular/core';
import {ConnectBackendService} from "../connect-backend.service";
import {Player} from "../../data/types";
import {HeaderComponent} from "../components/header/header.component";
import {NgForOf} from "@angular/common";
import {PlayerFieldComponent} from "../components/player/player-field/player-field.component";

@Component({
  selector: 'app-injuries',
  standalone: true,
  imports: [
    HeaderComponent,
    NgForOf,
    PlayerFieldComponent
  ],
  templateUrl: './injuries.component.html',
  styleUrl: './injuries.component.scss'
})
export class InjuriesComponent {
  playersChunked = this.getInjuriesPlayers();

  constructor(private backService: ConnectBackendService) {
  }

  getInjuriesPlayers() {
    let players: Player[] = [];
    let chunked: Player[][] = [];

    this.backService.getPlayers().subscribe(data => {
      const sortedPlayer = data
        .filter((player) => player.playerStatus == "INJURED")
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

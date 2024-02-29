import { Component } from '@angular/core';
import {HeaderComponent} from "../components/header/header.component";
import {ConnectBackendService} from "../connect-backend.service";
import {Match} from "../../data/types";
import {MatchFieldComponent} from "../components/match-field/match-field.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-matches',
  standalone: true,
  imports: [
    HeaderComponent,
    MatchFieldComponent,
    NgForOf
  ],
  templateUrl: './matches.component.html',
  styleUrl: './matches.component.scss'
})
export class MatchesComponent {
  matchesChunked = this.getMatches()

  constructor(public backService: ConnectBackendService) {
  }


  getMatches() {
    let matches: Match[] = [];
    let chunked: Match[][] = [];

    this.backService.getMatches().subscribe(data => {
      const filteredMatches = data
        .filter(match => match.matchState == 1)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      for (let i = 0; i < 15 && i < filteredMatches.length; i++) {
        matches.push(filteredMatches[i]);
      }
      const chunkSize = 5;
      for (let i = 0; i < matches.length; i += chunkSize) {
        const chunk = matches.slice(i, i + chunkSize);
        chunked.push(chunk);
      }
    });

    return chunked;
  }
}

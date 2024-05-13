import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterOutlet} from "@angular/router";
import {HeaderComponent} from "../components/header/header.component";
import {FormationComponent} from "../components/formation/formation.component";
import {TeamFieldComponent} from "../components/team/team-field/team-field.component";
import {Observable, Subscription} from "rxjs";
import {ConnectBackendService} from "../connect-backend.service";
import {Match, Player} from "../../data/types";

@Component({
  selector: 'match',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FormationComponent,
    TeamFieldComponent
  ],
  templateUrl: './match.component.html',
  styleUrl: './match.component.scss'
})
export class MatchComponent implements OnInit {
  matchId = Number(this.route.snapshot.paramMap.get('id'));
  match!: Match;
  localPlayers!: Observable<Player[]>;
  visitorPlayers!: Observable<Player[]>;

  constructor(private route: ActivatedRoute, private backService: ConnectBackendService) {}

  ngOnInit() {
    this.backService.getMatch(this.matchId).subscribe(data => {
      this.match = data;
      this.localPlayers = this.backService.getTeamPlayers(this.match.local.id);
      this.visitorPlayers = this.backService.getTeamPlayers(this.match.visitor.id);
    });
  }

  get local() {
    return this.match?.local
  }

  get visitor() {
    return this.match?.visitor
  }

}

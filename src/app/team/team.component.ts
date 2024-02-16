import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "../components/header/header.component";
import {ActivatedRoute} from "@angular/router";
import {ConnectBackendService} from "../connect-backend.service";
import {Player, Team} from "../../data/types";
import {FormationComponent} from "../components/formation/formation.component";
import {NgForOf} from "@angular/common";
import {PlayerFieldComponent} from "../components/player/player-field/player-field.component";
import {Observable, switchMap} from "rxjs";

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [
    HeaderComponent,
    FormationComponent,
    NgForOf,
    PlayerFieldComponent
  ],
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss'
})
export class TeamComponent implements OnInit {
  teamId!: number
  team!: Team;
  playersObs!: Observable<Player[]>;
  playersToBest!: Player[];
  playersToValue!: Player[];

  constructor(private route: ActivatedRoute, private backService: ConnectBackendService) {
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => {
        this.teamId = Number(params.get('id'));
        this.playersObs = this.backService.getTeamPlayers(this.teamId);
        return this.backService.getTeam(this.teamId);
      })
    ).subscribe(data => {
      this.team = data;
      this.playersObs.subscribe(data => {
        this.playersToBest = data.sort((a, b) => b.points - a.points).slice(0, 5);
        this.playersToValue = data.sort((a, b) => {
          let valueByDolar = (points: number, value: number) => points / value;
          return valueByDolar(b.points, b.marketValue) - valueByDolar(a.points, a.marketValue);
        }).slice(0, 5);
      });
    })
  }

}

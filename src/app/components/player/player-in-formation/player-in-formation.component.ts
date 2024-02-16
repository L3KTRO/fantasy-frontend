import {Component, Input, OnInit} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {Player, Team} from "../../../../data/types";
import {Observable} from "rxjs";
import {ConnectBackendService} from "../../../connect-backend.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'player-in-formation',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './player-in-formation.component.html',
  styleUrl: './player-in-formation.component.scss'
})
export class PlayerInFormationComponent implements OnInit {
  @Input() player!: Player;
  team!: Team;

  constructor(public backService: ConnectBackendService) {}

  ngOnInit() {
    this.backService.getTeam(this.player.teamId).subscribe(data => this.team = data);
    this.backService.getPlayer(Number(this.player.id)).subscribe(data => this.player = data);
  }

  get id() {
    return this.player.id
  }

  get nick() {
    return this.player ? this.player.nickname : 'ERROR';
  }

  get points() {
    return this.player.stats ?
      this.player.points
      : this.player.points;
  }

  get teamLogo(){
    return this.team ? this.team.badgeColor : 'ERROR'
  }

  get photo(){
    return this.backService.getPlayerPhoto(Number(this.player.id))
  }
}

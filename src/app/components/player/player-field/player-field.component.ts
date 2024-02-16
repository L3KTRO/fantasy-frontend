import {Component, Input, OnInit} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {Player, Team} from "../../../../data/types";
import {ConnectBackendService} from "../../../connect-backend.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'player-field',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './player-field.component.html',
  styleUrl: './player-field.component.scss'
})
export class PlayerFieldComponent implements OnInit {
  @Input() player!: Player
  team!: Team;

  constructor(public backService: ConnectBackendService) {
  }

  ngOnInit() {
    this.backService.getTeam(this.player?.teamId).subscribe(team => {
      this.team = team;
    });
  }

  get id() {
    return this.player.id
  }

  get teamName() {
    return this.team?.name
  }

  get name() {
    return this.player.nickname
  }

  get points() {
    return this.player.points
  }

  get photo(){
    return this.backService.getPlayerPhoto(Number(this.player.id))
  }
}

import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HeaderComponent} from "../components/header/header.component";
import {NgOptimizedImage} from "@angular/common";
import {ConnectBackendService} from "../connect-backend.service";
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs";
import {Player, PlayerStats, Team} from "../../data/types";
import {TeamFieldComponent} from "../components/team/team-field/team-field.component";
import {Chart} from 'chart.js/auto';
import _default from "chart.js/dist/plugins/plugin.tooltip";
import type = _default.defaults.animations.numbers.type;


@Component({
  selector: 'app-player',
  standalone: true,
  imports: [
    HeaderComponent,
    NgOptimizedImage,
    TeamFieldComponent
  ],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent implements OnInit {
  player!: Player;
  team!: Team;
  @ViewChild('valueChart') valueChart!: ElementRef;
  @ViewChild('pointsChart') pointsChart!: ElementRef;

  daynumber!: number

  constructor(private route: ActivatedRoute, private backService: ConnectBackendService) {
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => {
        let playerId = Number(params.get('id'));
        return this.backService.getPlayer(playerId);
      })
    ).subscribe(data => {
      this.player = data;
      this.daynumber = this.player.stats.length - 1;
      this.backService.getTeam(this.player.teamId).subscribe(team => {
        this.team = team;
      })
    })
  }

  get stat() {
    console.log(this.player.stats[this.daynumber].stats)
    return this.player.stats[this.daynumber]
  }

  get value() {
    return this.player.marketValue
  }

  get name() {
    return this.player.name
  }

  get playerImage() {
    return this.backService.getPlayerPhoto(Number(this.player?.id))
  }
}

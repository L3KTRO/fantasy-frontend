import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HeaderComponent} from "../components/header/header.component";
import {NgOptimizedImage} from "@angular/common";
import {ConnectBackendService} from "../connect-backend.service";
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs";
import {Player, Team} from "../../data/types";
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
export class PlayerComponent implements OnInit, AfterViewInit {
  player!: Player;
  team!: Team;
  @ViewChild('valueChart') valueChart!: ElementRef;
  @ViewChild('pointsChart') pointsChart!: ElementRef;


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
      this.backService.getTeam(this.player.teamId).subscribe(team => {
        this.team = team;
      })
    })
  }

  ngAfterViewInit() {
    this.charting();
  }

  charting() {
    let marketValues = this.player.historicalMarket.map(value => value.marketValue);
    let points = this.player.stats.map(value => value.totalPoints);
    let dates = this.player.historicalMarket.map(value =>
      new Date(value.date).toLocaleDateString()
    );


    let listas = this.backService.prepararListas([marketValues, points]);
    let stepSize = 8

    let ctx = this.valueChart?.nativeElement.getContext('2d');
    new Chart(ctx, {
      type: "line",
      data: {
        labels: dates,
        datasets: [
          {
          label: 'Coso 1',
          data: listas[0],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        },
          {
            label: 'Coso 2',
            data: listas[1],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: false,
            min: Math.min(...marketValues) - stepSize, // 10 less than the smallest value
            max: Math.max(...marketValues) + stepSize,
            ticks: {
              stepSize: stepSize
            },
            grid: {
              display: true
            }
          }
        }
      }
    });

  }

  get pointsByDolar() {
    return Math.floor(this.value / this.lastStat.totalPoints).toLocaleString("es-ES")
  }

  get lastStat() {
    return this.player.stats[this.player.stats.length - 1]
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

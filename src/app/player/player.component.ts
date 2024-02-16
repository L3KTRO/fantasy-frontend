import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HeaderComponent} from "../components/header/header.component";
import {NgOptimizedImage} from "@angular/common";
import {ConnectBackendService} from "../connect-backend.service";
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs";
import {Player, Team} from "../../data/types";
import {TeamFieldComponent} from "../components/team/team-field/team-field.component";
import { Chart } from 'chart.js/auto';
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

  ngAfterViewInit(){
    this.charting();
  }

  charting(){
    let marketValues = this.player.historicalMarket.map(value => value.marketValue);
    let dates = this.player.historicalMarket.map(value =>
      new Date(value.date).toLocaleDateString()
    );

    let minValue = Math.min(...marketValues);
    let maxValue = Math.max(...marketValues);
    let range = maxValue - minValue;
    let desiredTicks = 8;
    let stepSize = range / (desiredTicks);

    let ctx = this.valueChart?.nativeElement.getContext('2d');
    new Chart(ctx, {
      type: "line",
      data: {
        labels: dates,
        datasets: [{
          label: 'Valor de mercado',
          data: marketValues,
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

    let points = this.player.stats.map(stat => stat.totalPoints);
    let weeks = this.player.stats.map(stat => stat.weekNumber).sort((a, b) => a - b);
    let ctx2 = this.pointsChart?.nativeElement.getContext('2d');
    new Chart(ctx2, {
      type: "line",
      data: {
        labels: weeks,
        datasets: [{
          label: 'Puntos',
          data: points,
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
            min: 0, // 5 less than the smallest value
            max: Math.max(...points) + 1,
            ticks: {
              stepSize: 5
            },
            grid: {
              display: true
            }
          }
        }
      }
    });

  }

  get pointsByDolar(){
    return Math.floor(this.value / this.lastStat.totalPoints).toLocaleString("es-ES")
  }

  get lastStat(){
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

import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit} from '@angular/core';
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {PlayerInFormationComponent} from "../player/player-in-formation/player-in-formation.component";
import {Player} from "../../../data/types";
import {Observable} from "rxjs";

@Component({
  selector: 'formation',
  standalone: true,
  imports: [
    NgOptimizedImage,
    PlayerInFormationComponent,
    NgForOf
  ],
  templateUrl: './formation.component.html',
  styleUrl: './formation.component.scss',
})
export class FormationComponent implements OnChanges {
  @Input() players!: Observable<Player[]>;
  @Input() formation!: [number, number, number]; // [4, 3, 3]
  players_split!: [Player[], Player[], Player[], Player[]];

  ngOnChanges() {
    this.players.subscribe(data => {
      let goalkeepers = data.filter(player => player.positionId == 1).sort((a, b) => b.points - a.points);
      let defenders = data.filter(player => player.positionId == 2).sort((a, b) => b.points - a.points);
      let midfielders = data.filter(player => player.positionId == 3).sort((a, b) => b.points - a.points);
      let forwards = data.filter(player => player.positionId == 4).sort((a, b) => b.points - a.points);
      this.players_split = [
        goalkeepers.slice(0, 1),
        defenders.slice(0, this.formation[0]),
        midfielders.slice(0, this.formation[1]),
        forwards.slice(0, this.formation[2])
      ];
    });

  }


}

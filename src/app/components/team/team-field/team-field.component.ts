import {Component, Input} from '@angular/core';
import {Team} from "../../../../data/types";
import {NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'team-field',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './team-field.component.html',
  styleUrl: './team-field.component.scss'
})
export class TeamFieldComponent {
  @Input() team!: Team

  constructor() {}

  get badge() {
    return this.team.badgeColor
  }

  get id() {
    return this.team?.id
  }

  get name() {
    return this.team.name
  }
}

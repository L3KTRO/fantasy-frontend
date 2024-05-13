import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {Match, Team} from "../../../data/types";
import {RouterLink, RouterOutlet} from "@angular/router";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {ConnectBackendService} from "../../connect-backend.service";

@Component({
  selector: 'match-field',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './match-field.component.html',
  styleUrl: './match-field.component.scss'
})
export class MatchFieldComponent implements OnInit {
  @Input() match!: Match
  local!: Team
  visitor!: Team

  constructor(private backService: ConnectBackendService) {
  }

  ngOnInit(): void {
    this.backService.getTeam(this.match.local.id).subscribe(team => this.local = team)
    this.backService.getTeam(this.match.visitor.id).subscribe(team => this.visitor = team)
  }

  get matchId() {
    return this.match.id
  }

  get localLogo(): SafeUrl {
    return this.local?.badgeColor
  }

  get visitorLogo(): SafeUrl {
    return this.visitor.badgeColor
  }

  get localShortName() {
    return this.local?.shortName
  }

  get visitorShortName() {
    return this.visitor?.shortName
  }

  get localName() {
    return this.local.name
  }

  get visitorName() {
    return this.visitor.name
  }

  get localScore() {
    return this.match.localScore
  }

  get visitorScore() {
    return this.match.visitorScore
  }

  get date() {
    let date = new Date(this.match.date)
    return ('0' + date.getDate()).slice(-2) + '/'
      + ('0' + (date.getMonth() + 1)).slice(-2)
  }

  get time() {
    let date = new Date(this.match.date)
    return date.toLocaleTimeString()
  }

}

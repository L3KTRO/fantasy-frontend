import { Component } from '@angular/core';
import {ConnectBackendService} from "../../connect-backend.service";
import {Team} from "../../../data/types";
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'up-header',
  standalone: true,
  imports: [
    NgForOf,
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent{
  api = this.backService.getTeams();
  teams!: Team[];

  constructor(public backService: ConnectBackendService) {
    this.api.subscribe(data => {
      this.teams = data;
    });
  }

}

import {Component, inject, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterModule, RouterOutlet} from '@angular/router';
import {HeaderComponent} from "./components/header/header.component";
import {FormationComponent} from "./components/formation/formation.component";
import {PlayerFieldComponent} from "./components/player/player-field/player-field.component";
import {MatchFieldComponent} from "./components/match-field/match-field.component";
import {ConnectBackendService} from "./connect-backend.service";
import {HomeComponent} from "./home/home.component";
import {MatchComponent} from "./match/match.component";
import {routes} from "./app.routes";
import {BrowserModule} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    HeaderComponent,
    FormationComponent,
    PlayerFieldComponent,
    MatchFieldComponent,
    HomeComponent,
    MatchComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ngDIW';

}

import { Component } from '@angular/core';
import {HeaderComponent} from "../components/header/header.component";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [
    HeaderComponent,
    NgOptimizedImage
  ],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {

}

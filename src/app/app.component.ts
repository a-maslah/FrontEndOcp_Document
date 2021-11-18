import {Component, OnInit} from '@angular/core';
import {TokenService} from "./services/security/token.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FrontEndStage';
  public select: boolean = false;

}


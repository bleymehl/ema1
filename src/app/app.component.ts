import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet,IonSpinner } from '@ionic/angular/standalone';
import { GetdataService } from './services/getdata.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, IonSpinner, CommonModule],
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(public getDataService: GetdataService) {}
}

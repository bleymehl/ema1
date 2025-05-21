import { Component } from '@angular/core';
import { IonButtons, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonButton, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent],
})
export class Tab1Page {
  constructor() {

    let a = 100;
    let b = a;
    console.log(a, b);

    a = 120;
    console.log(a, b);

    let objA = { name: "Anna" }
    console.log(objA.name);

    let objB = objA;
    console.log(objB);

    objB.name="Jörg";
console.log(objA, objB);

  }
}

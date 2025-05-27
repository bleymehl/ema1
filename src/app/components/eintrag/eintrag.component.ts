import { Component, Input, OnInit } from '@angular/core';
import { EintragData } from '../../services/getdata.service';
import { CommonModule } from '@angular/common';
import { IonIcon, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem, IonButton } from '@ionic/angular/standalone';


@Component({
  selector: 'app-eintrag',
  templateUrl: './eintrag.component.html',
  styleUrls: ['./eintrag.component.scss'],
  imports: [CommonModule, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonIcon, IonItem, IonButton],
  standalone: true,
})
export class EintragComponent  implements OnInit {
  @Input() eintrag: EintragData = {} as EintragData;
    myTitel = '';
  myBeschreibung = '';


  constructor() { 

  }

  ngOnInit() {
    // Hier kann Logik hinzugefügt werden, die beim Initialisieren der Komponente ausgeführt werden soll
    this.myTitel = this.eintrag.titel;
    this.myBeschreibung = "";
  }

}

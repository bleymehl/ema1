import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { GetdataService, EintragData } from '../services/getdata.service';
import { EintragComponent } from '../components/eintrag/eintrag.component';
import { addIcons } from 'ionicons';
import { happyOutline, timeOutline, heartOutline, heart, star, time } from 'ionicons/icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [EintragComponent,CommonModule,IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonHeader, IonToolbar, IonTitle, IonContent]
})
export class Tab2Page {

  constructor(public getdataservice: GetdataService, private router: Router) {
    addIcons({timeOutline, happyOutline, heartOutline, heart, star, time});
  }

  zeigeEintrag(item: EintragData) {
    // Hier wird der Eintrag angezeigt, z.B. durch Navigation zu einer Detailseite
    this.router.navigate(['/eintrag-details', item.id, item.termin_id]);
  }

}

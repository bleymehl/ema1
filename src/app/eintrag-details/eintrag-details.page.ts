import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButtons, IonBackButton, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { GetdataService, EintragData } from '../services/getdata.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-eintrag-details',
  templateUrl: './eintrag-details.page.html',
  styleUrls: ['./eintrag-details.page.scss'],
  standalone: true,
  imports: [IonButtons, IonBackButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})

export class EintragDetailsPage implements OnInit {

  id: string = '';
  termin_id: string = '';
  eintrag: EintragData = {} as EintragData; // Initialisierung mit leerem Objekt



  constructor(private getDataService: GetdataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
    this.termin_id = this.route.snapshot.paramMap.get('termin_id') ?? '';
    // Eintrag anhand der ID suchen
   // this.eintrag = this.getDataService.data.find(item => item.id === this.id && item.termin_id === this.termin_id)!;
    this.eintrag = this.getDataService.data.find(item => item.id === this.id && item.termin_id === this.termin_id)!;
    this.eintrag.titel = "geändert";
    console.log(this.getDataService.data);
    console.log('Eintrag Details:', this.eintrag);
  }

}

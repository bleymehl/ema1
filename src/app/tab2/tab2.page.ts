import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonSearchbar, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonHeader, IonToolbar, IonTitle, IonContent, IonButton,
  IonSegmentButton, IonSegment, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent
} from '@ionic/angular/standalone';
import { GetdataService, EintragData } from '../services/getdata.service';
import { EintragComponent } from '../components/eintrag/eintrag.component';
import { addIcons } from 'ionicons';
import { searchOutline, happyOutline, timeOutline, heartOutline, heart, star, time, informationCircleOutline } from 'ionicons/icons';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [FormsModule, EintragComponent, CommonModule, IonInfiniteScroll, IonInfiniteScrollContent, IonButton,
    IonSearchbar, IonSegmentButton, IonSegment, IonIcon, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonHeader, IonToolbar, IonTitle, IonContent]
})
export class Tab2Page {

  visibleEntries = 30; // Anzahl der aktuell sichtbaren Einträge
  increment = 30; // Anzahl der Einträge, die pro Klick nachgeladen werden

  lastBeginn: string = '';  // Verfolgt den letzten Wert von "beginn"
  segmentLabel: string = 'Komplett'; // Standardtext für das Textfeld
  showSearch: boolean = false; // Steuert die Sichtbarkeit des Suchfeldes
  selectedSegment: string = 'Komplett'; // Aktuell ausgewähltes Segment
  contentSelector: string = 'Komplett'; // Aktuell ausgewählter Inhalt

  constructor(public getdataservice: GetdataService, private router: Router) {
    addIcons({ informationCircleOutline, searchOutline, timeOutline, happyOutline, heartOutline, heart, star, time });
    this.ladeMehrDaten(); // Initiale Daten laden
  }

  zeigeEintrag(item: EintragData) {
    // Hier wird der Eintrag angezeigt, z.B. durch Navigation zu einer Detailseite
    this.router.navigate(['/eintrag-details', item.id, item.termin_id]);
  }

  setEintraege() {
  }

  onSearchInput(event: any) {

  }

  openInfo() {
    // Hier wird die Info-Seite geöffnet, z.B. durch Navigation zu einer Info-Se
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;
  }

  // Methode zur Aktualisierung des Textes im Textfeld
  setSegmentLabel(label: string) {
    //console.log('setSegmentLabel', label);
    this.segmentLabel = label;
    this.contentSelector = label;
  }


  ladeMehrDaten(event?: any) {
    // Überprüfe, ob noch mehr Einträge angezeigt werden können
    if (this.visibleEntries >= this.getdataservice.data.length) {
      event.target.disabled = true; // Deaktiviere den Infinite-Scroll
      event.target.complete(); // Beende den Ladeprozess
      return; // Keine weiteren Aktionen durchführen
    }

    setTimeout(() => {
      this.visibleEntries += this.increment;
      event.target.complete();

      // Deaktiviere infinite-scroll, wenn alle Einträge angezeigt werden
      if (this.visibleEntries >= this.getdataservice.data.length) {
        event.target.disabled = true;
      }
    }, 500); // Simulierte Ladezeit
  }

  // Funktion für das Setzen des aktuellen Beginndatums
  setBeginn(eintrag: EintragData, index: number): boolean {
    // Wenn es sich um das erste Element oder ein neues Beginndatum handelt
    if (index === 0 || eintrag.beginn !== this.lastBeginn) {
      this.lastBeginn = eintrag.beginn; // Setze den Wert des aktuellen Beginndatums
      return true; // Zeige das Beginndatum an
    }
    return false; // Andernfalls das Beginndatum nicht anzeigen
  }

}

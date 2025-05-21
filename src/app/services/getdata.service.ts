import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular'; // *****
import CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

// Datenstruktur für die eingehenden Daten

export interface EintragData {
  id: string;
  termin_id: string;
  titel: string;
  beschreibung: string; // mit HTML-Tags!?
  beginn: string; //"2025-06-20T16:00:00",
  ende: string; //"2025-06-20T16:00:00",
  ort: string;
  ort_id: string;
  adresse: string;
  einrichtung: string;
  verantwortlich: string;
  format: string;
  themen: string;
  kinder: boolean;
  barrierefrei: boolean;
  english: boolean;
  favorit: boolean;
}

interface OrteData {
  ort_id: string;
  karte: number;
  google_link: string;
}

export interface Favorit {
  id: string;
  termin_id: string;
}


@Injectable({
  providedIn: 'root'
})

export class GetdataService {

  // Data als Array von EintragData
  data: EintragData[] = [];
  // Orte als Array von OrteData
  orte: OrteData[] = [];
  // Favoriten als Array von Favorit
  favoriten: Favorit[] = [];

  counter = 0;

  constructor(private storage: Storage) {
    // Storage initialisieren
    this.init().then(() => { 
      console.log('Init beendet');    
      this.loadData().then(() => {
        // in allen Daten "beginn" und "ende" die darin enthaltene Uhrzeit extrahieren und beginn und ende darauf setzen, die Minuten, die kleiner 10
        // sind, mit einer 0 auffuellen
        console.log('Daten geladen:', this.data);
        this.data.forEach(item => {
          const begin = new Date(item.beginn);
          const end = new Date(item.ende);
          item.beginn = `${begin.getHours()}:${begin.getMinutes() < 10 ? '0' + begin.getMinutes() : begin.getMinutes()}`;
          item.ende = `${end.getHours()}:${end.getMinutes() < 10 ? '0' + end.getMinutes() : end.getMinutes()}`;
        }       
        );
        this.storage.set('data', this.data);
        this.toogleFavorit(this.data[0].id, this.data[0].termin_id);
        console.log('Favoriten:', this.favoriten);
        console.log('isFavorit:', this.isFavorit(this.data[0].id, this.data[0].termin_id));
      });
    }
    );
  }

  // Storage initialisieren
  async init() {
    console.log('Init Storage');
    await this.storage.defineDriver(CordovaSQLiteDriver);
    await this.storage.create();

    this.favoriten = await this.storage.get('favoriten') || [];
    console.log('Favoriten geladen:', this.favoriten);
  }

  async loadData() {
    // Die Daten über eine API laden, im Falle eines Fehlers die Daten aus dem Storage laden
    try {
      const response = await fetch('https://www.wissen-in-leipzig.de/json-export/');
      //const response = await fetch('./assets/lndw.json');

      const zwi = await response.json();
      this.data = zwi.data;
      this.orte = zwi.orte;
    } catch (error) {
      console.error('Fehler beim Laden der Daten:', error);
    }
  }

  toogleFavorit(id:string, termin_id: string) {
    // Überprüfen, ob der Eintrag bereits in den Favoriten ist
    const index = this.favoriten.findIndex(f => f.id === id && f.termin_id === termin_id);

    if (index > -1) {
      // Wenn der Eintrag bereits in den Favoriten ist, entfernen
      this.favoriten.splice(index, 1);
    } else {
      // Wenn der Eintrag nicht in den Favoriten ist, hinzufügen
      this.favoriten.push({ id, termin_id });
    }

    // Die aktualisierten Favoriten im Storage speichern
    this.storage.set('favoriten', this.favoriten);
  }

  isFavorit(id: string, termin_id: string): boolean {
    // Überprüfen, ob der Eintrag in den Favoriten ist
    return this.favoriten.some(f => f.id === id && f.termin_id === termin_id);
  }

  incrementCounter() {
    this.counter++;
  }

  decrementCounter() {
    this.counter--;
  }
}

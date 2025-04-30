import { Injectable } from '@angular/core';

// Datenstruktur für die eingehenden Daten

interface EintragData {
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

@Injectable({
  providedIn: 'root'
})

export class GetdataService {

  // Data als Array von EintragData
  data: EintragData[] = [];
  // Orte als Array von OrteData
  orte: OrteData[] = [];

  counter = 0;

  constructor() {
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
    });
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

  incrementCounter() {
    this.counter++;
  }

  decrementCounter() {
    this.counter--;
  }
}

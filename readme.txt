Wir wollen eine einfache Anwendung erstellen, die die Daten für die "Lange Nacht der Wissenschaften" über die Webseiten-API abfragt und erst mal in einer einfachen Liste darstellt. 

Dazu erstellen Sie ein neues Ionic-Project im Standalone-Modus mit dem Tab-Template. Starten Sie die Anwendung (nach Wechsel in das Verzeichnis) mit ionic serve
Sie haben folgende Verzeichnisse in src/app:
tabs
tab1 - tab3
explore-container

tab1 - tab3 enthalten die Seiten, die nach Klick auf die einzelnen Tabs angezeigt werden, tabs enthält die Gestaltung und Funktionalität der Tabs selbst.

Ändern Sie die Beschriftungen der Tabs wie folgt:
tab1 -> Start
tab2 -> Programm
tab3 -> Favoriten

Suchen Sie sich passende Icons aus:
https://ionic.io/ionicons


Um die Daten später zu laden und zentral in der App verfügbar zu machen, legen wir einen Service an:

ionic generate service services/getdata

bzw.
ionic g s services/getdata

Um diesen Service zu nutzen, müssen wir ihn in den jeweiligen Komponenten importieren und injizieren.
Importiert wird er, indem in der entsprechenden TS-Datei (z.B. tab2.page.ts) folgende Zeile oben ergänzt wird:

import { GetdataService } from '../services/getdata.service';

Injiziert wird er, in dem in der Konstruktormethode bei den Parametern folgendes eingetragen wird:

 constructor(public getdataservice: GetdataService) {

 }

Dies bedeutet, dass jetzt innerhalb der Komponente bzw. Seite (page) der GetdataService über die 
öffentliche Eigenschaft getdataservice verfügbar ist.

Alle Eigenschaften und Methoden, die Sie im Service eintragen und erstellen, können jetzt innerhalb der tab2-Seite mittels
this.getdataservice.Eigenschaft bzw. this.getdataservice.Methode() aufgerufen werden.

Ergänzen Sie eine Eigenschaft counter im Service getdataservice:

export class GetdataService {

  counter = 0;

  constructor() { }
}

Ergänzen Sie in der tab2.page.html folgenden Text
Global Counter: {{ getdataservice.counter}}

unter dem zweiten </ion-header>

Die doppelt geschweiften Klammern nennen sich "Interpolation" und stellen eine direkte Verbindung der darin 
enthaltenen Eigenschaft zu der darzustellenden Seite her (Databinding). Sobald sich der Inhalt der eingetragenen Eigenschaft
ändert, ändert sich die Anzeige auf der Seite, ohne dass man nochmals was tun muss.

Um das Ganze etwas schöner zu machen, ersetzen wir diesen einfachen Text jetzt durch eine Card.
Auf der Webseite https://ionicframework.com wählen Sie Components aus dem Menü rechts oben aus.
Scrollen Sie bis Sie links Card finden. Klicken Sie auf ion-card und kopieren Sie den HTML-Quellcode für Angular.
Fügen Sie diesen in tab2.page.html unter dem zweiten </ion-header> ein.

Jetzt sollten Fehler angezeigt werden. Da wir "Standalone" ausgewählt haben, müssen wir jedes ion-Element, welches wir verwenden
in der TS-Datei importieren und im @Component-Deklarator als Import bekanntgeben (das ist ziemlich lästig...)

Ergänzen Sie daher folgende Zeile in der tab2.page.ts am Anfang:
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/angular/standalone';

und fügen Sie jedes einzelne dieser Elemente in die Liste bei imports: [] im @Conmponent-Deklarator hinzu.

Jetzt können Sie innerhalb der ion-Card ihren Global-Counter-Text unterbringen.
--------------
Wir ergänzen den Service noch um zwei Methoden, die den globalen Counter inkrementieren bzw. dekrementieren:

export class GetdataService {

  counter = 0;

  constructor() { }

  incrementCounter() {
    this.counter++;
  }

  decrementCounter() {
    this.counter--;
  }
}

Dann ergänzen wir zwei Ion-Buttons in tab2.page.html:

 <ion-button (click)="getdataservice.incrementCounter()">Increment</ion-button>
 <ion-button (click)="getdataservice.decrementCounter()">Decrement</ion-button>

Sollte ion-button nicht bekannt sein, in der TS-Datei importieren und ergänzen....

Innerhalb der HTML-Datei wird beim Zugriff auf die Eigenschaften und Methoden der eigenen Komponente kein this verwendet.
getdataservice ist hier eine Eigenschaft der Komponente tab2.

Innerhalb der TS-Datei muss jedoch ein this. verwendet werden.


--------

Fortsetzung...

Die grundlegende Datenstruktur in JSON für die Daten der "Langen Nacht der Wissenschaften" sieht wie folgt aus (hier nur ein Ausschnitt):
--------------------

data = [
        {
            "id": "buij0yevi7hijcly",
            "termin_id": "1ad4dd39-7f0b-440a-9432-219556bbda8d",
            "titel": "Alte Schneckenh\u00e4user, neue Erkenntnisse \u2013 Citizen Science im Naturkundemuseum",
            "beschreibung": "<p>Sammlungsmaterial in Pralinenk\u00e4sten und handgeblasenen Gl\u00e4sern? Erfahren Sie von unserem B\u00fcrgerwissenschaftler Frank Borleis anhand der Weichtiersammlung, was es damit auf sich hat und warum es so wichtig ist, das alte Sammlungsmaterial aufzuarbeiten. Versuchen Sie sich selbst am Bestimmen von Schnecken und Muscheln oder vielleicht gelingt es Ihnen ja auch alte Etiketten zu entziffern. Stellen Sie Ihre Fragen zur spannenden Molluskenfauna des Leipziger Auensystems.<\/p>",
            "beginn": "2025-06-20T16:00:00",
            "ende": "2025-06-20T21:00:00",
            "ort": "Naturkundemuseum Leipzig",
            "ort_id": "o7fvfeylb25exmhv",
            "adresse": "Lortzingstra\u00dfe 3, 04105 Leipzig \/ Veranstaltungsraum",
            "einrichtung": "Naturkundemuseum Leipzig",
            "verantwortlich": "Frank Borleis \/ Raoul L\u00fchmann",
            "format": "Demonstration",
            "themen": "Naturwissenschaften und Umwelt",
            "kinder": null,
            "barrierefrei": null,
            "english": null
        },
        {
            "id": "skooatv9kjxsuueg",
            "termin_id": "1ad4dd39-7f0b-440a-9432-219556bbda8d",
            "titel": "Mooskartierung in Leipzig \u2013 ohne Citizen Science am Naturkundemuseum unm\u00f6glich",
            "beschreibung": "<p>Die Fachgruppe Moose stellt die Kartierung der Moose in der Stadt Leipzig in 190 Rasterfeldern vor. Uwe Schwarz hat mit seiner Fachgruppe in Leipzig bisher 148 von 190 Rasterfeldern mit 1.799 Fundpunkten besucht und dabei 9.282 Einzelfunde kartiert und 250 Arten sowie 30 niedere Taxa nachgewiesen. Uwe Schwarz berichtet auch von Neu- und Wiederfunden bemerkenswerter Moosfunde in Sachsen. Lernen Sie die Fachgruppe Moose kennen! <\/p>",
            "beginn": "2025-06-20T16:00:00",
            "ende": "2025-06-20T21:00:00",
            "ort": "Naturkundemuseum Leipzig",
            "ort_id": "o7fvfeylb25exmhv",
            "adresse": "Lortzingstra\u00dfe 3, 04105 Leipzig \/ Veranstaltungsraum",
            "einrichtung": "Naturkundemuseum Leipzig",
            "verantwortlich": "Uwe Schwarz \/ Karl Heyde",
            "format": "Demonstration",
            "themen": "Naturwissenschaften und Umwelt",
            "kinder": null,
            "barrierefrei": null,
            "english": null
        },
        {
            "id": "vh0nkuruficl9dfn",
            "termin_id": "1ad4dd39-7f0b-440a-9432-219556bbda8d",
            "titel": "Mykologie hautnah \u2013 Blick hinter die Kulissen der ehrenamtlichen Pilzforschung am Naturkundemuseum",
            "beschreibung": "<p>Die Fachgruppe Mykologie arbeitet schon seit vielen Jahrzehnten am Naturkundemuseum. Dabei geht es nicht nur um das Sammeln essbarer Pilze, sondern auch um eine m\u00f6glichst fundierte Pilzbestimmung. Einige Mitglieder der Fachgruppe sind gepr\u00fcfte Pilzsachverst\u00e4ndige und unterst\u00fctzen neben der allgemeinen Pilzberatung z.B. Krankenh\u00e4user bei Verdachtsf\u00e4llen einer Pilzvergiftung. Die Fachgruppe berichtet von der ehrenamtlichen Arbeit an der s\u00e4chsischen Datenbank Mykis.<\/p>",
            "beginn": "2025-06-20T16:00:00",
            "ende": "2025-06-20T21:00:00",
            "ort": "Naturkundemuseum Leipzig",
            "ort_id": "o7fvfeylb25exmhv",
            "adresse": "Lortzingstra\u00dfe 3, 04105 Leipzig \/ Veranstaltungsraum",
            "einrichtung": "Naturkundemuseum Leipzig",
            "verantwortlich": "Frank Swoboda \/ Maria Swoboda \/ Karl Heyde",
            "format": "Demonstration",
            "themen": "Naturwissenschaften und Umwelt",
            "kinder": null,
            "barrierefrei": null,
            "english": null
        },
        {
            "id": "qvadj1im3qckqo8j",
            "termin_id": "0a3f5176-9322-4697-bf00-94a4aeb0a4ed",
            "titel": "Workshop: Play My Math - Erleben Sie, wie Mathematik zur Musik wird!",
            "beschreibung": "<p>Stellen Sie sich vor, Pythagoras h\u00e4tte ein Tonstudio geleitet - was w\u00e4re wohl dabei herausgekommen? Finden Sie es selbst heraus und verwandeln Sie in diesem interaktiven Workshop mathematische Gleichungen und trockene Bruchzahlen in Rhythmen und Melodien! Hier lernen Sie, wie man mit Bruchzahlen Musik macht und wie man Mathematik mit Musik verstehen kann.<\/p>",
            "beginn": "2025-06-20T17:00:00",
            "ende": "2025-06-20T17:45:00",
            "ort": "ScaDS.AI Dresden\/Leipzig",
            "ort_id": "wd6iu55s5qkux5ym",
            "adresse": "Humboldtstra\u00dfe 25, 04105 Leipzig",
            "einrichtung": "ScaDS.AI Dresden\/Leipzig",
            "verantwortlich": "Eric Roldan, ScaDS.AI Dresden\/Leipzig",
            "format": "Workshop",
            "themen": "Digitales und Technik",
            "kinder": true,
            "barrierefrei": true,
            "english": true
        },
        {
            "id": "aaj3wgnys6izunlq",
            "termin_id": "404cc053-8b37-4620-9df9-086382dcbdff",
            "titel": "FutureTalk: Hybride Interaktion mit Mixed Reality",
            "beschreibung": "<p>Projekt HYBEAM | Wie kann Mixed Reality (MR) die Zukunft der Fort- und Weiterbildung pr\u00e4gen? <\/p><p>Im Beitrag FutureTalk erlebst du, wie digitale und physische Lernr\u00e4ume miteinander verschmelzen. Mit einer MR-Brille kannst du in Echtzeit mit einer Person an einem anderen Standort interagieren - als w\u00fcrdet ihr euch im selben Raum befinden. Durch r\u00e4umliches Audio, virtuelle Avatare und geteilte digitale Inhalte entsteht ein immersives Gruppengespr\u00e4ch, das \u00fcber klassische Videokonferenzen hinausgeht.<\/p>",
            "beginn": "2025-06-20T17:00:00",
            "ende": "2025-06-20T20:00:00",
            "ort": "Campus Augustusplatz der Universit\u00e4t Leipzig",
            "ort_id": "5es8kblwr8mmtceh",
            "adresse": "Augustusplatz 10, 04109 Leipzig \/ Foyer der Wirtschaftswissenschaftlichen Fakult\u00e4t, Eingang \u00fcber Innenhof oder Grimmaische Stra\u00dfe 12",
            "einrichtung": "Institut f\u00fcr Wirtschaftsp\u00e4dagogik der Universit\u00e4t Leipzig",
            "verantwortlich": "Prof. Dr. Roland Happ &amp; Lily Kruse",
            "format": "Virtual Reality",
            "themen": "Digitales und Technik",
            "kinder": true,
            "barrierefrei": true,
            "english": null
        },
]
------------

Kopieren Sie diesen Teil in die getdata.service.ts, direkt nach der Zeile 
export class GetdataService {

  data = [

Damit haben Sie eine "globale" Eigenschaft data angelegt, die ein Array (0 .. data.length-1) darstellt, mit den einzelnen Datenobjekten.
Wenn Sie nun auf einer beliebigen Seite den Service importieren (oben) und injizieren (im constructor) (s. tab2.page.ts), dann können Sie jederzeit über 
this.getdataservice.data auf dieses Array zugreifen. Innerhalb der HTML-Templates fällt dabei das "this" weg.

Mit Hilfe der Strukturdirektive *ngFor kann man in Angular Elemente in einer Schleife im HTML-Template wiederholen, ähnlich 
einer For-Schleife in anderen Programmiersprachen.

Um für alle Array-Elemente von getdataservice.data ein ion-card zu erstellen, muss z.B. nur im ion-card-Tag ein *ngFor ergänzt werden:

 <ion-card *ngFor="let item of getdataservice.data">

Wenn Sie dies erst mal so einbauen, kommt es zu einer Fehlermeldung in der Konsole:
Can't bind to 'ngForOf' since it isn't a known property of 'ion-card' (used in the '_Tab2Page' component template). (und weiteres)

Sie müssen dann in der tab2.page.ts das Commonmodul einbinden und importieren:

Also oben:
import { CommonModule } from '@angular/common';

und im @Component-Deklarator unter imports:

 imports: [CommonModule,IonButton,...

Danach sollten auf der Seite von tab2 entsprechend der Anzahl der Einträge in data jeweils ein ion-card erstellt sein.

Innerhalb des Tags, welches Sie mit *ngFor mehrfach erstellen, haben Sie auf das aktuell in der Schleife betrachtete Element Zugriff über item, da wir
geschrieben haben: let item of.

Um also auf den Titel der Struktur zuzugreifen, ersetzen Sie den Text "Card Title" durch {{item.titel}}, entsprechend verfahren Sie mit den anderen Daten.

Ich hänge Ihnen einen Screenshot des aktuellen Standes der App an. Versuchen Sie, dieses Design nachzubauen.
Um z.B. den Header-Bereich grau zu hinterlegen, können Sie in der tab2.page.scss einen entsprechenden CSS-Eintrag einfügen:

ion-card-header {
  background-color: #f0f0f0;
}

Da alle Veranstaltungen am gleichen Tag stattfinden, ist nur die Uhrzeit von Beginn und Ende interessant.
Daher können im Constructor diese Daten manipuliert werden, so dass sie danach für uns brauchbar sind.

Haben Sie den Github-Copilot installiert? Wenn nicht, sollten Sie dies unbedingt tun. Als Studierende können Sie einen kostenlosen (erweiterten) Github-Account anlegen 
und haben dann Zugriff auf die Erweiterung in VSCode des Github-Copilot.

Wenn Sie diesen installiert haben, dann reicht es aus, im Constructor folgenden Kommentar hinzuschreiben:

 // in allen Daten "beginn" und "ende" die darin enthaltene Uhrzeit extrahieren und beginn und ende darauf setzen, die Minuten, die kleiner 10
 // sind, mit einer 0 auffuellen

Dann sollte Ihnen der Copilot einen Quellcode-Vorschlag unterbreiten, der in etwa so aussieht:

    this.data.forEach(item => {
      const begin = new Date(item.beginn);
      const end = new Date(item.ende);
      item.beginn = `${begin.getHours()}:${begin.getMinutes() < 10 ? '0' + begin.getMinutes() : begin.getMinutes()}`;
      item.ende = `${end.getHours()}:${end.getMinutes() < 10 ? '0' + end.getMinutes() : end.getMinutes()}`;
    }
    );

In diesem Quellcode wird das data-Array ähnlich dem *ngFor abgearbeitet: 
  - es wird jeweils ein neues Date-Objekt mit den gespeicherten Daten erstellt
  - über die zum Date-Objekt gehörenden Methoden getMinutes und getHours wird dabei ein neuer String zusammengestellt
  - Dieser String ist jeweils ein Template-Literal, der in speziellen Anführungszeichen steht: `` (anstelle von "" oder '')
    Innerhalb eines Template-Literals kann z.B. ein Zeilenumbruch stehen (der hier in HTML allerdings nicht dargestellt wird) und es können einfach Variablen und
    Eigenschaften eingebunden werden durch ${}. Bei den Minuten wird zusätzlich innerhalb der ${} ein ternärer Operator "Bedingung ? true : false" genutzt, der bei
    Minuten < 10 noch eine führende '0' ergänzt.

Ihre Aufgabe bis zum nächsten Termin:
Versuchen Sie, die Ion-Cards im Screenshot nachzubauen, auch mit Anzeige der Icons.

Ich hänge Ihnen zusätzlich noch eine Farbinformation der Agentur an.

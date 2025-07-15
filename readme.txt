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


-------
Laden der Daten von der API der Webseite.

Die Daten, die in der App verwendet werden sollen, stammen von der Webseite wissen-in-leipzig.de und sind als JSON-Datei unter

https://www.wissen-in-leipzig.de/json-export/

abrufbar.

Wenn Sie die Seite direkt aufrufen, ist es in der Regel schwer, die Struktur zu erkennen. 
Der Firefox-Browser stellt die JSON-Struktur direkt brauchbar da, andere meist nicht.
Hier kann die Webseite https://jsonformatter.curiousconcept.com helfen.

In das Eingabefeld können Sie entweder JSON direkt reinkopieren oder aber die URL der Webseite.

############

Die geladenen Daten wollen wir in der gleichen Variablen speichern, wie beim jetzigen Stand, also in GetdataService.data.
Wenn wir die bisher unter data= [] gespeicherten Daten löschen und nur noch die Array-Klammern stehen lassen, zeigt VSCode Fehler an.
z.B. wenn irgendwo steht item.beginn und das item ein Element des data-Arrays ist.

Bevor wir die Daten gelöscht haben, war für den Editor ersichtlich, welche Struktur die Daten hatten. Das ist jetzt unklar und deshalb sind die Eigenschaften, auf die 
wir zugreifen wollen auch nicht bekannt. Javascript wäre das egal, es würde einfach erwarten, dass die Eigenschaften später da sind.
Typescript braucht jedoch die Informationen über die Struktur der Daten.

Um Typescript die Struktur mitzuteilen, müssen wir ein interface anlegen. Damit definieren wir sowas wie einen Variablentypen (string, integer), den wir entsprechend dann auch anwenden können.

Die Definition erfolgt vor dem @-Deklarator und nach dem Imports:


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


Wie bei Klassendefinitionen schreibt man  i.A. die Interfaces mit führendem Großbuchstaben.

Jetzt definieren wir data wie folgt (und ein Array für die Ortsinformationen gleich mit):

  // Data als Array von EintragData
  data: EintragData[] = [];
  // Orte als Array von OrteData
  orte: OrteData[] = [];

"data ist vom Typ Array of EintragData und es wird ein leeres Array zugewiesen"


Jetzt sollten die Fehlermeldungen verschwunden sein.

##############


Die Daten sollen gleich bei Programmstart geladen werden, d.h. ein geeigneter Platz dazu wäre der constructor von GetdataService.

Das Laden der Daten ist jedoch ein asynchroner Vorgang, d.h. dass der Vorgang gestartet wird, man aber nicht auf das 
Ende der Ausführung warten muss, aber warten kann.

Warten ist dann sinnvoll, wenn der nächste Schritt erst ausgeführt werden kann, wenn das Ergebnis da ist.
So in unserem Fall:

Mit folgender Zeile können wir die Daten von der API abfragen:
const response = await fetch('https://www.wissen-in-leipzig.de/json-export/');

Das await bedeutet, dass die nächste Programmzeile erst ausgeführt wird, wenn fetch ein Ergebnis geliefert und in response gespeichert hat.
response ist vom Typ Response, also nicht direkt JSON.

Mittels:
const zwi = await response.json();

werden die enthaltenen Daten jedoch als JSON in zwi gespeichert. Auch hier macht es noch keinen Sinn, weiterzuarbeiten, wenn 
in zwi die Daten noch nicht vollständig vorhanden sind, daher auch hier ein await.


Muss man nicht auf das Ergebnis des asynchronen Aufrufs warten, so gibt man eine Callback-Funktion an, die aufgerufen wird, sobald das Ergebnis vorliegt
(dazu kommen wir gleich nochmals).

Im Constructor können wir kein await platzieren, da dies die Instantiierung der Komponente aufhält.
Statt dessen erstellen wir eine eigene Methode loadData(), die wir innerhalb des Constructors aufrufen.

async loadData(){
     // Die Daten über eine API laden, im Falle eines Fehlers die Daten aus dem Storage laden (kommt noch)
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


Wird in einer Methode ein await verwendet, dann ist die Dauer der Ausführung nicht wirklich abzuschätzen, eine solche Methode muss daher als async gekennzeichnet werden, 
um bei Aufruf nicht das ganze Programm zu blockieren.


Da der Aufruf von fetch() auch Fehler produzieren kann (Server down, kein Internet), müssen wir diesen Fall berücksichtigen. Genauso kann z.B. json() 
einen Fehler produzieren, wenn die Daten kein korrektes JSON enthalten.
Die Funktionen "werfen" einen Fehler, den wir "auffangen" können: try{} catch(error){}
  

###################


Ein Aufruf von loadData() würde also das Datenladen starten und gleich zur nächsten Zeile springen und diese ausführen.

Wenn wir also unseren constructor wie folgt schreiben:

constructor() {
    this.loadData();
    
    // in allen Daten "beginn" und "ende" die darin enthaltene Uhrzeit extrahieren und beginn und ende darauf setzen, die Minuten, die kleiner 10
    // sind, mit einer 0 auffuellen
    this.data.forEach(item => {
      const begin = new Date(item.beginn);
      const end = new Date(item.ende);
      item.beginn = `${begin.getHours()}:${begin.getMinutes() < 10 ? '0' + begin.getMinutes() : begin.getMinutes()}`;
      item.ende = `${end.getHours()}:${end.getMinutes() < 10 ? '0' + end.getMinutes() : end.getMinutes()}`;
    }
    );
  }

bedeutet dies, dass das Datenladen gestartet wird und direkt danach die Daten bearbeitet werden (data.foreach). Es ist aber nicht sichergestellt, dass die Daten 
bereits geladen wurden. Wenn nicht, ist data noch leer.
Wir müssen hier auf eine Callback-Funktion zurückgreifen:

 this.loadData().then(this.machwas());


Wir könnten jetzt diese Methode weiter unten schreiben und die this.data.forEach-Schleife dorthin verschieben. Da diese Methode jedoch nur genau an dieser
Stelle aufgerufen werden würde, wäre das unnötig unübersichtlich. Hierzu kann man nun Arrow-Functions verwenden, eine Abkürzung für solche Fälle:

 this.loadData().then(() => {
      // in allen Daten "beginn" und "ende" die darin enthaltene Uhrzeit extrahieren und beginn und ende darauf setzen, die Minuten, die kleiner 10
      // sind, mit einer 0 auffuellen
      this.data.forEach(item => {
        const begin = new Date(item.beginn);
        const end = new Date(item.ende);
        item.beginn = `${begin.getHours()}:${begin.getMinutes() < 10 ? '0' + begin.getMinutes() : begin.getMinutes()}`;
        item.ende = `${end.getHours()}:${end.getMinutes() < 10 ? '0' + end.getMinutes() : end.getMinutes()}`;
      }
      );

	console.log(this.data);
    });

() => {}
In den Klammern könnten noch Parameter stehen, der Pfeil (Arrow) übernimmt die Definitionsgeschichte, einen Methodennamen brauchen wir nicht und die Klammern {} bedeuten dasselbe.

Jetzt sollte das Laden funktionieren und Ihre Seite die Daten anzeigen. In der Konsole sollten die Daten angezeigt werden.
Wenn das funktioniert, können Sie ihr WLan ausschalten und neu laden, dann sollte eine rote Fehlermeldung (console.error statt console.log) erscheinen.

########################

Noch etwas zu dem, was das Databinding so toll macht:

this.data ist bei Programmstart ein leeres Array. 
Angenommen, das Laden dauert eine Sekunde. Da es asynchron abläuft, ist in dieser Zeit unsere gesamte Seite bereits aufgebaut worden. Da das Array ja leer ist, hat im HTML der tab2
die Zeile <ion-card *ngFor="let item of getdataservice.data"> keine einzige Card erstellt.
Sobald das Laden jedoch fertig ist und sich damit getdataservice.data geändert hat, wird automatisch die Seite neu gerendert und unser vollständige Tabelle ist da.

Fortsetzung folgt...



################################################
 

Daten im Gerät speichern

Um Daten in der App lokal auf dem Gerät zu speichern, gibt es mehrere Möglichkeiten.
Die vorgeschrittenste ist die Nutzung einer SQLite-Datenbank, was aber im Browser nicht funktionieren würde,
da diese SQLite nicht unterstützen.

Ionic bietet eine Storage Bibliothek an, die sich dynamisch an die verfügbaren Speicheroptionen anpasst.
D.h., im Browser wird z.B. der local storage für die Webseite genutzt, auf dem Gerät kann SQLite mit den gleichen
Befehlen genutzt werden.

Auch wenn in dem Webview einer App der Localstorage des Webbrowsers bzw. indexedDB zur Verfügung steht, so ist nicht
sichergestellt, dass die Daten auf Dauer in der App gespeichert bleiben. Die Betriebssysteme iOS und Android können
unter Umständen diese Speicher löschen. Insoweit ist es notwendig, zur persistenten (dauerhaften) Speicherung von Daten
SQLite zu verwenden.

Ionic storage

https://github.com/ionic-team/ionic-storage#sqlite-installation

npm install @ionic/storage-angular


// If using Capacitor, install the plugin using
npm install cordova-sqlite-storage

// Then, install the npm library
npm install localforage-cordovasqlitedriver

in main.ts:
```javascript
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { Drivers, Storage } from '@ionic/storage'; // *****
import CordovaSQLiteDriver from 'localforage-cordovasqlitedriver'; // *****

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { // *****
      provide: Storage,
      useFactory: () =>
        new Storage({
          //driverOrder: [CordovaSQLiteDriver._driver],
          driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB, Drivers.LocalStorage],

        }),
    },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});
```

Die driverOrder gibt die Prioritäten an, nach denen die verschiedenen Speicheroptionen
genutzt werden:
Wenn vorhanden: SQLite, sonst: IndexedDB, sonst: LocalStorage

Dann in tsconfig.json folgende Zeile ergänzen unter Compileroptions:
 "allowSyntheticDefaultImports": true

Ergänzen Sie in der getData.Service.ts folgende Imports:

import { Storage } from '@ionic/storage-angular';
import CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

Vor dem ersten Aufruf der storage-Instanz muss der Treiber initialisiert werden.
Dies geht z.B. im Constructor des GetdataService.
Da die Initialisierung asynchron ist, müssen wir eine entsprechende Methode erstellen,
die wir dann aufrufen:

 constructor(private storage: Storage) { 
    this.init();
    this.loadData().then(...)
  }

  async init() {
    await this.storage.defineDriver(CordovaSQLiteDriver);
    await this.storage.create(); // DATENBANK anlegen!
  }

  Auch hier kann es zu Timingproblemen kommen, wenn wir z.B.
in der loadData die Daten in den Storage speichern wollen.

Daher macht es Sinn, dies wie folgt zu programmieren:

 constructor(private storage: Storage) { 
    this.init().then(() => {
       this.loadData().then(...)
    });
   
  }

Das Speichern von Daten im Storage geschieht über Keys:

 await this.storage.set('favoritesYear', this.favoritesYear);

Das Auslesen von Daten aus dem Speicher funktioniert wie folgt:

   // Leerstring, falls der Key nicht vorhanden ist.
   this.favoritesYear = await this.storage.get('favoritesyear') || "";



Der Constructor in getdata.service sollte jetzt in etwa so aussehen:

-----------------
 constructor(private storage: Storage) {
    // Storage initialisieren
    this.init().then(() => {     
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
      });
    }
    );
  }

  // Storage initialisieren
  async init() {
    await this.storage.defineDriver(CordovaSQLiteDriver);
    await this.storage.create();
  }
--------------------

Hier wird nach dem Anpassen von Beginn und Ende einfach der 
komplette Inhalt von this.data unter dem Key data gespeichert.

Im Browser können Sie sich den Storage anschauen, in dem Sie die Konsole 
aufrufen und neben der Konsole irgendwo sich den Speicher anzeigen lassen.

---------------------------
Favoriten speichern:

Die einzelnen Veranstaltungen können mehrfach mit unterschiedlichen Terminen
eingetragen sein. Die id bezeichnet dabei eine Veranstaltung, die termin_id jeweils
einen Termin. In der Originaldatenbank sind die Veranstaltungen nicht mehrfach 
enthalten, für unsere Api wurde jedoch für jeden Termin ein Eintrag erstellt.

Wenn wir als Favoriten nur die ID speichern, werden uns alle Termine eines
Eintrags angezeigt. Daher ist es notwendig, id und termin_id als Favoriten zu speichern.

Wir definieren daher ein interface für unsere Favoriten:

export interface Favorit {
    id: string;
    termin_id: string;
}

und wir erstellen ein leeres Array zur Speicherung der Favoriten:

favoriten: Favorit[] = [];

Wir können die Favoriten direkt im init() laden, nach der Initialisierung des Storage:

this.favoriten = await this.storage.get('favoriten') || [];

Es wird ein leeres Array zurückgegeben, wenn der Key nicht vorhanden ist.

Um einen Eintrag als ein- oder auszutragen, bietet sich eine Methode
toogleFavorit(id:string, termin_id: string) an.
Um festzustellen, ob ein Eintrag zu den Favoriten gehört (um z.B. das Herz entsprechend
einzufärben) ist eine Methode
 isFavorit(id: string, termin_id: string): boolean an.

Versuchen Sie, diese Funktionen mit Hilfe von KI zu erstellen.
Testen können Sie diese z.B. nach dem Laden der Daten mit einem Aufruf wie:

 this.toogleFavorit(this.data[0].id, this.data[0].termin_id);
 console.log('Favoriten:', this.favoriten);
 console.log('isFavorit:', this.isFavorit(this.data[0].id, this.data[0].termin_id));
   
Fortsetzung folgt....


Auslagern der Anzeige der Einträge in einer Karte in eine eigene Komponente.

Sie haben bisher auf der Startseite die Einträge in einer ion-Card dargestellt und in die HTML-Seite eingebunden:

in etwa so:

<ion-card *ngFor="let item of getdataservice.data">
    <ion-card-header>
      <ion-card-title>{{item.titel}}</ion-card-title>
      <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
    </ion-card-header>
  
    <ion-card-content>
      {{item.beginn}} - {{item.ende}}
      Global Counter: {{ getdataservice.counter}}
    </ion-card-content>
  </ion-card>

  Ein wesentlicher Vorteil von Angular und somit auch Ionic ist die Nutzung von Komponenten. Jede Seite ist eine solche Komponente (tab1, tab2, tab3).
  Man kann (und sollte) dies aber durchaus weiterführen.

  Deshalb werden wir eine Komponente "eintrag" erstellen, in der wir uns nur um die Gestaltung dieser Karte kümmern müssen.
  Um etwas Struktur reinzubringen, wollen wir diese in ein Unterverzeichnis components ablegen:

  ionic generate component components/eintrag --standalone
  bzw.
  ionic g c components/eintrag --standalone

  Jetzt kopieren Sie Ihr HTML aus der Liste in die eintrag.component.html. Kopieren Sie die komplette Card, auch wenn dort Ihre For-Schleife drin hängt:
  Sollten Sie CSS für diesen Teil ergänzt haben, so kopieren Sie diesen in die eintrag.component.scss.

  Auf der Startseite können Sie jetzt folgendes hinschreiben (mit Ihrer For-Schleife):


  <div *ngFor="let item of getdataservice.data">
    <app-eintrag [eintrag]="item"></app-eintrag>
  </div >

  Natürlich fehlt noch Einiges, weshalb ihr Projekt im Moment nicht läuft.
  1. Sie müssen auf dieser Seite die Eintrag-Komponente importieren
     import { EintragComponent } from '../components/eintrag/eintrag.component';

     sowie
 
     standalone: true,
     imports: [EintragComponent,...

     EintragComponent heißt die Klasse in unserer neu erstellten Komponente:
     export class EintragComponent  implements OnInit {

  2. Sie müssen in der Komponente alle IonButtons, IonCard usw. wieder importieren

  3. Wir wollen beim Aufruf einen Parameter [eintrag] mit dem aktuellen item übergeben.
     [eintrag]="item"  entspricht 
     eintrag = "{{item}}

     ist aber in diesem Kontext übersichtlicher.
     Um diesen Parameter in der Komponente einlesen zu können, definieren wir 

     export class EintragComponent implements OnInit {
     @Input() eintrag: EintragData = {} as EintragData;

     EintragData ist dabei das Interface, welches wir im GetdataService angelegt haben. Damit wir hier darauf zugreifen können,
     müssen Sie vor der Definition in getdata.service.ts ein export schreiben.

     Dann können Sie es in der Komponente importieren. Auch das Input müssen Sie importieren:

     import { Component, Input, OnInit } from '@angular/core';
     import { EintragData } from '../../services/getdata.service';

     Jetzt können Sie im HTML-Template der Komponente auf die Daten zugreifen, z.B. eintrag.titel

Das sollte es schon gewesen sein...



Deepcopy

Wenn man mit Eigenschaften und Variablen umgeht, dann gibt es eine Sache, die man grundsätzlich verstanden haben muss, da man sonst recht schnell Fehler machen kann,
die zu Beheben einige Zeit dauern wird (schwieriger Satz).

Die folgenden Übungen sind nur gedacht dazu, Ihnen die Problematik zu veranschaulichen. Dazu können Sie den angegebenen Quelltext in 
irgendeinen Constructor einer Ihrer Seiten packen und sich die Ergebnisse in der Console anschauen.


Beginnen wir mit was Simplem:

let a = 100;
let b = a;
console.log(a,b);

Die Ausgabe zeigt 100 - 100.

ergänzen Sie folgende Zeilen:

a = 120;
console.log(a,b);

Die Ausgabe zeigt 120 - 100.

Soweit so gut. Sie haben den Speicherinhalt der Variablen a genommen und im Speicher der Variablen b abgelegt, dann den Speicherinhalt der Variablen a verändert.

a ist eine number und dies ist ein primitiver Datentyp. Primitive oder einfache Datentypen werden in Javascript und Typescript by Value (als Wert) kopiert.

Dies gilt für alle folgenden einfachen Datentypen:

| Typ         | Beispiel             |
| ----------- | -------------------- |
| `number`    | `let a = 42;`        |
| `string`    | `let a = 'Hallo';`   |
| `boolean`   | `let a = true;`      |
| `undefined` | `let a = undefined;` |
| `null`      | `let a = null;`      |
| `bigint`    | `let a = 123n;`      |
| `symbol`    | `let a = Symbol();`  |

Verwendet man jedoch Objekte, Arrays oder Funktionen (was in Javascript geht!), dann wird by Reference (als Referenz) kopiert.
Das bedeutet, dass die Variable, die z.B. ein Array enthält, auf einen Speicherbereich zeigt, in dem die eigentlichen Daten abgelegt sind.
Die Variable enthält also nicht einen konkreten Wert, sondern nur die Adresse einer anderen Speicherstelle.

Ein Beispiel:

let objA = { name: "Anna" }
console.log (objA.name);

objA ist ein JS-Objekt mit der Eigenschaft name. Über die Punktnotation objA.name kann ich auf diese Eigenschaft (was nix anderes als eine Variable ist) zugreifen.

let objB = objA;
console.log(objB);

ergibt die Ausgabe: {name: "Anna"}

Es wirkt wie eine Kopie.
Angenommen, Sie wollen die eingelesenen Daten von der JSON-Schnittstelle verändern, in dem Sie z.B. nur noch die Elemente haben wollen, die einem Suchbegriff zugeordnet werden können.
Dann wollen Sie nicht Ihre Originaldaten zerhacken, um sie notfalls wieder einlesen zu müssen.

Statt dessen machen Sie eine Kopie.

Wenn Sie jetzt jedoch dieses Objekt objB manipulieren, dann manipulieren Sie gleichzeitig objA:

objB.name="Jörg";
console.log(objA, objB);

Die Ausgabe ist zweimal:
{name: "Jörg"}

Warum? Nun, Sie weisen objB einfach nur die Speicheradresse zu, die in objA drin steht und die auf die eigentlichen Daten verweist.
Die eigentlichen Daten werden aber nicht dupliziert.

Es gibt jedoch seit ECMAScript 2021 (= Standard von Javascript) eine Funktion structuredClone(), die einen richtiges Deepcopy ermöglicht.
Als Deepcopy wird eine vollständige Kopie selbst einer verschachtelten Datenstruktur bezeichnet.
Also von sowas z.B.:

const personen = [
  {
    vorname: "Anna",
    nachname: "Müller",
    adresse: {
      strasse: "Hauptstraße",
      hausnummer: "12a",
      plz: "04109",
      ort: "Leipzig"
    }
  },
  {
    vorname: "Lukas",
    nachname: "Schneider",
    adresse: {
      strasse: "Bahnhofstraße",
      hausnummer: "8",
      plz: "01067",
      ort: "Dresden"
    }
  }
];

Es gibt verschiedene Möglichkeiten, sogenannte Shallow Copies zu erstellen, dabei handelt es sich um Kopien, in der nur die oberste Ebene wirklich kopiert wird (by value), 
während die tieferen Ebenen nur referenziert sind (by reference).

Neben der Funktion structuredClone() war vorher die einzige Möglichkeit, eine Deepcopy zu erstellen, die Vorgehensweise, die Daten in einen JSON-String zu verwandeln und 
diesen dann wieder zu parsen...

const neuPersonen = JSON.parse(JSON.stringify(personen));

Wenn Sie z.B. Einträge aus unserer Liste an die Eintrag-Komponente als Parameter übergeben, dann haben Sie in der Komponente Zugriff auf die Original-Daten.

Das ist in dieser Anwendung nicht wirklich relevant, da wir keine Änderungen vornehmen.

Aber angenommen, sie wollten ermöglichen, dass ich einen solchen Eintrag ändern kann. Dann wäre es hilfreich, auf einer Kopie zu arbeiten, 
um am Ende z.B. auch den Vorgang abbrechen zu können.

Was aber nun, wenn ich die Kopie bearbeitet habe und die Daten wieder in das Original übernehmen will?

const personen = [
  { vorname: 'Anna', nachname: 'Müller', adresse: { ort: 'Leipzig' } },
  { vorname: 'Lukas', nachname: 'Schneider', adresse: { ort: 'Dresden' } }
];

// Du übergibst eine Kopie von personen[1] an die Edit-Komponente:
const editPerson = structuredClone(personen[1]);

// Daten verändern:
editPerson.adresse.ort = "Berlin";

Zurückspeichern ins Original:

personen[1] = editPerson;

Hier wird das Objekt personen[1] komplett durch die Kopie ersetzt. D.h. personen[1] zeigt jetzt auf den Speicherbereich, den wir mit structuredClone erst
erzeugt hatten.
Sollte jetzt editPerson gelöscht werden (weil es z.B. eine lokale Variable in einer Methode war und die Methode wird beendet), so existiert eine weitere Referenz auf 
diesen Speicherbereich und daher wird er nicht gelöscht.

Wichtig: Die Referenz auf die alten Daten gehen verloren, die alten Daten werden gelöscht, wenn keine Referenz mehr auf sie zeigt.

Etwas aufwändiger, aber im Prinzip ähnlich:
personen[1] = structuredClone(editPersonen)

Bei diesen einfachen Varianten kann es zu Problemen kommen.

z.B. beim gleichzeitigen Arbeiten in mehreren Komponenten:

componentA.person = personen[1];
componentB.person = personen[1];

this.personen[1] = editPerson;

componentA und componentB zeigen noch auf die alten Daten!


Wichtig ist, dass Sie sich der Problematik bewusst sind und sich damit beim Fehlersuchen evtl. in die richtige Richtung bewegen.

// Routing

Routing bedeutet, dass eine Anwendung verschiedene Seiten oder Ansichten (engl. views) bereitstellen kann, zwischen denen der
Nutzer wechseln kann – ähnlich wie bei klassischen Webseiten mit unterschiedlichen URLs.

In einem Ionic/Angular-Projekt bedeutet das:

- Jede Seite hat eine eigene URL.
- Beim Navigieren wird die angezeigte Komponente geändert, ohne dass die ganze App neu geladen wird.

Grundbegriffe:
Begriff	      Bedeutung
Route	        Eine Zuordnung von URL zu Komponente.
Pfad (path)	  Der Teil der URL, der zu einer bestimmten Seite führt (z. B. /home).
Router	      Der Angular-Dienst, der die Navigation übernimmt.
RouterOutlet	Platzhalter im HTML, wo die jeweils aktive Seite angezeigt wird.

Routing-Struktur:

Die Routing-Struktur wird in der datei app.routes.ts definiert, welche beim Projektstart in der Datei main.ts eingebunden wird:

import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    ...
  ],
});

Die Routen stellen ein Array aus einzelnen Pfaden dar:

// app.routes.ts (bei Standalone-Komponenten)
import { Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { DetailsPage } from './details/details.page';

export const routes: Routes = [
  {
    path: '',
    component: HomePage, // Standardseite
  },
  {
    path: 'details',
    component: DetailsPage,
  },
];

Bei Aufruf des Pfades wird die jeweils angegebene Komponente dort eingesetzt, wo sich das Tag <ion-router-outlet> befindet.
Die ist in unserem Fall in der app.component.html:

<ion-app>
  <ion-router-outlet></ion-router-outlet>
</ion-app>

Wollen Sie etwas ergänzen, das z.B. als überlagertes Menü arbeitet und unabhängig von der Navigation immer da ist, 
so könnten Sie dies in der app.component.html tun.

In unserem Fall mit den Tabs, gibt es eine weitere Unternavigation. In unserer app.routes.ts steht:

  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },

und wir haben eine Datei tabs.routes.ts, in der die einzelnen Routen der Tabs aufgelistet sind.
Für eine komplexe App mit vielen Seiten und möglichen Unternavigationen ist die Aufteilung der Routen auf verschiedene
.routes-Dateien sinnvoll, da es außerdem zu Performance-Vorteilen kommen kann. Eine Unternavigation wird erst geladen,
wenn sie benötigt wird.
Ich habe in meinem Projekten jedoch sämtliche Routen direkt in die app.routes.ts geschrieben, das erschien mir erst mal 
übersichtlicher.


Wollen wir jetzt eine Anzeige für die Details eines Eintrags umsetzen, so erstellen wir zuerst die Seite dazu:

ionic g page eintragDetails


Für unseren Fall wäre dann die apps.routes.ts z.B.:

import { Routes } from '@angular/router';
import { TabsPage } from './tabs/tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadComponent: () =>
          import('./tab1/tab1.page').then((m) => m.Tab1Page),
      },
      {
        path: 'tab2',
        loadComponent: () =>
          import('./tab2/tab2.page').then((m) => m.Tab2Page),
      },
      {
        path: 'tab3',
        loadComponent: () =>
          import('./tab3/tab3.page').then((m) => m.Tab3Page),
      }
    ],
  },
  {
    path: 'eintrag-details/:id/:termin_id',
    loadComponent: () => import('./eintrag-details/eintrag-details.page').then(m => m.EintragDetailsPage)
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full',
  },
]


EintragDetails soll außerhalb der Tabs-Navigation angezeigt werden, d.h. die Tabs sollen nicht mehr sichtbar sein.
Daher ist es bei den Routen auf der Ebene der Tabs. 

/:id/:termin_id  besagt, dass ich in der URL zwei Parameter anhängen will, nämlich die id und die termin_id des
ausgewählten Eintrags.

Um nun zu diesem Eintrag zu navigieren, ergänze ich in meiner Liste, in der alle app-eintrag-Elemente aufgelistet werden 
einen Event-Handler:

  <div *ngFor="let item of getdataservice.data">
    <app-eintrag (click)="zeigeEintrag(item)" [eintrag]="item"></app-eintrag>
  </div >

Und ergänze diese Methode in der entsprechenden ts-Datei:

  zeigeEintrag(item: EintragData) {
    // Hier wird der Eintrag angezeigt, z.B. durch Navigation zu einer Detailseite
    this.router.navigate(['/eintrag-details', item.id, item.termin_id]);
  }


Zwei Dinge muss ich hier zuerst importieren:
1. das Interface EintragData, welches in getDataService definiert wurde und (hoffentlich) mit export interface markiert ist:

import { GetdataService, EintragData } from '../services/getdata.service';

2. ich muss den Router importieren und injizieren:

import { Router } from '@angular/router';

 constructor(public getdataservice: GetdataService, private router: Router) 

Dann sollte ein Klick auf einen Eintrag die neue Seite öffnen.

Zwei offene Fragen:
1. Wie komme ich wieder zurück?
2. Wie greife ich auf die übergebenen Parameter zu und erhalte dann die Daten meines Eintrags?


Der Rückweg geht recht einfach, in dem Sie den Header in der HTML-Datei wie folgt definieren:

<ion-header [translucent]="true">
  <!-- Mit Zurück-Button -->
  <ion-toolbar>
    <ion-buttons slot="start">
      <ion-back-button defaultHref="/tabs/tab2"></ion-back-button>
    </ion-buttons>
    <ion-title>Eintrag Details</ion-title>
  </ion-toolbar>
</ion-header>

Natürlich noch die entsprechenden Tags importieren...
Bei Klick auf den Button springen Sie zurück zu /tabs/tab2 oder was Ihre Auswahlseite ist.

Um auf die Parameter zuzugreifen ergänzen Sie folgenden Quellcode:

Sie brauchen folgende Imports:
import { GetdataService, EintragData } from '../services/getdata.service';
import { ActivatedRoute } from '@angular/router';

und folgende Klassendefinition:

export class EintragDetailsPage implements OnInit {

  id: string = '';
  termin_id: string = '';
  eintrag: EintragData = {} as EintragData; // Initialisierung mit leerem Objekt



  constructor(private getDataService: GetdataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
    this.termin_id = this.route.snapshot.paramMap.get('termin_id') ?? '';
    // Eintrag anhand der ID suchen
    this.eintrag = this.getDataService.data.find(item => item.id === this.id && item.termin_id === this.termin_id)!;
    console.log('Eintrag Details:', this.eintrag);
  }

}

Einen besonderen Augenmerk möchte ich auf den Operator ?? lenken.

Habe ich diese Woche erst durch die KI kennen gelernt:

?? ist der sogenannte Null-Koaleszenz-Operator (Null Coalescing Operator). 
Er gibt den linken Wert zurück, wenn dieser existiert und nicht null ist, andernfalls den rechten Wert.


this.eintrag = this.getDataService.data.find(item => item.id === this.id && item.termin_id === this.termin_id)!;

Wir wenden auf unser Array mit den Daten (this.getDataService.data) die find-Methode an. Diese ruft eine 
Arrow-Funktion auf und übergibt einen Eintrag unseres Arrays nach dem anderen im Parameter item. Die Rückgabe dieser
Funktion ist die Auswertung des logischen Ausdrucks.

item => item.id === this.id && item.termin_id === this.termin_id

stellt eine abgekürzte Schreibweise dar für
(item) => {
  console.log(item.titel);
  return item.id === 42;
}
Wenn ich also in der Funktion nur den return-Befehl nutze, kann ich die {} und return weglassen.

Was wiederum in etwa folgender Schreibweise entspricht:

function suchwas(item) {
  console.log(item.titel);
  return item.id === 42; 
}

this.getDataService.data.find(suchwas);

Bei dem letzeren Beispiel gibt es dann aber Probleme mit dem this, welches sich hier auf etwas anderes bezieht.

Die Methode find() liefert einen Eintrag zurück, bzw. undefined, wenn nichts gefunden wird.
Daher muss eigentlich this.eintrag sowohl einen Rückgabewert von Typ EintragData als auch undefined speichern können.

Sie müsste dann wie folgt definiert werden:

eintrag: EintragData | undefined;

Da wir aber sicher sind, dass der Eintrag vorhanden ist, da wir ja in der Liste einen Eintrag mit der id und termin_id
angeklickt haben, können wir durch das abschließende !, den Non-null Assertion Operator, festlegen, dass es auf jeden Fall
einen Wert von Typ EintragData geben wird. Es werden dann keine Fehler mehr angezeigt beim Compilieren.

Wichtig, aber für unsere Anwendung irrelevant: find() liefert eine Referenz auf den Eintrag zurück.
Würden wir Daten ändern, wären diese auch in den Gesamtdaten geändert.

Nur mal zum Experimentieren:
 this.eintrag = this.getDataService.data.find(item => item.id === this.id && item.termin_id === this.termin_id)!;
    this.eintrag.titel = "geändert";  // Eintragstitel ändern
    console.log(this.getDataService.data); // in den Originaldaten ist es geändert.
    console.log('Eintrag Details:', this.eintrag);

Was aber die Verwirrung komplett macht und es unter Umständen erschwert, einen solchen Fehler zu finden:
Wenn Sie auf den Back-Button klicken, steht in der Liste immer noch der ursprüngliche Titel.

Angular hat hier nicht mitbekommen, dass Sie Daten verändert haben. Hätten Sie ein neues Objekt generiert und somit eine andere 
Referenz erzeugt, dann wäre ein Update erfolgt. Wir haben aber keine Referenzänderung, sondern nur einen Wert einer Eigenschaft 
eines referenzierten Objekts verändert.

Jetzt können Sie die Detailseite entsprechend ausbauen...

Fortsetzung folgt....

App erst starten, wenn die Daten geladen wurden.

Im Moment ist es so, dass die Daten asynchron geladen werden, auch wenn wir die Seiten schon aufbauen. Ändern sich die Daten in unserem Array, dann wird automatisch
die Anzeige angepasst. Wenn wir jetzt um ein Unendliches Scrollen erweitern wollen, das so genannte "Infinity scroll", dann müssen unsere Daten aber bereits vorhanden sein.
Wir können noch mal reagieren, wenn die Daten geladen sind, oder wir starten die App im Prinzip erst, wenn die Daten da sind. 
In der LNDW App habe ich mich für die zweite Möglichkeit entschieden.

Die ist relativ einfach umzusetzen:

Die erste Komponente, die überhaupt die anderen Seiten lädt, ist die app.component.
Diese definiert das Tag <app-root> im @Component-Deklarator in der app.component.ts.

Dieses Tag findet sich in der index.html-Datei wieder, die im Hauptverzeichnis liegt:

<body>
  <app-root></app-root>
</body>

Mehr ist an HTML nicht in der index.html vorhanden, diese Datei rühren wir eigentlich auch nie an.

Die app.component.html sieht in unserem Fall so aus:

<ion-app>
  <ion-router-outlet></ion-router-outlet>
</ion-app>

<ion-router-outlet> wird dabei jeweils durch die Komponente ersetzt, die wir bei den Routen angeben (also bei uns app.routes.ts).

Wir können aber hier eine Bedingung einfügen:

<ion-app>
<div *ngIf="getDataService.dataLoaded">
  <!-- App Content -->
  <ion-router-outlet></ion-router-outlet>
</div>
<!-- Loading Overlay mit Spinner und Text -->
<div *ngIf="!getDataService.dataLoaded" class="loading-overlay">
  <div class="loading-box">
    <ion-spinner></ion-spinner>
    <p>Daten werden geladen...</p>
  </div>
</div>
</ion-app>

Wir definieren in der getData.service.ts eine Eigenschaft dataloaded, die zu Beginn false ist und nach dem Laden der Daten auf true gesetzt wird.
Damit wird der eigentliche Inhalt erst angezeigt, wenn die Daten geladen wurden.

Ansonsten wird eine Meldung mit einem Spinner angezeigt, dass die Daten geladen werden.

Und damit das schön aussieht, folgendes in app.component.css packen:
.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    /* Halbtransparenter Hintergrund */
    z-index: 1000;
    /* Sicherstellen, dass es oben angezeigt wird */
}

.loading-box {
    background: white;
    padding: 20px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
}

ion-spinner {
    margin-bottom: 10px;
    /* Abstand zwischen Spinner und Text */
}

Ergänzen Sie die app.component.ts-Datei wie folgt:

import { CommonModule } from '@angular/common'; // Wegen des *ngIf
import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet,IonSpinner } from '@ionic/angular/standalone'; // Spinner ergänzen
import { GetdataService } from './services/getdata.service';  // Service importieren

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, IonSpinner, CommonModule], 
  styleUrls: ['app.component.scss'], // ergänzen, falls es fehlt
})
export class AppComponent {
  constructor(public getDataService: GetdataService) {} // Service injizieren
}

Import nicht vergessen. 
Hier ein Hinweis: Wenn Sie GetdataService an der Stelle im constructor tippen, dann wird Ihnen von Autovervollständigen gereits der Service vorgeschlagen. 
Wenn Sie dann einfach nur Enter tippen, wird der Import automatisch hinzugefügt. Bei den eigenen Services klappt das prima, bei denen von Angular oder Ionic kann es
manchmal zu Verwechslungen kommen.

Wir müssen in der getdata.service.ts noch die Eigenschaft dataloaded ergänzen:

export class GetdataService {

  public dataLoaded = false;


Jetzt sollte der Spinner erscheinen. Da wir dataLoaded nicht auf true setzen, bleibt das auch so.

Suchen Sie selbst die Stelle in getDataService, wo Sie this.dataLoaded = true einfügen.

Fortsetzung folgt....




Infinity-Scroll

Wie Sie sicherlich bemerkt haben, ist die Liste der Veranstaltungen mittlerweile recht lang geworden (aktuell 669 Einträge).
In der App ist es so gelöst, dass erst mal nur 50 Einträge angezeigt werden. Wird weitergescrollt, erscheint kurz ein "Spinner" und es
werden weitere 50 Einträge angehangen. Dadurch wird das Rendering der Einträge schneller.

Hierfür gibt es ein spezielles ion-Tag, das ion-infinite-scroll-Tag.

Infinity-Scroll (auch „endloses Scrollen“ genannt) ist ein Pattern, bei dem beim Scrollen automatisch weitere Inhalte nachgeladen werden, 
sobald der Nutzer ans Ende der Liste kommt – ganz ohne manuelle Pagination oder „Mehr laden“-Buttons.

Was passiert im Hintergrund?
Im Hintergrund funktioniert das so:

- Beobachtung des Scroll-Events: Das System registriert, wenn der Benutzer an das Ende (oder fast ans Ende) der Seite/Liste scrollt.
- Trigger für Datenladen: Sobald das erkannt wird, wird ein Event ausgelöst, um die nächsten Daten zu laden.
- Daten anhängen: Neue Daten werden an das bestehende Array (getdataservice.data) angehängt.
- UI aktualisiert sich automatisch, da Angular bei Änderungen im Array die Ansicht neu rendert.

Bisher sieht unsere Liste in etwa so aus:

<div *ngFor="let item of getdataservice.data">
    <app-eintrag (click)="zeigeEintrag(item)" [eintrag]="item"></app-eintrag>
</div >

Wir ergänzen das Ganze in den nächsten Zeilen um:

  <ion-infinite-scroll (ionInfinite)="ladeMehrDaten($event)">
    <ion-infinite-scroll-content
      loadingSpinner="bubbles"
      loadingText="Lade mehr Einträge...">
    </ion-infinite-scroll-content>
  </ion-infinite-scroll>

Entsprechend sind natürlich in der TS-Datei die Tags zu importieren.

Es müssen ein paar Eigenschaften in der TS-Datei definiert werden:

  visibleEntries = 30; // Anzahl der aktuell sichtbaren Einträge
  increment = 30; // Anzahl der Einträge, die pro Klick nachgeladen werden



Die Methode ladeMehrDaten sieht wie folgt aus:

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

  }

  Und in der HTML-Datei ist die Schleife selbst wie folgt zu ergänzen:

  <div *ngFor="let item of getdataservice.data | slice:0:visibleEntries">
    <app-eintrag (click)="zeigeEintrag(item)" [eintrag]="item"></app-eintrag>
  </div >

getdataservice.data | slice:0:visibleEntries beschreibt die Verarbeitung der Daten mittels einer slice-Pipe.
Konkret werden nur die Daten von Array-Element 0 bis Array-Element visibleentries zurückgegeben.
(Am Ende folgt ein kurzer Exkurs zum Thema Pipes)

Was ist nun der Vorteil dieses "Nachladens"? Die Daten sind ja bereits komplett im Speicher
geladen, wir haben im vorherigen Schritt extra darauf gewartet.

Bei 670 Einträgen muss Angular 670 DOM-Elemente rendern – und ggf. bei jedem Scroll oder Change Detection erneut prüfen.
Gerade auf älteren Smartphones oder langsamen Browsern kann das zu Ruckeln, verzögerter Scroll-Reaktion oder sichtbarem Nachladen führen.
Mit visibleEntries wird nur ein Teil gerendert – das hält das UI reaktiv und flüssig.

Aber, die Liste wird immer größer, so dass am Ende doch 670 Elemente gerendert werden müssen,
und es dazu kommen kann, dass die Ansicht ruckelt.

Sinnvoller wäre es, immer nur einen Teil überhaupt anzuzeigen, also sowas wie
slice:visibleEntries-30,visibleEntries

Dann müsste man aber auch dafür sorgen, dass beim Zurückscrollen die Elemente wieder geladen werden und
ein wichtiges Problem in diesem Fall: Durch das Entfernen der oberen Elemente verändert sich die Länge
des Scrollbereichs und die Anzeige wird sehr wahrscheinlich (und evtl. abhängig vom Endgerät) springen.

Die praktische Überlegung ist daher:
Wird überhaupt jemand die Liste mit den 670 Einträgen komplett durchscrollen oder lieber gleich
auf die Suchfunktion oder die Kategorien ausweichen?

Kleiner Exkurs zum Thema Pipes:

Eine Pipe ist ein Hilfswerkzeug in Angular, mit dem man Werte direkt im Template umwandeln oder 
formatieren kannst – ohne extra Code in der Komponente schreiben zu müssen.

Man erkennt Pipes am senkrechten Strich |.

Beispiele:

<!-- Zahl formatieren -->
{{ 3.14159 | number:'1.2-2' }}      → 3,14

<!-- Datum formatieren -->
{{ today | date:'dd.MM.yyyy' }}    → 09.06.2025

<!-- Großbuchstaben -->
{{ 'hello' | uppercase }}          → HELLO

<!-- Array kürzen -->
<div *ngFor="let item of eintraege | slice:0:10">
  {{ item.name }}
</div>

Warum sind Pipes nützlich?

Sie vereinfachen das Template.
Du kannst Daten direkt im HTML anzeigen und anpassen, ohne extra Methoden zu schreiben.
Sie sind leicht zu lesen und helfen, Code übersichtlich zu halten.

Merksatz:

Pipes verarbeiten Daten im Template, so wie ein Wasserrohr (Pipe) Wasser 
verarbeitet – sie leiten etwas durch und verändern es dabei.


Uhrzeiten hervorheben

Die Daten aus der API sind nach Beginn-Uhrzeit geordnet.
Dies können wir ausnutzen, um in die Auflistung die Uhrzeiten mit anzugeben und zwar immer dann,
wenn die Uhrzeit beim nächsten Eintrag wechselt.

Dazu implementieren wir in unsere TS-Datei der Seite, auf der die Auflistung erfolgt, folgende Methode:

 // Funktion für das Setzen des aktuellen Beginndatums
  setBeginn(eintrag: EintragData, index: number): boolean {
    // Wenn es sich um das erste Element oder ein neues Beginndatum handelt
    if (index === 0 || eintrag.beginn !== this.lastBeginn) {
      this.lastBeginn = eintrag.beginn; // Setze den Wert des aktuellen Beginndatums
      return true; // Zeige das Beginndatum an
    }
    return false; // Andernfalls das Beginndatum nicht anzeigen
  }

  Wir übergeben der Methode zwei Parameter, einmal den aktuellen Eintrag, den wir anzeigen wollen,
  zum Zweiten den Index dieses Eintrags in unserem Array, welches sämgliche Einträge enthält.

  Die Methode liefert true zurück, wenn es sich um den allerersten Eintrag handelt (index == 0),
  oder sich der beginn-Wert von dem gespeicherten this.lastBeginn unterscheidet.
  lastbeginn wird als Eigenschaft der Klasse oben definiert.

  lastBeginn: string = '';  // Verfolgt den letzten Wert von "beginn"


  Da dieser Wert zu Beginn auf "" gesetzt wird, würde es im Prinzip ausreichen, auf die Unterscheidung
  von eintrag.beginn !== this.lastBeginn zu setzen. Allerdings müssen wir dann sicherstellen,
  dass der Wert von lastBeginn bei einem Neuzeichnen der Seite auch wieder auf "" gesetzt wird.
  Insoweit ist die Nutzung des Index entspannter.

  Um den Index im Template zu erhalten, müssen wir unser *ngFor wie folgt erweitern:

   <div *ngFor="let item of getdataservice.data | slice:0:visibleEntries; let i = index">
 
 Dies sorgt dafür, dass wir innerhalb der Schleife den Index des aktuellen Eintrags in i
 gespeichert haben.

 jetzt brauchen wir nur noch folgenden (oder ählichen) Code vor den <app-eintrag> zu stellen:

       <div *ngIf="setBeginn(item, i)">
        <h2>{{ item.beginn }} Uhr</h2>
      </div>


Also insgesamt:

  <div *ngFor="let item of getdataservice.data | slice:0:visibleEntries; let i = index">
    <div *ngIf="setBeginn(item, i)">
      <h2>{{ item.beginn }} Uhr</h2>
    </div>
    <app-eintrag (click)="zeigeEintrag(item)" [eintrag]="item"></app-eintrag>
  </div>


Die Gestaltung überlasse ich Ihnen :-)


Auswahlmenü für Komplett/Themen/etc. 

In der App sind für das Programm unterschiedliche Voreinstellungen gegeben
So kann das komplette Programm angezeigt werden (wie bisher) oder es wird
nach Themen, Formaten, Orten oder Einrichtungen sortiert.

Desweiteren soll eine Suchfunktion ergänzt werden.

Um diese Auswahl zu implementieren, wird einfach ein weiterer <ion-toolbar>
im <ion-header> ergänzt. Dort findet das <ion-segment> Verwendung.
Ein IonSegment hat verschiedene IonSegmentButtons, die jeweils einen unterschiedlichen
Value haben. Dieser Value wird über Databinding mit der Eigenschaft selectedSegment
verbunden.

 <ion-toolbar class="toolbar-normal">
    <ion-segment [scrollable]="true" [(ngModel)]="selectedSegment" class="segment-normal">
      <ion-segment-button value="Komplett" (click)="setSegmentLabel('Komplett'); setEintraege()">
        <ion-icon src="../../../assets/myicons/Programm.svg"></ion-icon>
      </ion-segment-button>
      <ion-segment-button value="Themen" (click)="setSegmentLabel('Themen'); setEintraege()">
        <ion-icon src="../../../assets/myicons/Themen.svg"></ion-icon>
      </ion-segment-button>
      <ion-segment-button value="Formate" (click)="setSegmentLabel('Formate'); setEintraege()">
        <ion-icon src="../../../assets/myicons/Formate.svg"></ion-icon>
      </ion-segment-button>
      <ion-segment-button value="Orte" (click)="setSegmentLabel('Orte'); setEintraege()">
        <ion-icon src="../../../assets/myicons/orte.svg"></ion-icon>
      </ion-segment-button>
      <ion-segment-button value="Einrichtungen" (click)="setSegmentLabel('Einrichtungen'); setEintraege()">
        <ion-icon src="../../../assets/myicons/Einrichtungen.svg"></ion-icon>
      </ion-segment-button>
    </ion-segment>
  </ion-toolbar>
<ion-header>

Beim Touch auf einen der Buttons wird also der Wert von selectedSegment gesetzt und es werden jeweils
die beiden Methoden setSegmentLabel() und setEintraege() aufgerufen.

selectedSegment: string = 'Komplett'; // Aktuell ausgewähltes Segment

Je nach ausgewähltem Button werden unterschiedliche Dinge angezeigt:

1. Bei Komplett wird das angezeigt, was sie bisher programmiert haben
2. Bei Themen, Formaten, Orten oder Einrichtungen wird jedoch eine entsprechende
Liste angezeigt und erst nach Klick auf einen Eintrag in dieser Liste werden wieder
Eintraege angezeigt.

Um unterscheiden zu können, was angezeigt werden soll, ergänzen sie eine
Eigenschaft 

contentSelector: string = 'Komplett';

sowie eine Eigenschaft 

 segmentLabel: string = 'Komplett'; // Standardtext für das Textfeld

Diese wird für die Anzeige im Header verwendet.

In der Methode setSegmentLabel() setzen Sie die beiden Eigenschaften auf den 
übergebenen Wert:

// Methode zur Aktualisierung des Textes im Textfeld
  setSegmentLabel(label: string) {
    //console.log('setSegmentLabel', label);
    this.segmentLabel = label;
    this.contentSelector = label;
  }

Wenn Sie noch die Methode

   setEintraege() {
  }

erst mal als leere Methode einfügen, dann sollte zumindest das Menü klappen
und der Headertext sich anpassen.

Um jetzt auf der Seite unterschiedliche Dinge anzuzeigen, können wir uns
an der Eigenschaft contentSelector orientieren und mit bedingten Anweisungen
arbeiten:

<div *ngIf="contentSelector === 'Komplett'">
  <div *ngFor="let item of getdataservice.data | slice:0:visibleEntries; let i = index">
    <div *ngIf="setBeginn(item, i)">
      <h2>{{ item.beginn }} Uhr</h2>
    </div>
    <app-eintrag (click)="zeigeEintrag(item)" [eintrag]="item"></app-eintrag>
  </div>
  <ion-infinite-scroll (ionInfinite)="ladeMehrDaten($event)">
    <ion-infinite-scroll-content loadingSpinner="bubbles" loadingText="Lade mehr Einträge...">
    </ion-infinite-scroll-content>
  </ion-infinite-scroll>
</div>

Der bisherige Code wird also nur ausgeführt, wenn "Komplett" ausgewählt ist.




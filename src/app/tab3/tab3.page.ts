import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { IonSegment, IonSegmentButton,IonSearchbar, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [FormsModule,CommonModule,IonSegment, IonSegmentButton, IonSearchbar, IonIcon, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class Tab3Page {

  @ViewChild('segmentEl', { read: ElementRef }) segmentEl!: ElementRef;

  public selectedSegment: string = 'Komplett';
  public searchTerm: string = '';
  public showSearch: boolean = false;
  

ngAfterViewInit() {
  this.scrollToSelectedSegment();
}

ngOnChanges() {
  this.scrollToSelectedSegment();
}

scrollToSelectedSegment() {
  const selected = this.segmentEl.nativeElement.querySelector('ion-segment-button[aria-pressed="true"]');
  if (selected) {
    selected.scrollIntoView({ behavior: 'smooth', inline: 'center' });
  }
}

  constructor() {}

  setEintraege() {
  }

  setSegmentLabel(s: string) {
  }
}

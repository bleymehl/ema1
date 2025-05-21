import { Component, Input, OnInit } from '@angular/core';
import { EintragData } from '../../services/getdata.service';

@Component({
  selector: 'app-eintrag',
  templateUrl: './eintrag.component.html',
  styleUrls: ['./eintrag.component.scss'],
  standalone: true,
})
export class EintragComponent  implements OnInit {
  @Input() eintrag: EintragData = {} as EintragData;

  constructor() { }

  ngOnInit() {}

}

import {Component, Input, OnInit} from '@angular/core';
import {IonicModule} from "@ionic/angular"
import {NgForOf, NgIf} from "@angular/common"

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss'],
  imports: [
    IonicModule,
    NgForOf,
    NgIf
  ],
  standalone: true
})
export class SlideshowComponent  implements OnInit {
  @Input() images?: string[]

  constructor() { }

  ngOnInit() {}

}

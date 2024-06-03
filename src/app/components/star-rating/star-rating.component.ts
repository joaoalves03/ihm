import {Component, Output, EventEmitter, AfterViewInit} from '@angular/core';
import {NgForOf} from "@angular/common"

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  standalone: true,
  imports: [
    NgForOf
  ],
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent implements AfterViewInit {
  @Output() ratingUpdated = new EventEmitter<number>();

  constructor() {
    document.getElementById("rate")
  }

  ngAfterViewInit() {
    const ratingRadios = document.querySelectorAll('input[name="rating"]');

    ratingRadios.forEach((radio) => {
      radio.addEventListener('change', (event) => {
        this.ratingUpdated.emit(Number.parseInt((event.target! as HTMLInputElement).value))
      })
    });
  }
}

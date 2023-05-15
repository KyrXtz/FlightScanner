import { Component, Input, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-background-carousel',
  templateUrl: './background-carousel.component.html',
  styleUrls: ['./background-carousel.component.css'],
  animations: [
    trigger('fade', [
      state('show', style({opacity: 1})),
      state('hide', style({opacity: 0})),
      transition('show <=> hide', [
        animate('3s')
      ])
    ])
  ]
})
export class BackgroundCarouselComponent implements OnInit {
  @Input() images: string[] =[];
  imageStates: { url: string, state: string }[] = [];
  currentImageIndex = 0;

  constructor() { }

  ngOnInit(): void {
    this.images.forEach(image => this.imageStates.push({url: image, state: 'hide'}));
    this.imageStates[0].state = 'show';
    setInterval(() => this.changeImage(), 10000);
  }

  changeImage(): void {
    this.imageStates[this.currentImageIndex].state = 'hide';
    this.currentImageIndex = (this.currentImageIndex + 1) % this.imageStates.length;
    this.imageStates[this.currentImageIndex].state = 'show';
  }
}

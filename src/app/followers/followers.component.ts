import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  templateUrl: './followers.component.html'
})
export class FollowersComponent {
  imgUrl: SafeUrl;

  constructor(public domSanitizer: DomSanitizer) {
    const url1 = './assets/car.jpg';
    const url2 = 'http://lorempixel.com/600/400';
    this.imgUrl = domSanitizer.bypassSecurityTrustUrl(url2);
  }
}

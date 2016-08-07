import { Component, OnInit } from '@angular/core';
import { AdService } from '../core/ad.service';

@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html'
})
export class AdComponent implements OnInit {
  private ads: any = [];
  constructor(private adService: AdService) {}

  ngOnInit(): void {
    this.adService.getAds().subscribe(
      (result: any) => {
        console.log(result);
        this.ads = result.ads;
      },
      (err: any) => {
        console.error(err);
      }
    );
  }
}

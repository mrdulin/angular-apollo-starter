import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tool-tip',
  templateUrl: './tooltip.component.html'
})
export class TooltipComponent implements OnInit {
  @Input() text: string;
  @Input() label: string;
  @Input() icon: String;

  show = false;

  constructor() {}

  ngOnInit() {}

  onMouseEnter() {
    this.show = true;
  }

  onMouseLeave() {
    this.show = false;
  }
}

import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-center-card',
  templateUrl: './center-card.component.html',
  styleUrls: ['./center-card.component.sass']
})
export class CenterCardComponent implements OnInit {
  @Input() title!: string;
  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Element } from '../models/element.model';

@Component({
  selector: 'app-element-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './element-card.html',
  styleUrls: ['./element-card.css']
})
export class ElementCard {

  @Input() element!: Element;

  constructor(private router: Router) {}

  goToDon() {
  this.router.navigate(['/donform', this.element.id]);   // /donform/3 par ex.
}


  imageError(event: any) {
    event.target.src = 'assets/images/default.png';
  }
}

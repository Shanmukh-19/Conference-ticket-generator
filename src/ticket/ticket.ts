import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ticket',
  imports: [],
  templateUrl: './ticket.html',
  styleUrl: './ticket.css'
})
export class Ticket {
  @Input() userData!: { name: string; email: string };
  @Input() imageUrl!: string;
}

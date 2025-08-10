import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ValidationForm } from '../validation-form/validation-form';
import { Ticket } from '../ticket/ticket';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, ValidationForm, Ticket, NgIf],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  showTicket = false;

  ticketData: any = {
    name: '',
    email: '',
    imageUrl: ''
  };

  handleFormSuccess(data: { name: string; email: string; imageUrl: string }) {
    this.ticketData = data;
    this.showTicket = true;
  }
}

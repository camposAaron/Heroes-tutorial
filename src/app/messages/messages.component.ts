import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  messageService1: MessageService;
   
  constructor(public messageService: MessageService) {
      this.messageService1 = messageService;
   }

  ngOnInit(): void {
  }

}

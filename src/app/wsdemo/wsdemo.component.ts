import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../web-socket.service';

@Component({
  selector: 'app-wsdemo',
  templateUrl: './wsdemo.component.html',
  styleUrls: ['./wsdemo.component.css']
})
export class WsdemoComponent implements OnInit {
  public messages: any[] = [];

  constructor(private webSocketService: WebSocketService) {}

  ngOnInit(): void {
    this.webSocketService.messages$.subscribe((message) => {
      this.messages = message;
      console.log('Received message ---->', this.messages);
    });
  }
}

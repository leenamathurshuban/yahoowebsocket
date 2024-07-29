import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as protobuf from 'protobufjs';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private ws: any;
  private readonly url = 'wss://streamer.finance.yahoo.com';
  private readonly messageSubject = new Subject<any>();
  private Yaticker: any;

  public messages$ = this.messageSubject.asObservable();

  constructor() {
    this.initWebSocket();
  }

  private async initWebSocket() {
    try {
      // Load protobuf schema
      const root = await protobuf.load('/assets/YPricingData.proto');
      this.Yaticker = root.lookupType('yaticker');

      // Initialize WebSocket
      this.ws = new WebSocket(this.url);
      
      this.ws.onopen = () => {
        console.log('connected');
        this.ws.send(JSON.stringify({ subscribe: ['MSFT']}));
      };

      this.ws.onclose = () => {
        console.log('disconnected');
      };

      this.ws.onmessage = (event: any) => {
        const binaryData = atob(event.data as string);
        const bytes = new Uint8Array(binaryData.length);
        for (let i = 0; i < binaryData.length; i++) {
          bytes[i] = binaryData.charCodeAt(i);
        }
        const decodedMessage = this.Yaticker.decode(bytes);
        this.messageSubject.next(decodedMessage);
      };
    } catch (error) {
      console.error('Error initializing WebSocket:', error);
    }
  }
}

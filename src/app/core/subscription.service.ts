import { Injectable } from '@angular/core';
import { SubscriptionClient } from 'subscriptions-transport-ws';

@Injectable()
export class SubscriptionService {
  private wsc: SubscriptionClient;

  constructor() {}

  public getWSClient(uri?, options = {}) {
    if (this.wsc) {
      return this.wsc;
    }
    if (uri) {
      this.wsc = new SubscriptionClient(uri, options);
    }
    if (this.wsc) {
      this.bindEvent();
    }
    return this.wsc;
  }

  public close() {
    if (this.wsc) {
      this.wsc.close();
    }
  }

  private bindEvent() {
    this.wsc.onConnecting(() => {
      console.log('ws connecting');
    });
    this.wsc.onConnected(() => {
      console.log('ws connected');
    });
    this.wsc.onReconnecting(() => {
      console.log('ws reconnecting');
    });
    this.wsc.onReconnected(() => {
      console.log('ws reconnected');
    });
    this.wsc.onDisconnected(() => {
      console.log('ws disconnected');
    });
    this.wsc.onError(() => {
      console.log('ws error');
    });
  }
}

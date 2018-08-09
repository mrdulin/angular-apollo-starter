import { SubscriptionClient } from 'subscriptions-transport-ws';

function createSubscribeClient(uri, options) {
  const subscriptionClient = new SubscriptionClient(uri, options);

  subscriptionClient.onConnecting(() => {
    console.log('ws connecting');
  });
  subscriptionClient.onConnected(() => {
    console.log('ws connected');
  });
  subscriptionClient.onReconnecting(() => {
    console.log('ws reconnecting');
  });
  subscriptionClient.onReconnected(() => {
    console.log('ws reconnected');
  });
  subscriptionClient.onDisconnected(() => {
    console.log('ws disconnected');
  });
  subscriptionClient.onError(() => {
    console.log('ws error');
  });

  return subscriptionClient;
}

export { createSubscribeClient };

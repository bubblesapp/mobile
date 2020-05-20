/* eslint-env serviceworker */

self.version = '59';

/**
 * Store notification icon string in service worker.
 * Ref: https://stackoverflow.com/a/35729334/2603230
 */
self.addEventListener('message', (event) => {
  let data;
  if (typeof event.data === 'string') {
    try {
      data = JSON.parse(event.data);
    } catch (e) {}
  }

  if (event?.data?.action === 'skipWaiting') {
    self
      .skipWaiting()
      .then(() => {
        console.log('skipWaiting success');
      })
      .catch((err) => console.error(err));
  }

  if (data && data.fromExpoWebClient) {
    self.notificationIcon = data.fromExpoWebClient.notificationIcon;
  }
});

/**
 * Add support for push notification.
 */
self.addEventListener('push', (event) => {
  let payload = {};
  try {
    payload = event.data.json();
  } catch (e) {
    // If `event.data.text()` is not a JSON object, we just treat it
    // as a plain string and display it as the body.
    payload = {title: '', body: event.data.text()};
  }

  const title = payload.title;
  let options = {
    body: payload.body,
    data: payload.data || {},
  };
  options.icon = options.data._icon || self.notificationIcon || null;
  if (options.data._tag) {
    options.tag = options.data._tag;
    options.renotify = options.data._renotify;
  }
  if (options.data._richContent && options.data._richContent.image) {
    options.image = options.data._richContent.image;
  }
  event.waitUntil(self.registration.showNotification(title, options));
});

// https://developer.mozilla.org/en-US/docs/Web/API/Clients
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  event.waitUntil(
    (async () => {
      const allClients = await self.clients.matchAll({
        includeUncontrolled: true,
      });

      let appClient;

      let path = event.notification.data._webPath || '/';

      // If we already have a window open, use it.
      for (const client of allClients) {
        const url = new URL(client.url);

        if (url.pathname === path) {
          client.focus();
          appClient = client;
          break;
        }
      }

      // If there is no existing window, open a new one.
      if (!appClient) {
        appClient = await self.clients.openWindow(path);
      }

      // Message the client:
      // `origin` will always be `'selected'` in this case.
      // https://docs.expo.io/versions/latest/sdk/notifications/#notification
      appClient.postMessage({
        origin: 'selected',
        data: event.notification.data,
        remote: !event.notification._isLocal,
      });
    })(),
  );
});

// TODO: Consider cache: https://github.com/expo/expo-cli/pull/844#issuecomment-515619883
// Import the script generated by workbox.
self.importScripts('service-worker.js');

/* eslint-env browser */

let newWorker;

document
  .getElementById('update-button-container')
  .addEventListener('click', function () {
    newWorker.postMessage({action: 'skipWaiting'});
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker
      .register('SW_PUBLIC_URL/expo-service-worker.js', { scope: 'SW_PUBLIC_SCOPE' })
      .then((reg) => {
        /* reg.onupdatefound = (e) => {
          console.log('onUpdateFound', reg);
          if (reg.installing) {
            newWorker = reg.installing;
            newWorker.onstatechange = () => {
              console.log('onStateChange', newWorker);
              if (newWorker.state === 'installed') {
                if (navigator.serviceWorker.controller) {
                  console.log('New worker installed and ready', newWorker);
                  const updateContainer = document.getElementById(
                    'update-button-container',
                  );
                  updateContainer.className = 'show';
                }
              }
            };
          }
        }; */
        console.info('Registered service-worker', reg);
      })
      .catch((error) => {
        console.info('Failed to register service-worker', error);
      });
  });
}

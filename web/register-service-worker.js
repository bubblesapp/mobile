/* eslint-env browser */

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker
      .register('SW_PUBLIC_URL/expo-service-worker.js', { scope: 'SW_PUBLIC_SCOPE' })
      .then((reg) => {
        reg.addEventListener('updatefound', () => {
          console.log('Update found');
        });
        console.info('Registered service-worker', reg);
      })
      .catch((error) => {
        console.info('Failed to register service-worker', error);
      });
  });
}

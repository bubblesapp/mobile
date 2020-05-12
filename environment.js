export default {
  dev: {
    baseUrl: 'https://dev.app.bubblesapp.org',
    dynamicLinksDomain: 'https://bubblesdev.page.link',
    firebaseConfig: {
      apiKey: 'AIzaSyB1uHwOarBrIvaSYnMgYxnoH1UKWGkIiUc',
      projectId: 'bubbles-273e5',
    },
    amplitudeApiKey: '41b056c6aeac11a585c452d99f55cddd',
  },
  prod: {
    baseUrl: 'https://app.bubblesapp.org',
    dynamicLinksDomain: 'https://bubblesapp.page.link',
    firebaseConfig: {
      apiKey: 'AIzaSyDw0EoUgxXmnsTk7AWfHXy2CwMn3_kT_CQ',
      projectId: 'bubbles-prod',
    },
    amplitudeApiKey: '60dde9e00112aaf6475a7c95c935239a',
  },
};

/* module.exports = function ({config, mode}) {
  const env = require('./active.env');
  const dotenv = require('dotenv');

  dotenv.config({path: `.env.${env}`});
  return {
    ...config,
    extra: {
      baseUrl: process.env.BASE_URL,
      dynamicLinksDomain: process.env.DYNAMIC_LINKS_DOMAIN,
      firebaseConfig: {
        apiKey: process.env.FIREBASE_API_KEY,
        projectId: process.env.FIREBASE_PROJECT_ID,
      },
      amplitudeApiKey: process.env.AMPLITUDE_API_KEY,
    },
  };
}; */

module.exports = function ({config, mode}) {
  const env = require('./active.env');
  const dotenv = require('dotenv');
  return {
    name: 'Bubbles',
    version: '1.0.0',
  };
};

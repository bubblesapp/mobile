const env = require('./active.env');
const dotenv = require('dotenv');

dotenv.config({path: `.env.${env}`});

module.exports = function ({config, mode}) {
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
};

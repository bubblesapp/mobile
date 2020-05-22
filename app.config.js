import env from './active.env';
import dotenv from 'dotenv';

dotenv.config();

export default function ({config, mode}) {
  return {
    ...config,
    extra:
      env === 'prod'
        ? {
            baseUrl: process.env.PROD_BASE_URL,
            dynamicLinksDomain: process.env.PROD_DYNAMIC_LINKS_DOMAIN,
            firebaseConfig: {
              apiKey: process.env.PROD_FIREBASE_API_KEY,
              projectId: process.env.PROD_FIREBASE_PROJECT_ID,
            },
            amplitudeApiKey: process.env.PROD_AMPLITUDE_API_KEY,
          }
        : {
            baseUrl: process.env.DEV_BASE_URL,
            dynamicLinksDomain: process.env.DEV_DYNAMIC_LINKS_DOMAIN,
            firebaseConfig: {
              apiKey: process.env.DEV_FIREBASE_API_KEY,
              projectId: process.env.DEV_FIREBASE_PROJECT_ID,
            },
            amplitudeApiKey: process.env.DEV_AMPLITUDE_API_KEY,
          },
  };
}

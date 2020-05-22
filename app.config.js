import env from './active.env';
import dotenv from 'dotenv';

dotenv.config({path: `.env.${env}`});

export default function ({config, mode}) {
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
}

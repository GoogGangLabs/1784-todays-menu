import dotenv = require('dotenv');
import { path } from 'app-root-path';

import LogStrategy from '@strategy/log.strategy';

type NodeENV = 'production' | 'development' | 'local';

if (process.env.NODE_ENV === 'local') {
  dotenv.config({ path: `${path}/env/.env.local` });
} else if (process.env.NODE_ENV !== 'development' && process.env.NODE_ENV !== 'production') {
  LogStrategy.error('Environment', 'NODE_ENV must be set to Mandatory.', true);
}

const Environ = {
  // Server Config
  NODE_ENV: process.env.NODE_ENV as NodeENV,
  SERVER_PORT: +process.env.SERVER_PORT || 3000,

  // BAND Config
  BAND_URL: process.env.BAND_URL,
  BAND_TOKEN: process.env.BAND_TOKEN,
  BAND_KEY: process.env.BAND_KEY,
  BAND_ID: process.env.BAND_ID,
  BAND_FIRST_POST_ID: +process.env.BAND_FIRST_POST_ID,

  // Database Config
  MYSQL_HOST: process.env.MYSQL_HOST,
  MYSQL_PORT: +process.env.MYSQL_PORT,
  MYSQL_USER: process.env.MYSQL_USER,
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
  MYSQL_DATABASE: process.env.MYSQL_DATABASE,

  // Slack Config
  SLACK_TOKEN: process.env.SLACK_TOKEN,
  SLACK_CHANNEL_ID: process.env.SLACK_CHANNEL_ID,
} as const;
type Environ = (typeof Environ)[keyof typeof Environ];

for (const key in Environ)
  if (!Environ[key]) LogStrategy.error('Environment', `Required properties [${key}] is missing.`, true);

export default Environ;

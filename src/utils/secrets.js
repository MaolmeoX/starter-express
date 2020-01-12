const dotenv = require('dotenv');
const fs = require('fs');

if (fs.existsSync('.env')) {
  dotenv.config({ path: '.env' });
}
const ENVIRONMENT = process.env.NODE_ENV;
const isProd = ENVIRONMENT === 'production';

const { SESSION_SECRET } = process.env;
const MONGODB_URI = isProd
  ? process.env.MONGODB_URI
  : process.env.MONGODB_URI_LOCAL;

if (!SESSION_SECRET) {
  process.exit(1);
}

if (!MONGODB_URI) {
  process.exit(1);
}

const jwtSecret = process.env.JWT_SECRET;

export { MONGODB_URI, SESSION_SECRET, isProd, jwtSecret };

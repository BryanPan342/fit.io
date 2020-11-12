var fs = require('fs');
var path = require('path');

/* Write .env file */
process.stdout.write('Writing to dotenv file .. ');
const config = [
  'API_KEY', 'AUTH_DOMAIN', 'DATABASE_URL', 'PROJECT_ID', 
  'STORAGE_BUCKET', 'MESSAGING_SENDER_ID', 'APP_ID', 'MEASUREMENT_ID'
];
const dotenv = config.reduce((acc, curr) => `${acc}${curr}=${process.env[curr]}\n`,'');
fs.writeFileSync(path.resolve(__dirname, '../.env'), dotenv);
process.stdout.write('done\n');
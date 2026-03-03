const fs = require('fs');
const path = require('path');

const headersContent = `/_next/static/chunks/*.css
  Content-Type: text/css; charset=utf-8
  Cache-Control: public, max-age=31536000, immutable

/_next/static/css/*.css
  Content-Type: text/css; charset=utf-8
  Cache-Control: public, max-age=31536000, immutable

/_next/static/*.css
  Content-Type: text/css; charset=utf-8
  Cache-Control: public, max-age=31536000, immutable

/_next/static/chunks/*.js
  Content-Type: application/javascript; charset=utf-8
  Cache-Control: public, max-age=31536000, immutable

/_next/static/*.js
  Content-Type: application/javascript; charset=utf-8
  Cache-Control: public, max-age=31536000, immutable
`;

const nextDir = path.join(process.cwd(), '.next');
const headersPath = path.join(nextDir, '_headers');

if (fs.existsSync(nextDir)) {
  fs.writeFileSync(headersPath, headersContent);
  console.log('✓ Created _headers file in .next directory');
} else {
  console.log('⚠ .next directory not found');
}

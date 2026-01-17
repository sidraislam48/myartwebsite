const http = require('http');

const testData = JSON.stringify({
  username: 'testuser123',
  email: 'test@example.com',
  password: 'password123'
});

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/users/register',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(testData)
  }
};

console.log('Sending request to backend...');

const req = http.request(options, (res) => {
  let responseData = '';
  
  console.log('Status Code:', res.statusCode);
  
  res.on('data', (chunk) => {
    responseData += chunk;
  });
  
  res.on('end', () => {
    console.log('Response:', responseData);
    try {
      console.log('Parsed:', JSON.parse(responseData));
    } catch (e) {
      console.log('Error parsing JSON:', e.message);
    }
  });
});

req.on('error', (error) => {
  console.error('Request Error:', error);
});

req.write(testData);
req.end();

setTimeout(() => {
  console.log('Test completed');
  process.exit(0);
}, 2000);

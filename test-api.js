// test-api.js
const { exec } = require('child_process');

function testSignup() {
  const curlCommand = `curl -X POST http://localhost:3000/api/auth/signup -H "Content-Type: application/json" -d "{\\"name\\":\\"Test User\\",\\"email\\":\\"test@example.com\\",\\"password\\":\\"testpass123\\",\\"userType\\":\\"student\\"}"`;

  exec(curlCommand, (error, stdout, stderr) => {
    if (error) {
      console.error('Signup test failed:', error);
      return;
    }
    console.log('Signup response:', stdout);
  });
}

function testServiceCreation() {
  const curlCommand = `curl -X POST http://localhost:3000/api/services/create -H "Content-Type: application/json" -d "{\\"name\\":\\"Test Service\\",\\"title\\":\\"Test Title\\",\\"description\\":\\"Test Description\\",\\"price\\":\\"50\\",\\"works\\":[\\"work1\\",\\"work2\\"]}"`;

  exec(curlCommand, (error, stdout, stderr) => {
    if (error) {
      console.error('Service creation test failed:', error);
      return;
    }
    console.log('Service creation response:', stdout);
  });
}

console.log('Testing signup...');
testSignup();

setTimeout(() => {
  console.log('Testing service creation...');
  testServiceCreation();
}, 2000);
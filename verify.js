const { Verifier } = require('@pact-foundation/pact');

// Define the options for the verifier
const opts = {
  providerBaseUrl: 'http://127.0.0.1:8081', // Changed from 'localhost'
  pactUrls: [
    'C:\\Users\\nithi\\Videos\\Captures\\New folder\\project\\pacts\\cardconsumer-cardprovider.json'
  ],
  log: 'C:\\Users\\nithi\\Videos\\Captures\\New folder\\project\\logs\\pact.log',
  logLevel: 'DEBUG'
};

// Log the options for verification
console.log('Options:', opts);

// Create a new verifier instance
const verifier = new Verifier(opts);

// Verify the provider
verifier.verifyProvider()
  .then(result => {
    console.log('Verification result:', result);
  })
  .catch(error => {
    console.error('Verification error:', error);
  });

const path = require('path');
const { Pact } = require('@pact-foundation/pact');
const axios = require('axios');
const chai = require('chai');
const { expect } = chai;

const provider = new Pact({
    consumer: 'CardConsumer',
    provider: 'CardProvider',
    port: 8081,
    log: path.resolve(process.cwd(), 'logs', 'pact.log'),    // Specify the log path
    dir: path.resolve(process.cwd(), 'pacts'),               // Specify the pact file directory
    logLevel: 'INFO',                                        // Log level
    spec: 2                                                  // Pact specification version
});

describe('Card Service Consumer', () => {
    // Setup the mock provider before running tests
    before(() => provider.setup());
    
    // Cleanup after tests and finalize the pact
    after(() => provider.finalize());

    // Add interaction before each test
    beforeEach(() => {
        const interaction = {
            state: 'provider has cards',
            uponReceiving: 'a request for card details',
            withRequest: {
                method: 'GET',
                path: '/debit-cards',
            },
            willRespondWith: {
                status: 200,
                body: {
                    "debit-cards": {
                        "cards": [
                            {
                                "pan": "4921817339634912",
                                "cardID": 253606632,
                                "nameOnCard": "MR J STEPHEN",
                                // Add other properties as necessary
                            }
                        ],
                    },
                },
            },
        };

        return provider.addInteraction(interaction);
    });

    // The actual test
    it('should fetch card details successfully', async () => {
        const response = await axios.get('http://localhost:8081/debit-cards');
        expect(response.status).to.equal(200);
        expect(response.data).to.have.property('debit-cards');
    });

    // Verify the provider after the test
    afterEach(() => {
        return provider.verify(); // Verifies that all interactions were called
    });
});

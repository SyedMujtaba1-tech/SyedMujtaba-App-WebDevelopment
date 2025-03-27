const paypal = require('@paypal/checkout-server-sdk');

// Set up PayPal environment
function environment() {
    const clientId = 'AYa2JPyRtdks9rMyaPezmW_zEbwUjYWN_O0pFFrWnIWuOqjxDisVaTilrYcSjjUY1euhSxS38iZHVN_p'; // Replace with your Client ID
    const clientSecret = 'EHuDj7dvFtT3Vn7dQpL2MjfBFOJd3p54BlbK-RBp40jQmxvtsRRydIGi04K6iol0V3ehbKKzb-nphBva'; // Replace with your Client Secret
    return new paypal.core.SandboxEnvironment(clientId, clientSecret);
}

// Create PayPal client
function client() {
    return new paypal.core.PayPalHttpClient(environment());
}

// Create Payment Route
app.post('/create-payment', async (req, res) => {
    const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
                currency_code: 'USD',
                value: '10.00',
            },
        }],
    });

    try {
        const response = await client().execute(request);
        res.json({ orderID: response.result.id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
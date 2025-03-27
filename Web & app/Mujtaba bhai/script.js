// Form Validation for Card Payment
document.getElementById('card-payment-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const cardNumber = document.getElementById('card-number').value;
  const expiryDate = document.getElementById('expiry-date').value;
  const cvv = document.getElementById('cvv').value;
  const cardholderName = document.getElementById('cardholder-name').value;

  if (!cardNumber || !expiryDate || !cvv || !cardholderName) {
    alert('Please fill out all fields.');
    return;
  }

  if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ''))) {
    alert('Please enter a valid 16-digit card number.');
    return;
  }

  if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
    alert('Please enter a valid expiry date (MM/YY).');
    return;
  }

  if (!/^\d{3}$/.test(cvv)) {
    alert('Please enter a valid 3-digit CVV.');
    return;
  }

  alert('Payment successful! Thank you for your purchase.');
  // Here you can add code to process the payment (e.g., send data to a server).
});

// Render the PayPal button
paypal.Buttons({
  // Set up the transaction
  createOrder: function (data, actions) {
    return actions.order.create({
      purchase_units: [{
        amount: {
          value: '29.99' // Set the payment amount here (e.g., $29.99)
        }
      }]
    });
  },

  // Finalize the transaction
  onApprove: function (data, actions) {
    return actions.order.capture().then(function (details) {
      // Show a success message to the buyer
      alert('Transaction completed by ' + details.payer.name.given_name + '!');
      // You can redirect the user to a thank-you page or update the UI
      window.location.href = 'thank-you.html'; // Redirect to a thank-you page
    });
  },

  // Handle errors
  onError: function (err) {
    console.error('PayPal Error:', err);
    alert('An error occurred during the payment process. Please try again.');
  }
}).render('#paypal-button-container'); // Render the PayPal button in the container

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Parse JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Home Route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Search Route (Example API Endpoint)
app.post('/search', (req, res) => {
    const query = req.body.query;
    // Perform search logic here (e.g., query a database)
    res.json({ message: `You searched for: ${query}` });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/crud-app', { useNewUrlParser: true, useUnifiedTopology: true });
const quantityInput = document.getElementById('quantity');
const quantityDisplay = document.getElementById('quantityDisplay');
const totalPrice = document.getElementById('totalPrice');
const totalPriceSummary = document.getElementById('totalPriceSummary');
const paymentForm = document.getElementById('paymentForm');
const binIdDisplay = document.getElementById('binIdDisplay'); // Add an element to display bin IDs
const pricePerUnit = 59.99;

// Update order summary when quantity changes
quantityInput.addEventListener('input', function () {
    const quantity = parseInt(quantityInput.value) || 1;
    const total = (quantity * pricePerUnit).toFixed(2);

    quantityDisplay.textContent = quantity;
    totalPrice.textContent = `${total}€`;
    totalPriceSummary.textContent = `${total}€`;
});

// Generate unique bin IDs based on quantity
function generateBinIds(quantity) {
    const ids = new Set();
    while (ids.size < quantity) {
        const id = Math.floor(1000 + Math.random() * 9000); // Generate 4-digit number
        ids.add(id);
    }
    return Array.from(ids);
}

// Validate form data
paymentForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    // Get form values
    const cardNumber = document.getElementById('cardNumber').value.trim();
    const cvv = document.getElementById('cvv').value.trim();
    const billingAddress = document.getElementById('billingAddress').value.trim();
    const quantity = parseInt(quantityInput.value) || 1;

    // Validation rules
    const cardNumberRegex = /^\d{16}$/; // Exactly 16 digits
    const cvvRegex = /^\d{3}$/; // Exactly 3 digits

    let errorMessages = [];

    if (!cardNumber) {
        errorMessages.push('Card Number cannot be empty.');
    } else if (!cardNumberRegex.test(cardNumber)) {
        errorMessages.push('Invalid Card Number! Please enter a 16-digit number.');
    }

    if (!cvv) {
        errorMessages.push('CVV cannot be empty.');
    } else if (!cvvRegex.test(cvv)) {
        errorMessages.push('Invalid CVV! Please enter a 3-digit number.');
    }

    if (!billingAddress) {
        errorMessages.push('Billing Address cannot be empty.');
    }

    if (errorMessages.length > 0) {
        alert(errorMessages.join('\n'));
        paymentForm.reset();
        return;
    }

    // Generate bin IDs and display them
    const binIds = generateBinIds(quantity);
    sessionStorage.setItem('quantity', quantity);
    sessionStorage.setItem('binIds', binIds.join(','));

    // Display bin IDs in the DOM
    binIdDisplay.innerHTML = `<strong>Generated Bin IDs:</strong> ${binIds.join(', ')}`;

    // Delay the redirection slightly to allow the user to see the bin IDs
    setTimeout(() => {
        window.location.href = 'payment-success.html';
    }, 2000); // Redirect after 2 seconds
});

// Update Quantity and Total Price Dynamically
const quantityInput = document.getElementById('quantityDisplay');
const quantitySummary = document.getElementById('quantitySummary');
const totalPrice = document.getElementById('totalPrice');
const totalPriceSummary = document.getElementById('totalPriceSummary');
const pricePerUnit = 59.99;

quantityInput.addEventListener('input', function () {
    const quantity = parseInt(quantityInput.value) || 1;
    const total = (quantity * pricePerUnit).toFixed(2);

    quantityDisplay.textContent = quantity;
    totalPrice.textContent = `$${total}`;
    totalPriceSummary.textContent = `$${total}`;
});
const passForm = document.getElementById('pass-form');
const priceInfo = document.getElementById('pass-price-info');
const cartList = document.getElementById('cart-list');
const checkoutButton = document.getElementById('checkout-button');

const passPrices = {
  'half-day': 80,
  'full-day': 150,
  'season-full': 2000,
  'season-noon': 1200,
};

// Updating names to be more descriptive
const passNames = {
  'half-day': "Day Pass - Half Day",
  'full-day': "Day Pass - Full Day",
  'season-full': "Season Pass - Full Season",
  'season-noon': "Season Pass - Noon and After",
};

// Updates the date to be formatted as "Month Day, Year"
function formatDate(dateStr) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', options);
}

function updatePassPrice() {
  const passType = document.getElementById('pass-type').value;
  const price = passPrices[passType];
  priceInfo.textContent = `Price: $${price}`;
}

// Updates price when pass changes
document.getElementById('pass-type').addEventListener('change', updatePassPrice);

// Adds pass to cart and stores in local storage.
function addToCart(passType, passDate, price) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const formattedDate = formatDate(passDate); // Formatting the date
  const passName = passNames[passType]; // Get the full pass name
  const pass = { passName, passDate: formattedDate, price };
  cart.push(pass);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI();
}

// Deletes pass and updates local storage
function deleteFromCart(index) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);  // Remove the pass at the given index
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI();
}

// Updates the cart to show the passes added
function updateCartUI() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cartList.innerHTML = '';
  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `${item.passName} on ${item.passDate} - $${item.price}`;
    
    // Create a delete button for each item
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-btn');
    deleteButton.addEventListener('click', () => deleteFromCart(index));

    li.appendChild(deleteButton);
    cartList.appendChild(li);
  });
}

// Event listener for form submission
passForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const passType = document.getElementById('pass-type').value;
  const passDate = document.getElementById('pass-date').value;
  const price = passPrices[passType];

  if (passDate) {
    addToCart(passType, passDate, price);
  } else {
    alert('Please select a date for the pass.');
  }
});

// Load cart on page load
updateCartUI();
updatePassPrice();

// Event listener for checkout button
checkoutButton.addEventListener('click', function() {
  alert('Proceeding to checkout...');
});
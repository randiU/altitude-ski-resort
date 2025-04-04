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

// I had to create a separate key for the passes cart to avoid confusion with the lessons cart.
const passesCartKey = 'passesCart'; 

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

document.getElementById('pass-type').addEventListener('change', updatePassPrice);

function addToCart(passType, passDate, price) {
  const cart = JSON.parse(localStorage.getItem(passesCartKey)) || [];
  const formattedDate = formatDate(passDate);
  const passName = passNames[passType];
  const pass = { passName, passDate: formattedDate, price };
  cart.push(pass);
  localStorage.setItem(passesCartKey, JSON.stringify(cart));
  updateCartUI();
}

function deleteFromCart(index) {
  const cart = JSON.parse(localStorage.getItem(passesCartKey)) || [];
  cart.splice(index, 1);
  localStorage.setItem(passesCartKey, JSON.stringify(cart));
  updateCartUI();
}

function updateCartUI() {
  const cart = JSON.parse(localStorage.getItem(passesCartKey)) || [];
  cartList.innerHTML = '';
  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `${item.passName} on ${item.passDate} - $${item.price}`;
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-btn');
    deleteButton.addEventListener('click', () => deleteFromCart(index));

    li.appendChild(deleteButton);
    cartList.appendChild(li);
  });
}

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

updateCartUI();
updatePassPrice();

checkoutButton.addEventListener('click', function() {
  alert('Proceeding to checkout...');
});
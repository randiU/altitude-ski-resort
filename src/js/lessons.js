const lessonForm = document.getElementById('lesson-form');
const priceInfo = document.getElementById('price-info');
const cartList = document.getElementById('cart-list');
const checkoutButton = document.getElementById('checkout-button');

const lessonPrices = {
  children: 100,
  beginner: 150,
  advanced: 200,
};

const lessonNames = {
  children: "Children's Lesson",
  beginner: "Beginner Adult Lesson",
  advanced: "Advanced Lesson",
};

// I had to create a unique key for the lessons cart to avoid conflicts with other carts in local storage
const lessonsCartKey = 'lessonsCart'; 

function formatDate(dateStr) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', options);
}

function updatePrice() {
  const lessonType = document.getElementById('lesson-type').value;
  const price = lessonPrices[lessonType];
  priceInfo.textContent = `Price: $${price}`;
}

document.getElementById('lesson-type').addEventListener('change', updatePrice);

function addToCart(lessonType, lessonDate, price) {
  const cart = JSON.parse(localStorage.getItem(lessonsCartKey)) || [];
  const formattedDate = formatDate(lessonDate); 
  const lessonName = lessonNames[lessonType]; 
  const lesson = { lessonName, lessonDate: formattedDate, price };
  cart.push(lesson);
  localStorage.setItem(lessonsCartKey, JSON.stringify(cart));
  updateCartUI();
}

function deleteFromCart(index) {
  const cart = JSON.parse(localStorage.getItem(lessonsCartKey)) || [];
  cart.splice(index, 1);
  localStorage.setItem(lessonsCartKey, JSON.stringify(cart));
  updateCartUI();
}

function updateCartUI() {
  const cart = JSON.parse(localStorage.getItem(lessonsCartKey)) || [];
  cartList.innerHTML = '';
  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `${item.lessonName} on ${item.lessonDate} - $${item.price}`;
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-btn');
    deleteButton.addEventListener('click', () => deleteFromCart(index));

    li.appendChild(deleteButton);
    cartList.appendChild(li);
  });
}

lessonForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const lessonType = document.getElementById('lesson-type').value;
  const lessonDate = document.getElementById('lesson-date').value;
  const price = lessonPrices[lessonType];

  if (lessonDate) {
    addToCart(lessonType, lessonDate, price);
  } else {
    alert('Please select a date for the lesson.');
  }
});

updateCartUI();
updatePrice();

checkoutButton.addEventListener('click', function() {
  alert('Proceeding to checkout...');
});
// Initialize an empty cart in session storage
sessionStorage.setItem('cart', JSON.stringify([]));

// Function to update the cart
function updateCart() {
    const cartItems = JSON.parse(sessionStorage.getItem('cart')) || [];
    const cartList = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    let total = 0;

    cartList.innerHTML = '';

    cartItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - RM${item.price}`;

          // Create a remove button for each item
          const removeButton = document.createElement('button');
          removeButton.textContent = 'Remove';
          removeButton.addEventListener('click', () => {
              removeFromCart(item.id);
          });
          removeButton.className = 'removeButton';
  
          li.appendChild(removeButton);

        cartList.appendChild(li);
        total += item.price;
    });

    cartTotal.textContent = total;
}

// Add to cart button click event
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const cartItems = JSON.parse(sessionStorage.getItem('cart')) || [];
        const productId = button.getAttribute('data-id');
        const productName = button.getAttribute('data-name');
        const productPrice = parseFloat(button.getAttribute('data-price'));

        cartItems.push({ id: productId, name: productName, price: productPrice });
        sessionStorage.setItem('cart', JSON.stringify(cartItems));
        updateCart();
        alert("Add to Cart Successfully! Please view your cart at the bottom of page.");
    });
});

// Function to change button color when clicked
function changeButtonColor(button) {
    button.classList.add('clicked'); // Add the 'clicked' class to the button
    setTimeout(() => {
        button.classList.remove('clicked'); // Remove the 'clicked' class after a delay
    }, 200); // Adjust the delay time as needed (200 milliseconds = 0.2 seconds)
}

// Add click event listener to all 'Add to Cart' buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        changeButtonColor(button); // Call the function to change button color
    });
});


function removeFromCart(productId) {
    const cartItems = JSON.parse(sessionStorage.getItem('cart')) || [];
    
    // Find the index of the item to remove
    const indexToRemove = cartItems.findIndex(item => item.id === productId);
    
    if (indexToRemove !== -1) {
        // Remove the item from the cart array
        cartItems.splice(indexToRemove, 1);
        
        // Update the cart in session storage
        sessionStorage.setItem('cart', JSON.stringify(cartItems));
        
        // Update the cart display
        updateCart();
    }
}

// Initialize the cart and update it
updateCart();



// Function to calculate the total amount in the cart
function calculateTotal() {
    const cartItems = JSON.parse(sessionStorage.getItem('cart')) || [];
    let total = 0;

    cartItems.forEach(item => {
        total += item.price;
    });

    return total;
}

// Confirm Payment button click event
document.getElementById('confirm-payment').addEventListener('click', () => {
    const paymentOptions = document.querySelectorAll('input[name="payment"]');
    let selectedPayment = '';

    paymentOptions.forEach(option => {
        if (option.checked) {
            selectedPayment = option.value;
        }
    });

    if (selectedPayment) {
        const totalAmount = calculateTotal();

        if (selectedPayment === 'ewallet') {
            // Redirect to a page that generates a QR code with the total amount
            window.location.href = `ewallet-payment-page.html?total=${totalAmount}`;
        } else if (selectedPayment === 'creditCard') {
            // Redirect to a page where users can fill in credit/debit card information
            window.location.href = `credit-card-payment-page.html?total=${totalAmount}`;
        }
    } else {
        alert('Please select a payment method.');
    }
});

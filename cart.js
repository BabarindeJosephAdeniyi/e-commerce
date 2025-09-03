function displayCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsContainer = document.querySelector(".cart-items");
  const subtotalE1 = document.querySelector(".subtotal");
  const grandtotalE1 = document.querySelector(".grand-total");

  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    subtotalE1.textContent = "Subtotal: $0.00";
    grandtotalE1.textContent = "Grand Total: $0.00";
    return;
  }

  let subtotal = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
  cartItem.innerHTML = `
  <div class="cart-item row text-center text-md-start">
    <div class="col-12 col-md-2 mb-2 mb-md-0">
      <img src="${item.image}" width="50%" class="img-fluid rounded" alt=""> 
    </div>
    <div class="col-12 col-md-4 d-flex align-items-center justify-content-center justify-content-md-start">
      <p class="mb-0 fw-bold">${item.title.substr(0,25) + "..."}</p>
    </div>
    <div class="col-6 col-md-2 d-flex align-items-center justify-content-center">
      <span class="price">$${item.price}</span>
    </div>
    <div class="col-6 col-md-2 d-flex align-items-center justify-content-center">
      <input type="number" class="form-control form-control-sm quantity-input" value="${item.quantity}" min="1" data-index="${index}">
    </div>
    <div class="col-6 col-md-1 d-flex align-items-center justify-content-center mt-2 mt-md-0">
      <span class="total-price">$${itemTotal.toFixed(2)}</span>
    </div>
    <div class="col-6 col-md-1 d-flex align-items-center justify-content-center mt-2 mt-md-0">
      <button class="remove btn btn-outline-danger btn-sm" data-index="${index}">
        <i class="bi bi-x"></i>
      </button>
    </div>
  </div>
`;


    cartItemsContainer.appendChild(cartItem);
  });


  subtotalE1.textContent = `Subtotal: $${subtotal.toFixed(2)}`;
  grandtotalE1.textContent = `Grand Total: $${subtotal.toFixed(2)}`;


  removeCartItem();
  updateCartQuantity();
}



function removeCartItem() {
  document.querySelectorAll(".remove").forEach((button) => {
    button.addEventListener("click", function () {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const index = this.getAttribute("data-index");
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      displayCart();
      updateCartBadge();
    });
  });
}


function updateCartQuantity() {
  document.querySelectorAll(".quantity-input").forEach((input) => {
    input.addEventListener("change", function () {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const index = this.getAttribute("data-index");
      cart[index].quantity = parseInt(this.value);
      localStorage.setItem("cart", JSON.stringify(cart));
      displayCart();
      updateCartBadge();
    });
  });
}


function updateCartBadge() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let badge = document.getElementById("cart-badge");
  if (badge) {
    let count = cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.textContent = count;
    badge.style.display = count > 0 ? "inline-block" : "none";
  }
}



function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingIndex = cart.findIndex((item) => item.id === product.id);
  if (existingIndex !== -1) {
    cart[existingIndex].quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBadge();
}


if (document.querySelector(".cart-page")) {
  displayCart();
}
updateCartBadge();

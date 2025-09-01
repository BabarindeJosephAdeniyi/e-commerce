async function getProduct() {
  let fetchData = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  const allProducts = document.getElementById("allproduct");

  try {
    let response = await fetch("https://fakestoreapi.com/products", fetchData);
    let data = await response.json();
    console.log(data);

    allProducts.innerHTML = "";

    if (data.length > 0) {
      data.forEach(function (value) {
        allProducts.innerHTML += `
          <div class="product-card" data-aos="fade-up-right">
            <div class="product-image" data-id="${value.id}">
              <img class="img-fluid" loading="lazy" src="${value.image}" alt="${value.title}">
            </div>
            <div class="product-title">${value.title.substr(0, 20)}</div>
            <div class="product-price">Price: $${value.price}</div>
          </div>
        `;
      });

      document.querySelectorAll(".product-image").forEach((imgBox) => {
        imgBox.addEventListener("click", function () {
          const id = this.getAttribute("data-id");
          const selectedProduct = data.find((p) => p.id == id);
          localStorage.setItem("selectedProduct", JSON.stringify(selectedProduct));
          window.location.href = "productdetail.html";
        });
      });
    } else {
      allProducts.innerHTML = `<div>No Products Found</div>`;
    }
  } catch (error) {
    allProducts.innerHTML = `<div>Error While Loading...</div>`;
    console.log(error);
  }
}

const allproducts = document.getElementById("allproduct");
if (allproducts) {
  allproducts.innerHTML = `<div class="loader text-center fa-fade pb-5 mb-5">Loading...</div>`;
  setTimeout(() => {
    getProduct();
  }, );
}







// const isCartPage = document.querySelector(".cart-page");

// if (productContainer) {
//   getProduct()
  
// } else if (isProductDetailpage) {
//   displayProductDetail()
// } else if (isCartPage) {
//   displayCart();
// }







// async function getProduct() {
//   let fetchData = {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   const allProducts = document.getElementById("allproduct");

//   try {
//     let response = await fetch("https://fakestoreapi.com/products", fetchData);
//     let data = await response.json();
//     console.log(data);

//     allProducts.innerHTML = "";

//     if (data.length > 0) {
//       data.forEach(function (value) {
//         allProducts.innerHTML += `
//           <div class="product-card">
//             <div class="product-image" data-id="${value.id}">
//               <img class="img-fluid" src="${value.image}" alt="${value.title}">
//             </div>
//             <div class="product-title">${value.title.substr(0, 20)}</div>
//             <div class="product-price">Price: $${value.price}</div>
//           </div>
//         `;
//       });


//       document.querySelectorAll(".product-image").forEach((imgBox) => {
//         imgBox.addEventListener("click", function () {
//           const id = this.getAttribute("data-id");
//           const selectedProduct = data.find((p) => p.id == id);
//           localStorage.setItem("selectedProduct", JSON.stringify(selectedProduct));
//           window.location.href = "productdetail.html";
//         });
//       });
//     } else {
//       allProducts.innerHTML += `<div>No Products Found</div>`;
//     }
//   } catch (error) {
//     allProducts.innerHTML += `<div>Error While Loading...</div>`;
//     console.log(error);
//   }
// }


// const allproducts = document.getElementById("allproduct");
// if (allproducts) {
//   allproducts.innerHTML = `<div class="loader text-center fa-fade pb-5 mb-5">Loading...</div>`;
//   setTimeout(() => {
//     getProduct();
//   }, 3000);
// }




// function displayCart() {
//   const cart = JSON.parse(localStorage.getItem("cart")) || [];
//   const subtotalE1 = document.querySelector(".subtotal");
//   const grandtotalE1 = document.querySelector(".grand-total");

//   cartItemsContainer.innerHTML = "";

//   if (cart.length === 0) {
//     cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
//     subtotalE1.textContent = "Subtotal: $0.00";
//     grandtotalE1.textContent = "Grand Total: $0.00";
//     return;
    
//   }

//   let subtotal = 0;
//   cart.forEach((item, index) => {
//     const itemTotal = parseFloat(item.price.replace('$', '')) * item.quantity;
//     subtotal += itemTotal;


//     const cartItem = document.createElement("div");
//     cartItem.classList.add("cart-item");
//     cartItem.innerHTML = `
//     <div class="product">
//                 <img src=${item.image} alt="">
//                 <div class="item-detail">
//                     <p>${item.title}</p>
//                 </div>
//                 <span class="price">${item.price}</span>
//                 <div class="quantitiy"><input type="number" value=${item.quantity} min="1" data-index=${index}></div>
//                 <span class="total-price">$${itemTotal}</span>
//                 <button class="remove"  data-index=${index}><i class="ri-close-line"></i></button>
//             </div>
    
    
//     `;
//     cartItemsContainer.appendChild(cartItem);
  
// })



//   subtotalE1.textContent = `Subtotal: $${subtotal.toFixed(2)}`;
//   grandtotalE1.textContent = `Grand Total: $${subtotal.toFixed(2)}`



//   removeCartItem();
//   updateCartQuantity();


// }




// function removeCartItem() {
//   document.querySelectorAll(".remove").forEach((button) => {
//     button.addEventListener("click", function () {
//       let cart = JSON.parse(localStorage.getItem("cart")) || [];
//       const index = this.getAttribute("data-index"); // FIX
//       cart.splice(index, 1);
//       localStorage.setItem("cart", JSON.stringify(cart));
//       displayCart();
//       updateCartBadge();
//     });
//   });
// }



// function updateCartQuantity() {
    
//     document.querySelectorAll(".quantitiy input").forEach((input) => {
//         input.addEventListener("change", function () {
//             let cart = JSON.parse(localStorage.getItem("cart")) || [];
//             const index = this.getAttribute("data-index");
//             cart[index].quantity = parseInt(this.value);
//             localStorage.setItem("cart", JSON.stringify(cart));
//             displayCart();
//             updateCartBadge();
           
//         });
//     });


// }

// function updateCartBadge() {
//   let cart = JSON.parse(localStorage.getItem("cart")) || [];
//   let badge = document.getElementById("cart-badge");
//   if (badge) {
//     badge.textContent = cart.length; // show number of items
//   }
// }

// updateCartBadge();
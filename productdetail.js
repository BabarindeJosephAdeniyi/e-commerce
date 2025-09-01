

function displayProductDetail() {
  console.log("Running displayProductDetail...");

  const productDetail = JSON.parse(localStorage.getItem("selectedProduct"));
  console.log("Loaded from localStorage:", productDetail);

  if (!productDetail) {
    console.error("No product found in localStorage");
    return;
  }

  const titleE1 = document.querySelector(".title");
  const priceE1 = document.querySelector(".price");
  const descriptionE1 = document.querySelector(".description");
  const ratingE1 = document.querySelector(".rating");
  const addToCartBtn = document.getElementById("add-cart-btn");
  const productImageE1 = document.querySelector(".product-image");

  if (!titleE1 || !priceE1 || !descriptionE1 || !addToCartBtn || !productImageE1 || !ratingE1) {
    console.error("One or more elements missing in HTML");
    return;
  }

  productImageE1.innerHTML = `<img src="${productDetail.image}" loading="lazy"  data-aos="fade-up" alt="${productDetail.title}" width="50%" class="img-fluid">`;
  titleE1.textContent = productDetail.title;
  priceE1.textContent = `Price: $${productDetail.price}`;
  descriptionE1.textContent = productDetail.description.substr(0, 300) + '...';

  if (productDetail.rating) {
    const stars = Math.round(productDetail.rating.rate);
    let starHTML = "";
    for (let i = 1; i <= 5; i++) {
      starHTML += i <= stars
        ? `<i class="bi bi-star-fill text-warning"></i>`
        : `<i class="bi bi-star text-warning"></i>`;
    }
    ratingE1.innerHTML = `${starHTML} <span class="text-muted">(${productDetail.rating.count} reviews)</span>`;
  } else {
    ratingE1.textContent = "No rating available";
  }

  addToCartBtn.addEventListener("click", function () {
    addToCart(productDetail);
    alert("Added to Cart!");
  });
}

if (document.querySelector(".product-detail")) {
  displayProductDetail();
}

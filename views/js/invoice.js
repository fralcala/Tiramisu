const products = [
  {
    image: "../assets/TirProd1.jpg",
    alt: "Fresh Italian Tiramisu - 6 * 85g glasses",
    name: "Fresh Italian Tiramisu",
    price: "$18.99",
  },
  {
    image: "../assets/TirProd2.jpg",
    alt: "Italian Wine-Flavored Tiramisu",
    name: "Italian Wine-Flavored Tiramisu",
    price: "$16.99",
  },
];
const productList = document.getElementById("productList");

for (let i = 0; i < products.length; i++) {
  const element = products[i];

  productList.innerHTML += `
  <div class="product">
          <img
            src="${products[i].image}"
            alt="${products[i].alt}"
          />
          <div class="productDesc">
            <h3>${products[i].name}</h3>
            <p>${products[i].price}</p>
            <button class="cartAdd" data-index="${i}">Add to Cart</button>
          </div>
        </div>
  `;
}

const addButtons = document.querySelectorAll(".cartAdd");

addButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const i = this.getAttribute("data-index");
    AddtoCart(products[i]);
  });
});

function AddtoCart(product) {
  const cart = document.getElementById("cart");

  cart.innerHTML += `
  <div class="product">
          <img
            src="${product.image}"
            alt="${product.alt}"
          />
          <div class="productDesc">
            <h3>${product.name}</h3>
            <p>${product.price}</p>
          </div>
        </div>
  `;
}

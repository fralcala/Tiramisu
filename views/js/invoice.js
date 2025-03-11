import { GeneratePdf } from "./app.js";

const products = [
  {
    image: "../assets/TirProd1.jpg",
    alt: "Fresh Italian Tiramisu - 6 * 85g glasses",
    name: "Fresh Italian Tiramisu",
    price: 18.99,
  },
  {
    image: "../assets/TirProd2.jpg",
    alt: "Italian Wine-Flavored Tiramisu",
    name: "Italian Wine-Flavored Tiramisu",
    price: 16.99,
  },
];
const cartProducts = [];

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
            <p>$${products[i].price}</p>
            <button class="cartAdd btn" data-index="${i}">Add to Cart</button>
          </div>
        </div>
  `;
}

const addButtons = document.querySelectorAll(".cartAdd");

addButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const i = this.getAttribute("data-index");
    addToCart(products[i]);
    getTotal(products[i]);
  });
});

function addToCart(product) {
  cartProducts.push(product);
  console.log(cartProducts);
  cartRender();
}

const cart = document.getElementById("cart");

function cartRender() {
  cart.innerHTML = "";

  for (let i = 0; i < cartProducts.length; i++) {
    const element = cartProducts[i];

    cart.innerHTML += `
            <h3>${cartProducts[i].name}</h3>
            <p>$${cartProducts[i].price}</p>       
  `;
  }
}

const totalPrice = document.getElementById("total");

let total = 0;

function getTotal(product) {
  total += product.price;

  totalPrice.innerHTML = `
  <h2>$${total}</h2>
  `;

  return total;
}

class Invoice extends GeneratePdf {
  printItems() {
    for (let i = 0; i < cartProducts.length; i++) {
      const element = cartProducts[i];
      this.addText(`${element.name} - $${element.price}`);
    }
  }

  printTotal() {
    this.addText(`Total: $${total}`);
  }
}

const preview = document.getElementById("view");

preview.addEventListener("click", function () {
  generateInvoice();
});

function generateInvoice() {
  const date = new Date();
  const formattedDate = date.toLocaleDateString();

  const invCont = document.getElementById("invoiceCont");
  invCont.innerHTML = `
    <iframe id="invoice" src="" frameborder="0"></iframe>`;

  const myPDF = new Invoice("invoice");

  myPDF.addHeader("Invoice        Tiramisu");
  myPDF.addText(`Date: ${formattedDate}`);
  myPDF.printItems();
  myPDF.printTotal();
  myPDF.showPdf();

  let down = document.getElementById("download");

  down.addEventListener("click", function () {
    myPDF.downloadPdf();
  });
}

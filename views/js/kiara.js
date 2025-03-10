//Child Class / Sub-Class	

import { GeneratePdf } from "./app.js";

///class that extends the GeneratePdf class
class RestaurantReceipt extends GeneratePdf {
  constructor(domRefId) {
    super(domRefId);
    this.cart = [];
  }
///add item to the cart
  addToCart(item) {
    const existingItem = this.cart.find((cartItem) => cartItem.name === item.name);

    //increase quantity if the drink is already in the cart
    if (existingItem) {
      existingItem.quantity++;

    } 
    else {
//if is new , add it with quantity 1
      this.cart.push({ ...item, quantity: 1 });
    
}
console.log("after adding item:", this.cart);
    this.updateCart();
  }

  //update cart
  updateCart() {
    const cartList = document.getElementById("cart-items");

const totalPriceElement = document.getElementById("total-price");

    cartList.innerHTML = "";
    let total = 0;
    this.cart.forEach((item) => {
      const lineTotal = item.price * item.quantity;
      total += lineTotal;

      const li = document.createElement("li");

    li.textContent = `${item.name} x${item.quantity} - $${lineTotal.toFixed(2)}`;
      cartList.appendChild(li);
    });
// total price 
    totalPriceElement.textContent = `Total: $${total.toFixed(2)}`;
  }


  //generate the pdf receipt
  generateReceipt() {
    console.log(" receipt...");
    this.pdfDoc = new jsPDF();
 this.pdfDoc("Tiramisu Restaurant Receipt", 10, 10);
    this.pdfDoc(`Date: ${new Date().toLocaleDateString()}`, 10, 20);
    this.pdfDoc("Items:", 10, 30);

    let total = 0;
   // let yOffset = 40;//

    this.cart.forEach((item) => {

      const lineTotal = item.price * item.quantity;
      total += lineTotal;
      console.log(`item: ${item.name} x${item.quantity} - $${lineTotal.toFixed(2)}`);
      this.pdfDoc(`${item.name} - $${item.price} x${item.quantity} = $${lineTotal.toFixed(2)}`);

     // yOffset += 10;//

    });

    this.pdfDoc("-----------------------------",
        10,
        yOffset
    );
    yOffset += 10;
  this.pdfDoc(`Total: $${total.toFixed(2)}`, 10, yOffset);
    //this.showPdf();

    this.showPdf();
  }
}

const receipt = new RestaurantReceipt("pdf-preview");

document.querySelectorAll(".add-btn").forEach((button) => {

  button.addEventListener("click", () => {

    const item = {
      name: button.getAttribute("data-name"),
      price: parseFloat(button.getAttribute("data-price")),
    };
    receipt.addToCart(item);

  }
);
}
);


//id generate receipt button
document.getElementById("generate-receipt").addEventListener("click", () => 
    { receipt.generateReceipt();
});

///id download receipt button
document.getElementById("download-receipt").addEventListener("click", () => 
    {
  receipt.downloadPdf();

}
);

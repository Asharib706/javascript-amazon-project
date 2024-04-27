import { cart } from "../data/cart.js";
import { products } from "../data/products.js";
import { deliveryOptions } from "../data/deliveryOptions.js";
import { formatCurrency } from "../scripts/utils/money.js";
export function renderPaymentSummary(){
  let productPriceCents=0;
  let deliveryPriceCents=0;
  let productQuantity=0;
  cart.forEach((cartItem) => {
    let product;
    let deliveryOption;
    const productId=cartItem.productId;
    const deliveryOptionId=cartItem.deliveryOptionId;
    // Find the product matching the cart item
    for (let i = 0; i < products.length; i++) {
      if (productId === products[i].id) {
        product = products[i];
        break;
      }
    }
    deliveryOptions.forEach((option) => {
      if (option.id === deliveryOptionId) {
        deliveryOption = option;

      }
    });
    productPriceCents+=cartItem.quantity*product.priceCents;
    deliveryPriceCents+=deliveryOption.priceCents;
    productQuantity+=cartItem.quantity;

  });

  console.log(productPriceCents);
  console.log(deliveryPriceCents);
  let totalBeforeTaxCents=productPriceCents+deliveryPriceCents;
  console.log(totalBeforeTaxCents);
  let taxCents=0.1*totalBeforeTaxCents;
  let total=totalBeforeTaxCents+taxCents;
  console.log(taxCents);
  console.log(productQuantity);
  const paymentSummaryHtml=`<div class="payment-summary-title">
  Order Summary
</div>

<div class="payment-summary-row">
  <div>Items (${productQuantity}):</div>
  <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
</div>

<div class="payment-summary-row">
  <div>Shipping &amp; handling:</div>
  <div class="payment-summary-money">$${formatCurrency(deliveryPriceCents)}</div>
</div>

<div class="payment-summary-row subtotal-row">
  <div>Total before tax:</div>
  <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
</div>

<div class="payment-summary-row">
  <div>Estimated tax (10%):</div>
  <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
</div>

<div class="payment-summary-row total-row">
  <div>Order total:</div>
  <div class="payment-summary-money">$${formatCurrency(total)}</div>
</div>

<button class="place-order-button button-primary">
  Place your order
</button>
</div>`

document.querySelector('.js-payment-summary').innerHTML=paymentSummaryHtml;
}
import type { CheckoutForm } from "../main";

export function calculateTotalPrice(form: CheckoutForm): number {
  let total = 4000;

  if (form.shippingMethod === "express") total += 800;
  if (form.paymentMethod === "cod") total += 300;
  if (form.address.includes("北海道")) total += 500;
  if (form.address.includes("沖縄")) total += 1200;

  return total;
}

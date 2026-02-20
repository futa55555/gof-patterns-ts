export type SubmitOrderInput = {
  address: string;
  shippingMethod: "standard" | "express";
  paymentMethod: "card" | "bank" | "cod";
  price: number;
};

export async function submitOrder(payload: SubmitOrderInput): Promise<void> {
  await wait(500);

  if (!payload.address) {
    throw new Error("配送先住所が未入力です");
  }

  if (Math.random() > 0.6) {
    throw new Error("ネットワークエラー");
  }
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

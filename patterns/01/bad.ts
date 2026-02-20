export type Screen =
  | "cart"
  | "address"
  | "shipping"
  | "payment"
  | "review"
  | "submitting"
  | "success"
  | "error";

type PaymentMethod = "card" | "bank" | "cod";
type ShippingMethod = "standard" | "express";

export type CheckoutForm = {
  address: string;
  shippingMethod: ShippingMethod;
  paymentMethod: PaymentMethod;
  cardNumber: string;
  bankAccount: string;
  agreeTerms: boolean;
};

export class CheckoutModalController {
  private screen: Screen = "cart";
  private form: CheckoutForm = {
    address: "",
    shippingMethod: "standard",
    paymentMethod: "card",
    cardNumber: "",
    bankAccount: "",
    agreeTerms: false,
  };

  private errorMessage = "";
  private retryCount = 0;

  // 画面表示用の値を、状態ごとに直接分岐して返す
  getPrimaryButtonLabel(): string {
    if (this.screen === "cart") return "購入手続きへ";
    if (this.screen === "address") return "配送方法を選ぶ";
    if (this.screen === "shipping") return "支払い方法を選ぶ";
    if (this.screen === "payment") return "確認画面へ";
    if (this.screen === "review") return "注文を確定する";
    if (this.screen === "submitting") return "送信中...";
    if (this.screen === "success") return "完了";
    if (this.screen === "error") return "もう一度試す";
    return "進む";
  }

  getSecondaryButtonLabel(): string {
    if (this.screen === "cart") return "閉じる";
    if (this.screen === "submitting") return "";
    if (this.screen === "success") return "注文履歴へ";
    if (this.screen === "error") return "カートに戻る";
    return "戻る";
  }

  canClickPrimaryButton(): boolean {
    if (this.screen === "submitting") return false;
    if (this.screen === "address" && !this.form.address) return false;
    if (this.screen === "payment") {
      if (
        this.form.paymentMethod === "card" &&
        this.form.cardNumber.length < 12
      ) {
        return false;
      }
      if (
        this.form.paymentMethod === "bank" &&
        this.form.bankAccount.length < 8
      ) {
        return false;
      }
    }
    if (this.screen === "review" && !this.form.agreeTerms) return false;
    return true;
  }

  setAddress(address: string): void {
    this.form.address = address;
  }

  setShippingMethod(method: ShippingMethod): void {
    this.form.shippingMethod = method;
  }

  setPaymentMethod(method: PaymentMethod): void {
    this.form.paymentMethod = method;
  }

  setCardNumber(cardNumber: string): void {
    this.form.cardNumber = cardNumber;
  }

  setBankAccount(bankAccount: string): void {
    this.form.bankAccount = bankAccount;
  }

  setAgreeTerms(agree: boolean): void {
    this.form.agreeTerms = agree;
  }

  async onPrimaryButtonClick(): Promise<void> {
    if (!this.canClickPrimaryButton()) return;

    if (this.screen === "cart") {
      this.track("checkout_started");
      this.screen = "address";
      return;
    }

    if (this.screen === "address") {
      this.track("address_filled");
      this.screen = "shipping";
      return;
    }

    if (this.screen === "shipping") {
      this.track("shipping_selected");
      this.screen = "payment";
      return;
    }

    if (this.screen === "payment") {
      this.track("payment_selected", { method: this.form.paymentMethod });
      this.screen = "review";
      return;
    }

    if (this.screen === "review") {
      this.screen = "submitting";
      this.errorMessage = "";
      this.renderLoading();

      try {
        const price = this.calculateTotalPrice();
        await submitOrder({
          address: this.form.address,
          shippingMethod: this.form.shippingMethod,
          paymentMethod: this.form.paymentMethod,
          price,
        });
        this.track("order_submitted", { price });
        this.screen = "success";
      } catch (error) {
        this.retryCount += 1;
        this.errorMessage =
          error instanceof Error ? error.message : "注文に失敗しました";
        this.track("order_failed", {
          retryCount: this.retryCount,
          error: this.errorMessage,
        });
        this.screen = "error";
      }
      return;
    }

    if (this.screen === "error") {
      if (this.retryCount > 2) {
        this.resetAll();
        this.screen = "cart";
      } else {
        this.screen = "review";
      }
      return;
    }
  }

  onSecondaryButtonClick(): void {
    if (this.screen === "cart") {
      this.closeModal();
      return;
    }

    if (this.screen === "success") {
      this.navigateToOrderHistory();
      return;
    }

    if (this.screen === "error") {
      this.resetAll();
      this.screen = "cart";
      return;
    }

    if (this.screen === "address") this.screen = "cart";
    else if (this.screen === "shipping") this.screen = "address";
    else if (this.screen === "payment") this.screen = "shipping";
    else if (this.screen === "review") this.screen = "payment";
  }

  getStateForRender() {
    return {
      screen: this.screen,
      errorMessage: this.errorMessage,
      primaryButtonLabel: this.getPrimaryButtonLabel(),
      secondaryButtonLabel: this.getSecondaryButtonLabel(),
      canClickPrimary: this.canClickPrimaryButton(),
      form: this.form,
    };
  }

  private calculateTotalPrice(): number {
    let total = 4000;

    if (this.form.shippingMethod === "express") total += 800;
    if (this.form.paymentMethod === "cod") total += 300;

    // 仕様追加のたびにこのメソッドが太る
    if (this.form.address.includes("北海道")) total += 500;
    if (this.form.address.includes("沖縄")) total += 1200;

    return total;
  }

  private resetAll(): void {
    this.form = {
      address: "",
      shippingMethod: "standard",
      paymentMethod: "card",
      cardNumber: "",
      bankAccount: "",
      agreeTerms: false,
    };
    this.errorMessage = "";
    this.retryCount = 0;
  }

  private track(
    eventName: string,
    payload: Record<string, string | number> = {},
  ): void {
    console.log("[tracking]", eventName, payload);
  }

  private renderLoading(): void {
    console.log("loading...");
  }

  private closeModal(): void {
    console.log("close modal");
  }

  private navigateToOrderHistory(): void {
    console.log("navigate: /orders");
  }
}

async function submitOrder(payload: {
  address: string;
  shippingMethod: ShippingMethod;
  paymentMethod: PaymentMethod;
  price: number;
}): Promise<void> {
  await wait(500);

  if (!payload.address) {
    throw new Error("配送先住所が未入力です");
  }

  // 通信不安定を雑に再現
  if (Math.random() > 0.6) {
    throw new Error("ネットワークエラー");
  }
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

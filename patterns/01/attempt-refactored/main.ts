import { AddressHandler } from "./handlers/AddressHandler";
import { CartHandler } from "./handlers/CartHandler";
import { ErrorHandler } from "./handlers/ErrorHandler";
import { PaymentHandler } from "./handlers/PaymentHandler";
import { ReviewHandler } from "./handlers/ReviewHandler";
import { ScreenHandler } from "./handlers/ScreenHandler";
import { ShippingHandler } from "./handlers/ShippingHandler";
import { SubmittingHandler } from "./handlers/SubmittingHandler";
import { SuccessHandler } from "./handlers/SuccessHandler";
import { calculateTotalPrice } from "./services/price";
import { submitOrder } from "./services/submitOrder";
import { track } from "./services/track";

export type Screen =
  | "cart"
  | "address"
  | "shipping"
  | "payment"
  | "review"
  | "submitting"
  | "success"
  | "error";

export type Action = "close-modal" | "navigate-to-orders" | "none";

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

export type CheckoutModalContext = {
  screen: Screen;
  form: CheckoutForm;
  errorMessage: string;
  retryCount: number;
};

export type HandlerResult = {
  screen: Screen;
  action: Action;
  errorMessage?: string;
  retryCount?: number;
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

  private handlers: Record<Screen, ScreenHandler> = {
    cart: new CartHandler(),
    address: new AddressHandler(),
    shipping: new ShippingHandler(),
    payment: new PaymentHandler(),
    review: new ReviewHandler({
      track,
      calculateTotalPrice,
      submitOrder,
    }),
    submitting: new SubmittingHandler(),
    success: new SuccessHandler(),
    error: new ErrorHandler({
      resetAll: () => this.resetAll(),
    }),
  };

  getPrimaryLabel(): string {
    return this.handlers[this.screen].getPrimaryLabel();
  }

  getSecondaryLabel(): string {
    return this.handlers[this.screen].getSecondaryLabel();
  }

  canClickPrimary(): boolean {
    return this.handlers[this.screen].canClickPrimary(this.getContext());
  }

  async onPrimaryButtonClick(): Promise<void> {
    const result = await this.handlers[this.screen].onPrimary(
      this.getContext(),
    );
    this.applyResult(result);
  }

  onSecondaryButtonClick(): void {
    const result = this.handlers[this.screen].onSecondary(this.getContext());
    this.applyResult(result);
  }

  setAddress(address: string): void {
    this.form.address = address;
  }

  setShippingMethod(shippingMethod: ShippingMethod): void {
    this.form.shippingMethod = shippingMethod;
  }

  setPaymentMethod(paymentMethod: PaymentMethod): void {
    this.form.paymentMethod = paymentMethod;
  }

  setCardNumber(cardNumber: string): void {
    this.form.cardNumber = cardNumber;
  }

  setBankAccount(bankAccount: string): void {
    this.form.bankAccount = bankAccount;
  }

  setAgreeTerms(agreeTerms: boolean): void {
    this.form.agreeTerms = agreeTerms;
  }

  getStateForRender(): CheckoutModalContext & {
    primaryButtonLabel: string;
    secondaryButtonLabel: string;
    canClickPrimary: boolean;
  } {
    return {
      ...this.getContext(),
      primaryButtonLabel: this.getPrimaryLabel(),
      secondaryButtonLabel: this.getSecondaryLabel(),
      canClickPrimary: this.canClickPrimary(),
    };
  }

  private getContext(): CheckoutModalContext {
    return {
      screen: this.screen,
      form: this.form,
      errorMessage: this.errorMessage,
      retryCount: this.retryCount,
    };
  }

  private applyResult(result: HandlerResult): void {
    this.screen = result.screen;
    if (result.errorMessage !== undefined) {
      this.errorMessage = result.errorMessage;
    }
    if (result.retryCount !== undefined) {
      this.retryCount = result.retryCount;
    }

    if (result.action === "close-modal") {
      this.closeModal();
    } else if (result.action === "navigate-to-orders") {
      this.navigateToOrderHistory();
    }
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

  private closeModal(): void {
    console.log("close modal");
  }

  private navigateToOrderHistory(): void {
    console.log("navigate: /orders");
  }
}

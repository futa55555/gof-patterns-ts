import { AddressHandler } from "./handlers/AddressHandler";
import { CartHandler } from "./handlers/CartHandler";
import { ErrorHandler } from "./handlers/ErrorHandler";
import { PaymentHandler } from "./handlers/PaymentHandler";
import { ReviewHandler } from "./handlers/ReviewHandler";
import { ScreenHandler } from "./handlers/ScreenHandler";
import { ShippingHandler } from "./handlers/ShippingHandler";
import { SubmittingHandler } from "./handlers/SubmittingHandler";
import { SuccessHandler } from "./handlers/SuccessHandler";

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

  private getContext(): CheckoutModalContext {
    return {
      screen: this.screen,
      form: this.form,
      errorMessage: this.errorMessage,
      retryCount: this.retryCount,
    };
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

  private handlers: Record<Screen, ScreenHandler> = {
    cart: new CartHandler(),
    address: new AddressHandler(),
    shipping: new ShippingHandler(),
    payment: new PaymentHandler(),
    review: new ReviewHandler(),
    submitting: new SubmittingHandler(),
    success: new SuccessHandler(),
    error: new ErrorHandler({ resetAll: () => this.resetAll() }),
  };

  getPrimaryLabel(): string {
    const handler = this.handlers[this.screen];
    return handler.getPrimaryLabel();
  }

  getSecondaryLabel(): string {
    const handler = this.handlers[this.screen];
    return handler.getSecondaryLabel();
  }

  canClickPrimary(): boolean {
    const handler = this.handlers[this.screen];
    const ctx = this.getContext();
    return handler.canClickPrimary(ctx);
  }

  onPrimary(): Promise<Screen | void> {
    const handler = this.handlers[this.screen];
    const ctx = this.getContext();
    return handler.onPrimary(ctx);
  }

  onSecondary(): Screen | Action {
    const handler = this.handlers[this.screen];
    const ctx = this.getContext();
    return handler.onSecondary(ctx);
  }
}

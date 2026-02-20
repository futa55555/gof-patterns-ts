import type { CheckoutForm, CheckoutModalContext, HandlerResult } from "../main";
import type { ScreenHandler } from "./ScreenHandler";

type SubmitInput = {
  address: string;
  shippingMethod: CheckoutForm["shippingMethod"];
  paymentMethod: CheckoutForm["paymentMethod"];
  price: number;
};

type ReviewDeps = {
  track: (eventName: string, payload?: Record<string, string | number>) => void;
  calculateTotalPrice: (form: CheckoutForm) => number;
  submitOrder: (input: SubmitInput) => Promise<void>;
};

export class ReviewHandler implements ScreenHandler {
  constructor(private readonly deps: ReviewDeps) {}

  getPrimaryLabel(): string {
    return "注文を確定する";
  }

  getSecondaryLabel(): string {
    return "戻る";
  }

  canClickPrimary(ctx: CheckoutModalContext): boolean {
    return ctx.form.agreeTerms;
  }

  async onPrimary(ctx: CheckoutModalContext): Promise<HandlerResult> {
    if (!this.canClickPrimary(ctx)) {
      return { screen: "review", action: "none" };
    }

    try {
      const price = this.deps.calculateTotalPrice(ctx.form);
      await this.deps.submitOrder({
        address: ctx.form.address,
        shippingMethod: ctx.form.shippingMethod,
        paymentMethod: ctx.form.paymentMethod,
        price,
      });
      this.deps.track("order_submitted", { price });

      return {
        screen: "success",
        action: "none",
        errorMessage: "",
      };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "注文に失敗しました";
      const retryCount = ctx.retryCount + 1;

      this.deps.track("order_failed", {
        retryCount,
        error: message,
      });

      return {
        screen: "error",
        action: "none",
        errorMessage: message,
        retryCount,
      };
    }
  }

  onSecondary(_ctx: CheckoutModalContext): HandlerResult {
    return { screen: "payment", action: "none" };
  }
}

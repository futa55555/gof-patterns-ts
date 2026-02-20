import type { CheckoutModalContext, HandlerResult } from "../main";
import { track } from "../services/track";
import type { ScreenHandler } from "./ScreenHandler";

export class PaymentHandler implements ScreenHandler {
  getPrimaryLabel(): string {
    return "確認画面へ";
  }

  getSecondaryLabel(): string {
    return "戻る";
  }

  canClickPrimary(ctx: CheckoutModalContext): boolean {
    if (ctx.form.paymentMethod === "card" && ctx.form.cardNumber.length < 12) {
      return false;
    }
    if (ctx.form.paymentMethod === "bank" && ctx.form.bankAccount.length < 8) {
      return false;
    }
    return true;
  }

  async onPrimary(ctx: CheckoutModalContext): Promise<HandlerResult> {
    if (!this.canClickPrimary(ctx)) {
      return { screen: "payment", action: "none" };
    }

    track("payment_selected", { method: ctx.form.paymentMethod });
    return { screen: "review", action: "none" };
  }

  onSecondary(_ctx: CheckoutModalContext): HandlerResult {
    return { screen: "shipping", action: "none" };
  }
}

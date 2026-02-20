import { Action, CheckoutModalContext, Screen } from "../main";
import { ScreenHandler } from "./ScreenHandler";

export class ReviewHandler implements ScreenHandler {
  getPrimaryLabel(): string {
    return "注文を確定する";
  }

  getSecondaryLabel(): string {
    return "戻る";
  }

  canClickPrimary(ctx: CheckoutModalContext): boolean {
    return ctx.form.agreeTerms;
  }

  async onPrimary(ctx: CheckoutModalContext): Promise<Screen | void> {
    if (!this.canClickPrimary(ctx)) {
      return;
    }

    return "submitting";
  }

  onSecondary(_ctx: CheckoutModalContext): Screen | Action {
    return "payment";
  }
}

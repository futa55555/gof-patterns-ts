import { Action, CheckoutModalContext, Screen } from "../main";
import { track } from "../services/track";
import { ScreenHandler } from "./ScreenHandler";

export class ShippingHandler implements ScreenHandler {
  getPrimaryLabel(): string {
    return "支払い方法を選ぶ";
  }

  getSecondaryLabel(): string {
    return "戻る";
  }

  canClickPrimary(_ctx: CheckoutModalContext): boolean {
    return true;
  }

  async onPrimary(ctx: CheckoutModalContext): Promise<Screen | void> {
    if (!this.canClickPrimary(ctx)) {
      return;
    }

    track("shipping_selected");
    return "payment";
  }

  onSecondary(_ctx: CheckoutModalContext): Screen | Action {
    return "address";
  }
}

import { Action, CheckoutModalContext, Screen } from "../main";
import { track } from "../services/track";
import { ScreenHandler } from "./ScreenHandler";

export class CartHandler implements ScreenHandler {
  getPrimaryLabel(): string {
    return "購入手続きへ";
  }

  getSecondaryLabel(): string {
    return "閉じる";
  }

  canClickPrimary(_ctx: CheckoutModalContext): boolean {
    return true;
  }

  async onPrimary(ctx: CheckoutModalContext): Promise<Screen | void> {
    if (!this.canClickPrimary(ctx)) {
      return;
    }

    track("checkout_started");
    return "address";
  }

  onSecondary(_ctx: CheckoutModalContext): Screen | Action {
    return "close-modal";
  }
}

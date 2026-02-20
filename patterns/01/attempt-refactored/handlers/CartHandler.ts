import type { CheckoutModalContext, HandlerResult } from "../main";
import { track } from "../services/track";
import type { ScreenHandler } from "./ScreenHandler";

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

  async onPrimary(_ctx: CheckoutModalContext): Promise<HandlerResult> {
    track("checkout_started");
    return { screen: "address", action: "none" };
  }

  onSecondary(_ctx: CheckoutModalContext): HandlerResult {
    return { screen: "cart", action: "close-modal" };
  }
}

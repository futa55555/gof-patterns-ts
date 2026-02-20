import type { CheckoutModalContext, HandlerResult } from "../main";
import { track } from "../services/track";
import type { ScreenHandler } from "./ScreenHandler";

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

  async onPrimary(_ctx: CheckoutModalContext): Promise<HandlerResult> {
    track("shipping_selected");
    return { screen: "payment", action: "none" };
  }

  onSecondary(_ctx: CheckoutModalContext): HandlerResult {
    return { screen: "address", action: "none" };
  }
}

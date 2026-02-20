import type { CheckoutModalContext, HandlerResult } from "../main";
import { track } from "../services/track";
import type { ScreenHandler } from "./ScreenHandler";

export class AddressHandler implements ScreenHandler {
  getPrimaryLabel(): string {
    return "配送方法を選ぶ";
  }

  getSecondaryLabel(): string {
    return "戻る";
  }

  canClickPrimary(ctx: CheckoutModalContext): boolean {
    return ctx.form.address.trim().length > 0;
  }

  async onPrimary(ctx: CheckoutModalContext): Promise<HandlerResult> {
    if (!this.canClickPrimary(ctx)) {
      return { screen: "address", action: "none" };
    }

    track("address_filled");
    return { screen: "shipping", action: "none" };
  }

  onSecondary(_ctx: CheckoutModalContext): HandlerResult {
    return { screen: "cart", action: "none" };
  }
}

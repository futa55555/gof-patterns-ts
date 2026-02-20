import { Action, CheckoutModalContext, Screen } from "../main";
import { track } from "../services/track";
import { ScreenHandler } from "./ScreenHandler";

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

  async onPrimary(ctx: CheckoutModalContext): Promise<Screen | void> {
    if (!this.canClickPrimary(ctx)) {
      return;
    }

    track("address_filled");
    return "shipping";
  }

  onSecondary(_ctx: CheckoutModalContext): Screen | Action {
    return "cart";
  }
}

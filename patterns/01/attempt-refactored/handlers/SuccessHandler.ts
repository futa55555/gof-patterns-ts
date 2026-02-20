import type { CheckoutModalContext, HandlerResult } from "../main";
import type { ScreenHandler } from "./ScreenHandler";

export class SuccessHandler implements ScreenHandler {
  getPrimaryLabel(): string {
    return "完了";
  }

  getSecondaryLabel(): string {
    return "注文履歴へ";
  }

  canClickPrimary(_ctx: CheckoutModalContext): boolean {
    return false;
  }

  async onPrimary(_ctx: CheckoutModalContext): Promise<HandlerResult> {
    return { screen: "success", action: "none" };
  }

  onSecondary(_ctx: CheckoutModalContext): HandlerResult {
    return { screen: "success", action: "navigate-to-orders" };
  }
}

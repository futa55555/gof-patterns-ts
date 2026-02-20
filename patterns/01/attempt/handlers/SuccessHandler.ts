import { Action, CheckoutModalContext, Screen } from "../main";
import { ScreenHandler } from "./ScreenHandler";

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

  async onPrimary(_ctx: CheckoutModalContext): Promise<Screen | void> {
    return;
  }

  onSecondary(_ctx: CheckoutModalContext): Screen | Action {
    return "navigate-to-orders";
  }
}

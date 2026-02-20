import { Action, CheckoutModalContext, Screen } from "../main";
import { ScreenHandler } from "./ScreenHandler";

export class SubmittingHandler implements ScreenHandler {
  getPrimaryLabel(): string {
    return "送信中...";
  }

  getSecondaryLabel(): string {
    return "";
  }

  canClickPrimary(_ctx: CheckoutModalContext): boolean {
    return false;
  }

  async onPrimary(_ctx: CheckoutModalContext): Promise<Screen | void> {
    return;
  }

  onSecondary(_ctx: CheckoutModalContext): Screen | Action {
    return "none";
  }
}

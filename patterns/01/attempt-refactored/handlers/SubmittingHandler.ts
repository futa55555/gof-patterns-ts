import type { CheckoutModalContext, HandlerResult } from "../main";
import type { ScreenHandler } from "./ScreenHandler";

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

  async onPrimary(_ctx: CheckoutModalContext): Promise<HandlerResult> {
    return { screen: "submitting", action: "none" };
  }

  onSecondary(_ctx: CheckoutModalContext): HandlerResult {
    return { screen: "submitting", action: "none" };
  }
}

import type { CheckoutModalContext, HandlerResult } from "../main";
import type { ScreenHandler } from "./ScreenHandler";

type ErrorDeps = {
  resetAll: () => void;
};

export class ErrorHandler implements ScreenHandler {
  constructor(private readonly deps: ErrorDeps) {}

  getPrimaryLabel(): string {
    return "もう一度試す";
  }

  getSecondaryLabel(): string {
    return "カートに戻る";
  }

  canClickPrimary(_ctx: CheckoutModalContext): boolean {
    return true;
  }

  async onPrimary(ctx: CheckoutModalContext): Promise<HandlerResult> {
    if (ctx.retryCount > 2) {
      this.deps.resetAll();
      return { screen: "cart", action: "none" };
    }

    return { screen: "review", action: "none" };
  }

  onSecondary(_ctx: CheckoutModalContext): HandlerResult {
    this.deps.resetAll();
    return { screen: "cart", action: "none" };
  }
}

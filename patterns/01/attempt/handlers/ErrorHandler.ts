import { Action, CheckoutModalContext, Screen } from "../main";
import { ScreenHandler } from "./ScreenHandler";

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

  async onPrimary(ctx: CheckoutModalContext): Promise<Screen | void> {
    if (ctx.retryCount > 2) {
      this.deps.resetAll();
      return "cart";
    }

    return "review";
  }

  onSecondary(_ctx: CheckoutModalContext): Screen | Action {
    this.deps.resetAll();
    return "cart";
  }
}

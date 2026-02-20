import type { CheckoutModalContext, HandlerResult } from "../main";

export interface ScreenHandler {
  getPrimaryLabel(): string;
  getSecondaryLabel(): string;
  canClickPrimary(ctx: CheckoutModalContext): boolean;
  onPrimary(ctx: CheckoutModalContext): Promise<HandlerResult>;
  onSecondary(ctx: CheckoutModalContext): HandlerResult;
}

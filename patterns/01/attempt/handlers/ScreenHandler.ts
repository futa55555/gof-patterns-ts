import { Action, CheckoutModalContext, Screen } from "../main";

export interface ScreenHandler {
  getPrimaryLabel(): string;
  getSecondaryLabel(): string;
  canClickPrimary(ctx: CheckoutModalContext): boolean;
  onPrimary(ctx: CheckoutModalContext): Promise<Screen | void>;
  onSecondary(ctx: CheckoutModalContext): Screen | Action;
}

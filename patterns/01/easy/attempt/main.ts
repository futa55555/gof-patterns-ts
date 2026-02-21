import { HomeHandler } from "./handlers/HomeHandler";
import { ProfileHandler } from "./handlers/ProfileHandler";
import { SearchHandler } from "./handlers/SearchHandler";
import { TabBaseHandler } from "./handlers/TabBaseHandler";
import { track } from "./services/track";

export type Tab = "home" | "search" | "profile";

export type UserState = {
  activeTab: Tab;
  isLoggedIn: boolean;
  hasUnreadNotification: boolean;
};

export type HandlerResult = {
  tab?: Tab;
  action: Action;
};

type Action = "open-login-modal" | "none";

export class MobileTabController {
  private state: UserState = {
    activeTab: "home",
    isLoggedIn: false,
    hasUnreadNotification: true,
  };

  private handlers: Record<Tab, TabBaseHandler> = {
    home: new HomeHandler({ track }),
    search: new SearchHandler({ track }),
    profile: new ProfileHandler({ track }),
  };

  onTabClick(tab: Tab): void {
    const handler = this.handlers[tab];
    const res = handler.onTabClick(this.state);
    this.applyResult(res);
  }

  getTabBadge(tab: Tab): string {
    const handler = this.handlers[tab];
    return handler.getTabBadge(this.state);
  }

  getTabLabel(tab: Tab): string {
    const handler = this.handlers[tab];
    return handler.getTabLabel(this.state);
  }

  onPullToRefresh(): void {
    const handler = this.handlers[this.state.activeTab];
    const res = handler.onPullToRefresh(this.state);
    this.applyResult(res);
  }

  onLoginSuccess(): void {
    this.state.isLoggedIn = true;

    const handler = this.handlers[this.state.activeTab];
    const res = handler.onLoginSuccess(this.state);
    this.applyResult(res);
  }

  private applyResult(res: HandlerResult): void {
    if (res.tab) {
      this.state.activeTab = res.tab;
    }

    if (res.action === "open-login-modal") {
      this.openLoginModal();
    }
  }

  private openLoginModal(): void {
    console.log("open login modal");
  }
}

import { UserState, HandlerResult } from "../main";
import { TabBaseHandler } from "./TabBaseHandler";

type ProfileDeps = {
  track(eventName: string): void;
};

export class ProfileHandler implements TabBaseHandler {
  constructor(private readonly deps: ProfileDeps) {}

  onTabClick(userState: UserState): HandlerResult {
    if (!userState.isLoggedIn) {
      return {
        action: "open-login-modal",
      };
    }

    this.deps.track("tab_profile_click");
    this.renderProfile();
    return {
      tab: "profile",
      action: "none",
    };
  }

  getTabBadge(userState: UserState): string {
    return userState.hasUnreadNotification ? "●" : "";
  }

  getTabLabel(userState: UserState): string {
    return userState.isLoggedIn ? "マイページ" : "ログイン";
  }

  onPullToRefresh(_userState: UserState): HandlerResult {
    this.reloadProfile();
    return {
      action: "none",
    };
  }

  onLoginSuccess(_userState: UserState): HandlerResult {
    this.renderProfile();
    return {
      action: "none",
    };
  }

  private renderProfile(): void {
    console.log("render profile");
  }

  private reloadProfile(): void {
    console.log("reload profile");
  }
}

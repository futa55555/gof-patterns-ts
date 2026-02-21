import { HandlerResult, UserState } from "../main";
import { TabBaseHandler } from "./TabBaseHandler";

type HomeDeps = {
  track(eventName: string): void;
};

export class HomeHandler implements TabBaseHandler {
  constructor(private readonly deps: HomeDeps) {}

  onTabClick(_userState: UserState): HandlerResult {
    this.deps.track("tab_home_click");
    this.renderHome();
    return {
      tab: "home",
      action: "none",
    };
  }

  getTabBadge(_userState: UserState): string {
    return "";
  }

  getTabLabel(_userState: UserState): string {
    return "ホーム";
  }

  onPullToRefresh(_userState: UserState): HandlerResult {
    this.reloadHomeFeed();
    return {
      action: "none",
    };
  }

  onLoginSuccess(_userState: UserState): HandlerResult {
    this.renderHome();
    return {
      action: "none",
    };
  }

  private renderHome(): void {
    console.log("render home");
  }

  private reloadHomeFeed(): void {
    console.log("reload home feed");
  }
}

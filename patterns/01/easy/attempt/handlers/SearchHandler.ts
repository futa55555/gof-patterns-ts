import { UserState, HandlerResult } from "../main";
import { TabBaseHandler } from "./TabBaseHandler";

type SearchDeps = {
  track(eventName: string): void;
};

export class SearchHandler implements TabBaseHandler {
  constructor(private readonly deps: SearchDeps) {}

  onTabClick(_userState: UserState): HandlerResult {
    this.deps.track("tab_search_click");
    this.renderSearch();
    return {
      tab: "search",
      action: "none",
    };
  }

  getTabBadge(_userState: UserState): string {
    return "";
  }

  getTabLabel(_userState: UserState): string {
    return "検索";
  }

  onPullToRefresh(_userState: UserState): HandlerResult {
    this.reloadSearchResult();
    return {
      action: "none",
    };
  }

  onLoginSuccess(_userState: UserState): HandlerResult {
    this.renderSearch();
    return {
      action: "none",
    };
  }

  private renderSearch(): void {
    console.log("render search");
  }

  private reloadSearchResult(): void {
    console.log("reload search result");
  }
}

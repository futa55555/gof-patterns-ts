type Tab = "home" | "search" | "profile";

type UserState = {
  activeTab: Tab;
  isLoggedIn: boolean;
  hasUnreadNotification: boolean;
};

export class MobileTabController {
  private state: UserState = {
    activeTab: "home",
    isLoggedIn: false,
    hasUnreadNotification: true,
  };

  onTabClick(tab: Tab): void {
    if (tab === "profile" && !this.state.isLoggedIn) {
      this.openLoginModal();
      return;
    }

    if (tab === "home") {
      this.track("tab_home_click");
      this.state.activeTab = "home";
      this.renderHome();
      return;
    }

    if (tab === "search") {
      this.track("tab_search_click");
      this.state.activeTab = "search";
      this.renderSearch();
      return;
    }

    if (tab === "profile") {
      this.track("tab_profile_click");
      this.state.activeTab = "profile";
      this.renderProfile();
      return;
    }
  }

  getTabBadge(tab: Tab): string {
    if (tab === "home") return "";
    if (tab === "search") return "";
    if (tab === "profile") {
      return this.state.hasUnreadNotification ? "●" : "";
    }
    return "";
  }

  getTabLabel(tab: Tab): string {
    if (tab === "home") return "ホーム";
    if (tab === "search") return "検索";
    if (tab === "profile") {
      if (this.state.isLoggedIn) return "マイページ";
      return "ログイン";
    }
    return "";
  }

  onPullToRefresh(): void {
    if (this.state.activeTab === "home") {
      this.reloadHomeFeed();
      return;
    }
    if (this.state.activeTab === "search") {
      this.reloadSearchResult();
      return;
    }
    if (this.state.activeTab === "profile") {
      this.reloadProfile();
      return;
    }
  }

  loginSuccess(): void {
    this.state.isLoggedIn = true;

    if (this.state.activeTab === "profile") {
      this.renderProfile();
      return;
    }
    if (this.state.activeTab === "home") {
      this.renderHome();
      return;
    }
    if (this.state.activeTab === "search") {
      this.renderSearch();
      return;
    }
  }

  private track(eventName: string): void {
    console.log("[track]", eventName);
  }

  private openLoginModal(): void {
    console.log("open login modal");
  }

  private renderHome(): void {
    console.log("render home");
  }

  private renderSearch(): void {
    console.log("render search");
  }

  private renderProfile(): void {
    console.log("render profile");
  }

  private reloadHomeFeed(): void {
    console.log("reload home feed");
  }

  private reloadSearchResult(): void {
    console.log("reload search result");
  }

  private reloadProfile(): void {
    console.log("reload profile");
  }
}

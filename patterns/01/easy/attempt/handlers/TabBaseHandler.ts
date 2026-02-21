import { HandlerResult, UserState } from "../main";

export interface TabBaseHandler {
  onTabClick(userState: UserState): HandlerResult;
  getTabBadge(userState: UserState): string;
  getTabLabel(userState: UserState): string;
  onPullToRefresh(userState: UserState): HandlerResult;
  onLoginSuccess(userState: UserState): HandlerResult;
}

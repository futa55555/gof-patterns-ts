import { PlanBaseProvider } from "./PlanBaseProvider";

type ProDeps = {
  track(eventName: string): void;
};

export class ProProvider implements PlanBaseProvider {
  constructor(private readonly deps: ProDeps) {}

  renderCard(): string {
    return "<div>Pro Plan</div>";
  }

  submitCheckout(): void {
    console.log("submit pro form");
    this.deps.track("submit_pro");
  }

  getDescription(): string {
    return "小規模チーム向け。分析機能あり。";
  }

  getButtonColor(): string {
    return "blue";
  }
}

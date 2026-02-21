import { PlanBaseProvider } from "./PlanBaseProvider";

type EnterpriseDeps = {
  track(eventName: string): void;
};

export class EnterpriseProvider implements PlanBaseProvider {
  constructor(private readonly deps: EnterpriseDeps) {}

  renderCard(): string {
    return "<div>Enterprise Plan</div>";
  }

  submitCheckout(): void {
    console.log("submit enterprise form");
    this.deps.track("submit_enterprise");
  }

  getDescription(): string {
    return "大規模組織向け。監査ログとSSO対応。";
  }

  getButtonColor(): string {
    return "purple";
  }
}

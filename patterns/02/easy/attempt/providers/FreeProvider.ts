import { PlanBaseProvider } from "./PlanBaseProvider";

type FreeDeps = {
  track(eventName: string): void;
};

export class FreeProvider implements PlanBaseProvider {
  constructor(private readonly deps: FreeDeps) {}

  renderCard(): string {
    return "<div>Free Plan</div>";
  }

  submitCheckout(): void {
    console.log("submit free form");
    this.deps.track("submit_free");
  }

  getDescription(): string {
    return "個人利用向け。基本機能のみ。";
  }

  getButtonColor(): string {
    return "gray";
  }
}

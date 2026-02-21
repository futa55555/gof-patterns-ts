import { PlanBaseProvider } from "./PlanBaseProvider";

type StudentDeps = {
  track(eventName: string): void;
};

export class StudentProvider implements PlanBaseProvider {
  constructor(private readonly deps: StudentDeps) {}

  renderCard(): string {
    return "<div>Student Plan</div>";
  }

  submitCheckout(): void {
    console.log("submit student form");
    this.deps.track("submit_student");
  }

  getDescription(): string {
    return "学生向け。分析機能が半額で利用可能。";
  }

  getButtonColor(): string {
    return "green";
  }
}

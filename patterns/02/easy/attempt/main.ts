import { EnterpriseProvider } from "./providers/EnterpriseProvider";
import { FreeProvider } from "./providers/FreeProvider";
import { PlanBaseProvider } from "./providers/PlanBaseProvider";
import { ProProvider } from "./providers/ProProvider";
import { StudentProvider } from "./providers/StudentProvider";
import { track } from "./services/track";

type PlanType = "free" | "pro" | "enterprise" | "student";

export class PricingPageController {
  private selectedPlan: PlanType = "free";

  selectPlan(plan: PlanType): void {
    this.selectedPlan = plan;
  }

  private planBundles: Record<PlanType, PlanBaseProvider> = {
    free: new FreeProvider({ track }),
    pro: new ProProvider({ track }),
    enterprise: new EnterpriseProvider({ track }),
    student: new StudentProvider({ track }),
  };

  private getPlanBundle(): PlanBaseProvider {
    return this.planBundles[this.selectedPlan];
  }

  renderPlanCard(): string {
    const planBundle = this.getPlanBundle();
    return planBundle.renderCard();
  }

  submitCheckout(): void {
    const planBundle = this.getPlanBundle();
    return planBundle.submitCheckout();
  }

  getPlanDescription(): string {
    const planBundle = this.getPlanBundle();
    return planBundle.getDescription();
  }

  getCheckoutButtonColor(): string {
    const planBundle = this.getPlanBundle();
    return planBundle.getButtonColor();
  }
}

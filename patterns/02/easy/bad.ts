type PlanType = "free" | "pro" | "enterprise";

class FreePlanCard {
  render(): string {
    return "<div>Free Plan</div>";
  }
}

class ProPlanCard {
  render(): string {
    return "<div>Pro Plan</div>";
  }
}

class EnterprisePlanCard {
  render(): string {
    return "<div>Enterprise Plan</div>";
  }
}

class FreeCheckoutForm {
  submit(): void {
    console.log("submit free form");
  }
}

class ProCheckoutForm {
  submit(): void {
    console.log("submit pro form");
  }
}

class EnterpriseCheckoutForm {
  submit(): void {
    console.log("submit enterprise form");
  }
}

export class PricingPageController {
  private selectedPlan: PlanType = "free";

  selectPlan(plan: PlanType): void {
    this.selectedPlan = plan;
  }

  renderPlanCard(): string {
    if (this.selectedPlan === "free") {
      const card = new FreePlanCard();
      return card.render();
    }

    if (this.selectedPlan === "pro") {
      const card = new ProPlanCard();
      return card.render();
    }

    if (this.selectedPlan === "enterprise") {
      const card = new EnterprisePlanCard();
      return card.render();
    }

    return "";
  }

  submitCheckout(): void {
    if (this.selectedPlan === "free") {
      const form = new FreeCheckoutForm();
      form.submit();
      this.track("submit_free");
      return;
    }

    if (this.selectedPlan === "pro") {
      const form = new ProCheckoutForm();
      form.submit();
      this.track("submit_pro");
      return;
    }

    if (this.selectedPlan === "enterprise") {
      const form = new EnterpriseCheckoutForm();
      form.submit();
      this.track("submit_enterprise");
      return;
    }
  }

  // 仕様追加: 料金プランごとの説明文
  getPlanDescription(): string {
    if (this.selectedPlan === "free") {
      return "個人利用向け。基本機能のみ。";
    }
    if (this.selectedPlan === "pro") {
      return "小規模チーム向け。分析機能あり。";
    }
    if (this.selectedPlan === "enterprise") {
      return "大規模組織向け。監査ログとSSO対応。";
    }
    return "";
  }

  // 仕様追加: ボタン色
  getCheckoutButtonColor(): string {
    if (this.selectedPlan === "free") return "gray";
    if (this.selectedPlan === "pro") return "blue";
    if (this.selectedPlan === "enterprise") return "purple";
    return "gray";
  }

  private track(eventName: string): void {
    console.log("[tracking]", eventName);
  }
}

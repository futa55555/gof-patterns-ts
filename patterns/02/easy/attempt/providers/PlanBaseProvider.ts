export interface PlanBaseProvider {
  renderCard(): string;
  submitCheckout(): void;
  getDescription(): string;
  getButtonColor(): string;
}

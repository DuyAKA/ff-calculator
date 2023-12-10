export class ExpensesModel {
  livingCostPerMonth!: number;
  dependents!: number;
  purchaseFund!: number;
  occasionalCost!: number;
  maintenanceCost!: number;
  interestAndRepayment!: number;
  otherExpenses!: number;

  public constructor(init?: Partial<ExpensesModel>) {
    Object.assign(this, init);
  }

  public calculate() {
    return (
      this.livingCostPerMonth * 12 +
      this.dependents +
      this.purchaseFund +
      this.occasionalCost +
      this.maintenanceCost +
      this.interestAndRepayment +
      this.otherExpenses
    );
  }
}

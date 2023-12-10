export class RevenueModel {
  netSalary!: number;
  capitalAssets!: number;
  passiveIncome!: number;
  occasionalIncome!: number;
  otherIncome!: number;
  dependents!: number;
  public constructor(init?: Partial<RevenueModel>) {
    Object.assign(this, init);
  }

  public calculate() {
    return (
      this.netSalary +
      this.capitalAssets +
      this.passiveIncome +
      this.occasionalIncome +
      this.otherIncome +
      this.dependents
    );
  }
}

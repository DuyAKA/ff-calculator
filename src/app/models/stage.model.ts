import { ExpensesModel } from './stage-expense.model';
import { RevenueModel } from './stage-revenue.model';

export class StageModel {
  name!: string;
  description!: string;
  fromAge!: number;
  toAge!: number;
  stageLength!: number;
  revenueModel!: RevenueModel;
  expensesModel!: ExpensesModel;
  stageOfLife!: number;

  public constructor(init?: Partial<StageModel>) {
    Object.assign(this, init);
  }
}

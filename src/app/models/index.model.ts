export class IndexModel {
  expectedInflation!: number;
  expectedInflationIR!: number;

  public constructor(init?: Partial<IndexModel>) {
    Object.assign(this, init);
  }
}

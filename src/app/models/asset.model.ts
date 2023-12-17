export class AssetsModel {
  begin!: number;
  end!: number;
  planLength!: number;
  cash!: number;
  stock!: number;
  bond!: number;
  preciousMetal!: number;
  otherAssets!: number;
  propertyValue!: number;
  propertyValueIR!: number;
  otherRealEstate!: number;
  liablityValue!: number;
  liabilityValueIR!: number;
  provision!: number;

  expectedInflation!: number;
  expectedInflationIR!: number;

  public constructor(init?: Partial<AssetsModel>) {
    Object.assign(this, init);
  }
}

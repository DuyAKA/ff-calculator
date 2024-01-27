export class AssetsModel {
  begin!: number;
  end!: number;
  planLength!: number;
  cash!: number;
  stock!: number;
  bond!: number;
  preciousMetal!: number;
  otherAssets!: number;
  residental!: number;
  commercial!: number;
  vacantLand!: number;
  otherRealEstate!: number;
  liablityValue!: number;
  provision!: number;
  expectedInflation!: number;

  public constructor(init?: Partial<AssetsModel>) {
    Object.assign(this, init);
  }
}

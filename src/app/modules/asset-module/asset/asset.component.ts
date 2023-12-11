import { Component } from '@angular/core';
import { AssetsModel } from '../../../models/asset.model';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrl: './asset.component.css',
})
export class AssetComponent {
  constructor(private formBuilder: FormBuilder) {}

  assets!: AssetsModel;

  assetsForm = this.formBuilder.group({
    begin: [null, Validators.required],
    end: [null, Validators.required],
    cash: null,
    stock: null,
    bond: null,
    preciousMetal: null,
    otherAssets: null,
    propertyValue: null,
    propertyValueIR: null,
    otherRealEstate: null,
    liablityValue: null,
    liabilityValueIR: null,
    provision: null,
  });

  onSubmit() {
    if (this.assetsForm.valid) {
      const {
        begin,
        end,
        cash,
        stock,
        bond,
        preciousMetal,
        otherAssets,
        propertyValue,
        propertyValueIR,
        otherRealEstate,
        liablityValue,
        liabilityValueIR,
        provision,
      } = this.assetsForm.value;

      const planLength = end! - begin!;

      this.assets = new AssetsModel({
        begin,
        end,
        planLength,
        cash,
        stock,
        bond,
        preciousMetal,
        otherAssets,
        propertyValue,
        propertyValueIR,
        otherRealEstate,
        liablityValue,
        liabilityValueIR,
        provision,
      } as Partial<AssetsModel>);
    }

    console.log(this.assets);
  }
}

import { Component, inject } from '@angular/core';
import { AssetsModel } from '../../../models/asset.model';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { setAssets } from '../../../services/data-transfer/actions/assets.actions';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrl: './asset.component.css',
})
export class AssetComponent {
  private store = inject(Store);

  constructor(private formBuilder: FormBuilder) {}

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

      const assetsModel: AssetsModel = {
        begin: begin || 0,
        end: end || 0,
        planLength,
        cash: cash || 0,
        stock: stock || 0,
        bond: bond || 0,
        preciousMetal: preciousMetal || 0,
        otherAssets: otherAssets || 0,
        propertyValue: propertyValue || 0,
        propertyValueIR: propertyValueIR || 0,
        otherRealEstate: otherRealEstate || 0,
        liablityValue: liablityValue || 0,
        liabilityValueIR: liabilityValueIR || 0,
        provision: provision || 0,
      };
      const assets$: Observable<AssetsModel> = this.store.select('assets');

      assets$.subscribe((assets) => {
        console.log(assets);
      });

      this.store.dispatch(setAssets({ assets: assetsModel }));
      assets$.subscribe((assets) => {
        console.log(assets);
      });
    }
  }
}

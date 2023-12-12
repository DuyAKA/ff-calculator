import { Component, OnInit, inject } from '@angular/core';
import { AssetsModel } from '../../../models/asset.model';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { setAssets } from '../../../services/data-transfer/actions/assets.actions';
import { Router } from '@angular/router';
import { StageModel } from '../../../models/stage.model';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrl: './asset.component.css',
})
export class AssetComponent implements OnInit {
  private store = inject(Store);

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.store.select('assets').subscribe((assets) => {
      this.assets = assets;
    });

    this.store.select('stages').subscribe((stages) => {
      this.stages = stages;
    });
  }

  stages!: StageModel[];
  assets!: AssetsModel;
  assetsForm: any;

  onNextButtonClick(): void {
    this.router.navigate(['/stages']);
  }

  clearControlValue(controlName: string) {
    const control = this.assetsForm.get(controlName);
    if (control.value === 0) {
      control.setValue(null);
    }
  }

  displayZero(controlName: string) {
    const control = this.assetsForm.get(controlName);
    if (control.value === null) {
      control.setValue(0);
    }
  }

  ngOnInit(): void {
    this.assetsForm = this.formBuilder.group({
      begin: [this.assets.begin, Validators.required],
      end: [this.assets.end, Validators.required],
      cash: this.assets.cash,
      stock: this.assets.stock,
      bond: this.assets.bond,
      preciousMetal: this.assets.preciousMetal,
      otherAssets: this.assets.otherAssets,
      propertyValue: this.assets.propertyValue,
      propertyValueIR: this.assets.propertyValueIR,
      otherRealEstate: this.assets.otherRealEstate,
      liablityValue: this.assets.liablityValue,
      liabilityValueIR: this.assets.liabilityValueIR,
      provision: this.assets.provision,
    });
  }

  onSubmit() {
    console.log(this.stages);
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

      this.store.dispatch(setAssets({ assets: assetsModel }));
    }
  }
}

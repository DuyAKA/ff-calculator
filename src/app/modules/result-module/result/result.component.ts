import { Component, OnInit, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IndexModel } from '../../../models/index.model';
import { setIndex } from '../../../services/data-transfer/actions/index.actions';
import { AssetsModel } from '../../../models/asset.model';
import { StageModel } from '../../../models/stage.model';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrl: './result.component.css',
})
export class ResultComponent implements OnInit {
  private store = inject(Store);

  assets!: AssetsModel;
  stages: StageModel[] = [];

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.store.select('assets').subscribe((assets) => {
      this.assets = assets;
    });

    this.store.select('stages').subscribe((stages) => {
      this.stages = stages;
    });
  }

  indexForm: any;

  ngOnInit(): void {
    this.indexForm = this.formBuilder.group({
      expectedInflation: 0,
      expectedInflactionIR: 0,
    });
  }

  onBackButtonClick(): void {
    this.router.navigate(['/stages']);
  }

  clearControlValue(controlName: string) {
    const control = this.indexForm.get(controlName);
    if (control.value === 0) {
      control.setValue(null);
    }
  }

  displayZero(controlName: string) {
    const control = this.indexForm.get(controlName);
    if (control.value === null) {
      control.setValue(0);
    }
  }

  nonZeroValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    return value !== 0 ? null : { nonZero: true };
  }

  submitForm() {
    if (this.indexForm.valid) {
      const { expectedInflation, expectedInflactionIR } = this.indexForm.value;
      const indexModel: IndexModel = {
        expectedInflation: expectedInflation || 0,
        expectedInflationIR: expectedInflactionIR || 0,
      };

      this.store.dispatch(setIndex({ index: indexModel }));
    }
  }

  calculateSavingPoints(): number[] {
    const points: number[] = [];

    this.stages.forEach((stage) => {
      for (let i = 1; i <= stage.stageLength; i++) {
        points.push(stage.revenueModel.calculate() * i);
      }
    });

    console.log(points);
    return points;
  }

  calculateSpendingPoints(): number[] {
    const points: number[] = [];

    this.stages.forEach((stage) => {
      for (let i = 1; i <= stage.stageLength; i++) {
        points.push(stage.expensesModel.calculate() * i);
      }
    });

    console.log(points);
    return points;
  }
}

import { StageModel } from '../../../models/stage.model';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { ExpensesModel } from '../../../models/stage-expense.model';
import { RevenueModel } from '../../../models/stage-revenue.model';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AssetsModel } from '../../../models/asset.model';

@Component({
  selector: 'app-stage-of-life',
  templateUrl: './stage-of-life.component.html',
  styleUrls: ['./stage-of-life.component.css'],
})
export class StageOfLifeComponent {
  private store = inject(Store);

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar) {
    this.assets$ = this.store.select('assets');
  }
  assets$!: Observable<AssetsModel>;

  showAssets() {
    this.assets$.subscribe((assets) => {
      console.log(assets);
    });
  }

  isFormOn = false;

  stages: StageModel[] = [];

  stageInfoForm = this.formBuilder.group({
    name: [null, Validators.required],
    description: [null, Validators.required],
    fromAge: [null, Validators.required],
    toAge: [null, Validators.required],
    revenue: this.formBuilder.group({
      netSalary: null,
      capitalAssets: null,
      passiveIncome: null,
      occasionalIncome: null,
      otherIncome: null,
      dependents: null,
    }),
    expense: this.formBuilder.group({
      livingCostPerMonth: null,
      dependents: null,
      purchaseFund: null,
      occasionalCost: null,
      maintenanceCost: null,
      interestAndRepayment: null,
      otherExpenses: null,
    }),
  });

  addStage() {
    this.isFormOn = true;
  }

  closeForm() {
    this.isFormOn = false;
    this.stageInfoForm.reset();
  }

  onSubmit() {
    const missingFields: string[] = [];

    if (!this.stageInfoForm.get('name')!.value) {
      missingFields.push("Stage's name");
    }

    if (!this.stageInfoForm.get('description')!.value) {
      missingFields.push('Description');
    }

    if (!this.stageInfoForm.get('fromAge')!.value) {
      missingFields.push('From age');
    }

    if (!this.stageInfoForm.get('toAge')!.value) {
      missingFields.push('To age');
    }

    if (this.stageInfoForm.valid) {
      const name = this.stageInfoForm.value.name!;
      const description = this.stageInfoForm.value.description!;
      const fromAge: number = this.stageInfoForm.value.fromAge!;
      const toAge: number = this.stageInfoForm.value.toAge!;
      const stageLength: number = toAge - fromAge;

      const revenueModel = new RevenueModel({
        netSalary: this.stageInfoForm.value.revenue?.netSalary!,
        capitalAssets: this.stageInfoForm.value.revenue?.capitalAssets!,
        occasionalIncome: this.stageInfoForm.value.revenue?.occasionalIncome!,
        passiveIncome: this.stageInfoForm.value.revenue?.passiveIncome!,
        otherIncome: this.stageInfoForm.value.revenue?.otherIncome!,
        dependents: this.stageInfoForm.value.revenue?.dependents!,
      });

      const expensesModel = new ExpensesModel({
        livingCostPerMonth:
          this.stageInfoForm.value.expense?.livingCostPerMonth!,
        dependents: this.stageInfoForm.value.expense?.dependents!,
        interestAndRepayment:
          this.stageInfoForm.value.expense?.interestAndRepayment!,
        maintenanceCost: this.stageInfoForm.value.expense?.maintenanceCost!,
        occasionalCost: this.stageInfoForm.value.expense?.occasionalCost!,
        purchaseFund: this.stageInfoForm.value.expense?.purchaseFund!,
        otherExpenses: this.stageInfoForm.value.expense?.otherExpenses!,
      });

      const expenses = expensesModel.calculate();
      const revenue = revenueModel.calculate();

      const stageOfLife = revenue - expenses;

      this.stages.push(
        new StageModel({
          name,
          description,
          fromAge,
          toAge,
          stageLength,
          revenueModel,
          expensesModel,
          stageOfLife,
        } as Partial<StageModel>)
      );

      this.closeForm();
    } else {
      const message = `Please fill in the following required fields: ${missingFields.join(
        ', '
      )}`;

      const config: MatSnackBarConfig = {
        verticalPosition: 'top',
        horizontalPosition: 'center',
        duration: 5000,
      };
      this.snackBar.open(message, 'Close', config);
    }
  }
}

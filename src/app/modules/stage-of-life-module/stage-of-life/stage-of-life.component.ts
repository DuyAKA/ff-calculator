import { StageModel } from '../../../models/stage.model';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Component, inject } from '@angular/core';
import { ExpensesModel } from '../../../models/stage-expense.model';
import { RevenueModel } from '../../../models/stage-revenue.model';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { addStage } from '../../../services/data-transfer/actions/stages.actions';

@Component({
  selector: 'app-stage-of-life',
  templateUrl: './stage-of-life.component.html',
  styleUrls: ['./stage-of-life.component.css'],
})
export class StageOfLifeComponent {
  private store = inject(Store);
  stageInfoForm: any;
  revenueForm: any;
  expenseForm: any;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.store.select('stages').subscribe((stages) => {
      this.stages = stages;
    });
  }

  onBackButtonClick(): void {
    this.router.navigate(['/']);
  }

  onNextButtonClick(): void {
    this.router.navigate(['/result']);
  }

  clearControlValue(form: FormGroup, controlName: string) {
    const control = form.get(controlName);
    if (control!.value === 0) {
      control!.setValue(null);
    }
  }

  displayZero(form: FormGroup, controlName: string) {
    const control = form.get(controlName);
    if (control!.value === null) {
      control!.setValue(0);
    }
  }

  nonZeroValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    return value !== 0 ? null : { nonZero: true };
  }

  isFormOn = false;

  stages: StageModel[] = [];

  addStageForm() {
    this.isFormOn = true;

    this.revenueForm = this.formBuilder.group({
      netSalary: 0,
      capitalAssets: 0,
      passiveIncome: 0,
      occasionalIncome: 0,
      otherIncome: 0,
      dependents: 0,
    });

    (this.expenseForm = this.formBuilder.group({
      livingCostPerMonth: 0,
      dependents: 0,
      purchaseFund: 0,
      occasionalCost: 0,
      maintenanceCost: 0,
      interestAndRepayment: 0,
      otherExpenses: 0,
    })),
      (this.stageInfoForm = this.formBuilder.group({
        name: [null, Validators.required],
        description: [null, Validators.required],
        fromAge: [0, [Validators.required, this.nonZeroValidator]],
        toAge: [0, [Validators.required, this.nonZeroValidator]],
        revenue: this.revenueForm,
        expense: this.expenseForm,
      }));
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

      this.store.dispatch(
        addStage(
          new StageModel({
            name,
            description,
            fromAge,
            toAge,
            stageLength,
            revenueModel,
            expensesModel,
            stageOfLife,
          })
        )
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

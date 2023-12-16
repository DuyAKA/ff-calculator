import { Component, OnInit, inject, PLATFORM_ID, Inject } from '@angular/core';
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
import * as Highcharts from 'highcharts';
import { isPlatformBrowser } from '@angular/common';
interface Point {
  x: number;
  y: number;
}
@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrl: './result.component.css',
})
export class ResultComponent implements OnInit {
  private store = inject(Store);

  assets!: AssetsModel;
  stages: StageModel[] = [];

  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor: string = 'chart';
  chartOptions: Highcharts.Options = {};

  isServer = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.store.select('assets').subscribe((assets) => {
      this.assets = assets;
    });

    this.store.select('stages').subscribe((stages) => {
      this.stages = stages;
    });

    this.isServer = !isPlatformBrowser(platformId);

    this.chartOptions = {
      plotOptions: {
        line: {
          pointStart: this.assets.begin,
        },
      },
      accessibility: {
        enabled: false,
      },
      title: {
        text: 'Financial Freedom Point Chart',
      },
      xAxis: {
        title: {
          text: 'Age',
        },
      },
      yAxis: {
        title: {
          text: 'Money',
        },
      },
      series: [
        {
          name: 'Saving Capital',
          data: this.calculateSavingPoints(),
          type: 'line',
        },
        {
          name: 'Consumner Capital',
          data: this.calculateSpendingPoints(),
          type: 'line',
        },

        {
          name: 'intersect',
          data: [],
          type: 'scatter',
        },
      ],
    };
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
    let savingPreviousStage = 0;

    this.stages.forEach((stage) => {
      for (let i = 1; i < stage.stageLength + 1; i++) {
        points.push(savingPreviousStage + stage.revenueModel.calculate() * i);

        if (i === stage.stageLength - 1) {
          savingPreviousStage = points[points.length - 1];
        }
      }
    });

    console.log(points);
    return points;
  }

  calculateSpendingPoints(): number[] {
    let points: number[] = [];
    let spendingPreviousStage = 0;

    this.stages.forEach((stage) => {
      for (let i = 1; i < stage.stageLength + 1; i++) {
        points.push(
          spendingPreviousStage + stage.expensesModel.calculate() * i
        );

        if (i === stage.stageLength - 1) {
          spendingPreviousStage = points[points.length - 1];
        }
      }
    });
    points = points.reverse();
    console.log(points);
    return points;
  }

  get_line_intersection(p0: any, p1: any, p2: any, p3: any) {
    var p0_x = p0.x;
    var p0_y = p0.y;
    var p1_x = p1.x;
    var p1_y = p1.y;
    var p2_x = p2.x;
    var p2_y = p2.y;
    var p3_x = p3.x;
    var p3_y = p3.y;

    var s1_x, s1_y, s2_x, s2_y;
    s1_x = p1_x - p0_x;
    s1_y = p1_y - p0_y;
    s2_x = p3_x - p2_x;
    s2_y = p3_y - p2_y;

    var s =
      (-s1_y * (p0_x - p2_x) + s1_x * (p0_y - p2_y)) /
      (-s2_x * s1_y + s1_x * s2_y);
    var t =
      (s2_x * (p0_y - p2_y) - s2_y * (p0_x - p2_x)) /
      (-s2_x * s1_y + s1_x * s2_y);

    if (s >= 0 && s <= 1 && t >= 0 && t <= 1) {
      return [p0_x + t * s1_x, p0_y + t * s1_y];
    }

    return null;
  }

  onChartInstance(chart: Highcharts.Chart): void {
    if (chart) {
      var s0 = chart.series[0].data;
      var s1 = chart.series[1].data;
      var s2 = chart.series[2];
      var n0 = s0!.length;
      var n1 = s1!.length;
      var i, j, isect;
      for (i = 1; i < n0; i++) {
        for (j = 1; j < n1; j++) {
          if (
            (isect = this.get_line_intersection(
              s0[i - 1],
              s0[i],
              s1[j - 1],
              s1[j]
            ))
          ) {
            s2.addPoint(isect, false, false);
          }
        }
      }
      chart.redraw();
    }
  }
}

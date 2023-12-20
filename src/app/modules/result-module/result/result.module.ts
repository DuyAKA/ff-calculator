import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultComponent } from './result.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  declarations: [ResultComponent],
  imports: [
    CommonModule,
    FormsModule,
    HighchartsChartModule,
    ReactiveFormsModule,
  ],
})
export class ResultModule {}

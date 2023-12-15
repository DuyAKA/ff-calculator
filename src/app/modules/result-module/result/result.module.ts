import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultComponent } from './result.component';
import { FormsModule } from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  declarations: [ResultComponent],
  imports: [CommonModule, FormsModule, HighchartsChartModule],
})
export class ResultModule {}

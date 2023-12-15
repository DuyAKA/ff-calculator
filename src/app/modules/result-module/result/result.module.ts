import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultComponent } from './result.component';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'angular-highcharts';

@NgModule({
  declarations: [ResultComponent],
  imports: [CommonModule, FormsModule, ChartModule],
})
export class ResultModule {}

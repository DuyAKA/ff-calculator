import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StageOfLifeComponent } from './stage-of-life.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  declarations: [StageOfLifeComponent],
  imports: [
    CommonModule,
    FormsModule,
    HighchartsChartModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
})
export class StageOfLifeModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StageOfLifeComponent } from './stage-of-life.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [StageOfLifeComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class StageOfLifeModule {}

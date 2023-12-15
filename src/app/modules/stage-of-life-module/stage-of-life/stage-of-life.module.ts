import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StageOfLifeComponent } from './stage-of-life.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [StageOfLifeComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FontAwesomeModule],
})
export class StageOfLifeModule {}

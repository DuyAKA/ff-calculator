import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetComponent } from './asset.component';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AssetComponent],
  imports: [CommonModule, MatTabsModule, FormsModule, ReactiveFormsModule],
})
export class AssetModule {}

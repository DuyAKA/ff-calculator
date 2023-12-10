import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetComponent } from './asset.component';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [AssetComponent],
  imports: [CommonModule, MatTabsModule],
})
export class AssetModule {}

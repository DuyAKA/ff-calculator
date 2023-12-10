import { Routes } from '@angular/router';
import { AssetComponent } from './modules/asset-module/asset/asset.component';
import { StageOfLifeComponent } from './modules/stage-of-life-module/stage-of-life/stage-of-life.component';

export const routes: Routes = [
  { path: '', component: AssetComponent },
  {
    path: 'stages',
    component: StageOfLifeComponent,
  },
];

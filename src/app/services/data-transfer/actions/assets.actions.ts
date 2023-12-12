import { createAction, props } from '@ngrx/store';
import { AssetsModel } from '../../../models/asset.model';

export const setAssets = createAction(
  '[Assets] Set Assets',
  props<{ assets: AssetsModel }>()
);

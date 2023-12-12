import { ActionReducerMap } from '@ngrx/store';
import { assetsReducer } from './assets.reducer';
import { AssetsModel } from '../../../models/asset.model';

export interface State {
  assets: AssetsModel;
}

export const reducers: ActionReducerMap<State> = {
  assets: assetsReducer,
};

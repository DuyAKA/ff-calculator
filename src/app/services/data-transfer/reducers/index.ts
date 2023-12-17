import { ActionReducerMap } from '@ngrx/store';
import { assetsReducer } from './assets.reducer';
import { AssetsModel } from '../../../models/asset.model';
import { StageModel } from '../../../models/stage.model';
import { stagesReducer } from './stages.reducer';

export interface State {
  assets: AssetsModel;
  stages: StageModel[];
}

export const reducers: ActionReducerMap<State> = {
  assets: assetsReducer,
  stages: stagesReducer,
};

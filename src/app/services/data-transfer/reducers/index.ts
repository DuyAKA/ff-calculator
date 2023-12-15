import { ActionReducerMap } from '@ngrx/store';
import { assetsReducer } from './assets.reducer';
import { AssetsModel } from '../../../models/asset.model';
import { StageModel } from '../../../models/stage.model';
import { stagesReducer } from './stages.reducer';
import { indexReducer } from './index.reducer';
import { IndexModel } from '../../../models/index.model';

export interface State {
  assets: AssetsModel;
  stages: StageModel[];
  index: IndexModel;
}

export const reducers: ActionReducerMap<State> = {
  assets: assetsReducer,
  stages: stagesReducer,
  index: indexReducer,
};

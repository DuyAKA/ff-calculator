import { createAction, props } from '@ngrx/store';
import { StageModel } from '../../../models/stage.model';

export const addStage = createAction(
  '[Stages] Add Stage',
  (stage: StageModel) => ({ stage })
);

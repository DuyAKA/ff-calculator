import { createAction, props } from '@ngrx/store';
import { StageModel } from '../../../models/stage.model';

export const addStage = createAction(
  '[Stages] Add Stage',
  (stage: StageModel) => ({ stage })
);

export const editStage = createAction(
  '[Stages] Edit Stage',
  props<{ stage: StageModel; editIndex: number }>()
);

export const deleteStage = createAction(
  '[Stages] Delete Stage',
  props<{ index: number }>()
);

import { createAction, props } from '@ngrx/store';
import { StageModel } from '../../../models/stage.model';

export const setStages = createAction(
  '[Stages] Set Stages',
  props<{ stages: StageModel[] }>()
);

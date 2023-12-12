import { createReducer, on } from '@ngrx/store';
import * as StagesActions from '../actions/stages.actions';
import { StageModel } from '../../../models/stage.model';

export const initialState: StageModel[] = [];

export const stagesReducer = createReducer(
  initialState,
  on(StagesActions.addStage, (state, { stage }) => [...state, stage])
);

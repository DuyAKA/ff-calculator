import { createReducer, on } from '@ngrx/store';
import * as StagesActions from '../actions/stages.actions';
import { StageModel } from '../../../models/stage.model';

export const initialState: StageModel[] = [];

export const stagesReducer = createReducer(
  initialState,
  on(StagesActions.addStage, (state, { stage }) => [...state, stage]),

  on(StagesActions.editStage, (state, { stage, editIndex }) => {
    console.log(editIndex);
    if (editIndex < 0 || editIndex >= state.length) {
      return state;
    }

    const updatedState = [...state];
    updatedState[editIndex] = stage;

    return updatedState;
  }),

  on(StagesActions.deleteStage, (state, { index }) => {
    if (index < 0 || index >= state.length) {
      return state;
    }

    const updatedState = state.filter((_, i) => i !== index);

    return updatedState;
  })
);

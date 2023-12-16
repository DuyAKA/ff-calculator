import { createReducer, on } from '@ngrx/store';
import * as StagesActions from '../actions/stages.actions';
import { StageModel } from '../../../models/stage.model';

export const initialState: StageModel[] = [];

export const stagesReducer = createReducer(
  initialState,
  on(StagesActions.addStage, (state, { stage }) => [...state, stage]),

  on(StagesActions.editStage, (state, { stage, editIndex }) => {
    if (editIndex < 0 || editIndex >= state.length) {
      return state;
    }

    console.log(stage);

    const updatedState = [...state];
    updatedState[editIndex] = stage;

    const stageAffectedIndex = state.findIndex(
      (stageToFind) => stageToFind.fromAge === state[editIndex].toAge
    );

    if (stageAffectedIndex !== -1) {
      updatedState[stageAffectedIndex] = new StageModel({
        ...state[stageAffectedIndex],
        fromAge: stage.toAge,
      });
    }

    return updatedState;
  }),

  on(StagesActions.deleteStage, () => {
    return [];
  })
);

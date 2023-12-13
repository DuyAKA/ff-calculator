import { createReducer, on } from '@ngrx/store';
import { State } from '.';
import { IndexModel } from '../../../models/index.model';
import * as IndexAction from '../actions/index.actions';

export const initialState: IndexModel = {
  expectedInflation: 0,
  expectedInflationIR: 0,
};

export const assetsReducer = createReducer(
  initialState,
  on(IndexAction.setIndex, (_, { index }) => index)
);

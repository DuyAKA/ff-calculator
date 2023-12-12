import { createReducer, createSelector, on } from '@ngrx/store';
import * as AssetsActions from '../actions/assets.actions';
import { AssetsModel } from '../../../models/asset.model';
import { State } from '.';

export const initialState: AssetsModel = {
  begin: 0,
  end: 0,
  planLength: 0,
  cash: 0,
  stock: 0,
  bond: 0,
  preciousMetal: 0,
  otherAssets: 0,
  propertyValue: 0,
  propertyValueIR: 0,
  otherRealEstate: 0,
  liablityValue: 0,
  liabilityValueIR: 0,
  provision: 0,
};

export const assetsReducer = createReducer(
  initialState,
  on(AssetsActions.setAssets, (_, { assets }) => assets)
);

import { createReducer, on } from '@ngrx/store';
import * as AssetsActions from '../actions/assets.actions';
import { AssetsModel } from '../../../models/asset.model';

export const initialState: AssetsModel = {
  begin: 0,
  end: 0,
  planLength: 0,
  cash: 0,
  stock: 0,
  bond: 0,
  preciousMetal: 0,
  otherAssets: 0,
  residental: 0,
  commercial: 0,
  vacantLand: 0,
  otherRealEstate: 0,
  liablityValue: 0,
  provision: 0,
  expectedInflation: 0,
};

export const assetsReducer = createReducer(
  initialState,
  on(AssetsActions.setAssets, (_, { assets }) => assets)
);

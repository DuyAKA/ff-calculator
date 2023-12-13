import { createAction, props } from '@ngrx/store';
import { IndexModel } from '../../../models/index.model';

export const setIndex = createAction(
  '[Index] Set Index',
  props<{ index: IndexModel }>()
);

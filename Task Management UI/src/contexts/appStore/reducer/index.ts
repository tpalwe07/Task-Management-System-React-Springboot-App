import { type TOAST_ACTIONS, type TOAST_STATE, initialToastState, toastReducer } from './toastReducer';

export const initialState = {
  ...initialToastState
};

export type ALLOWED_ACTIONS = TOAST_ACTIONS;

export type STORE_STATE = TOAST_STATE;

export const reducer = (state: STORE_STATE, action: ALLOWED_ACTIONS) => {
  // Combining the reducers
  state = {
    ...state,
    ...toastReducer(state, action as TOAST_ACTIONS)
  };

  return state;
};

export { TOAST_ENUM } from './toastReducer';

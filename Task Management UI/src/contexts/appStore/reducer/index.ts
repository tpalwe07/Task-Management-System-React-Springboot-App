import { type THEME_ACTIONS, THEME_ENUM, type THEME_STATE, initialThemeState, themeReducer } from './themeReducer';
import { type TOAST_ACTIONS, TOAST_ENUM, type TOAST_STATE, initialToastState, toastReducer } from './toastReducer';

export const initialState = {
  ...initialToastState,
  ...initialThemeState
};

export type ALLOWED_ACTIONS = TOAST_ACTIONS | THEME_ACTIONS;

export type STORE_STATE = TOAST_STATE & THEME_STATE;

export const reducer = (state: STORE_STATE, action: ALLOWED_ACTIONS): STORE_STATE => {
  // Apply toast reducer only for toast actions
  if (Object.values(TOAST_ENUM).includes(action.type as TOAST_ENUM)) {
    const toastState = toastReducer(state, action as TOAST_ACTIONS);
    return {
      ...state,
      toast: toastState.toast
    };
  }

  // Apply theme reducer only for theme actions
  if (Object.values(THEME_ENUM).includes(action.type as THEME_ENUM)) {
    const themeState = themeReducer(state, action as THEME_ACTIONS);
    return {
      ...state,
      mode: themeState.mode
    };
  }

  return state;
};

export { THEME_ENUM } from './themeReducer';
export { TOAST_ENUM } from './toastReducer';

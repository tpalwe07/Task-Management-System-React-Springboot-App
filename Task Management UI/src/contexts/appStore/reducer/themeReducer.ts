export enum THEME_ENUM {
  TOGGLE_THEME = 'TOGGLE_THEME',
  SET_THEME = 'SET_THEME'
}

export type ThemeMode = 'light' | 'dark';

interface TOGGLE_THEME_ACTION {
  type: THEME_ENUM.TOGGLE_THEME;
}

interface SET_THEME_ACTION {
  type: THEME_ENUM.SET_THEME;
  payload: ThemeMode;
}

export interface THEME_STATE {
  mode: ThemeMode;
}

export type THEME_ACTIONS = TOGGLE_THEME_ACTION | SET_THEME_ACTION;

// Get initial theme from localStorage or default to light
const getInitialTheme = (): ThemeMode => {
  const savedTheme = localStorage.getItem('theme-mode');
  return (savedTheme === 'dark' || savedTheme === 'light') ? savedTheme : 'light';
};

export const initialThemeState: THEME_STATE = {
  mode: getInitialTheme()
};

const saveThemeToLocalStorage = (mode: ThemeMode): void => {
  localStorage.setItem('theme-mode', mode);
};

const handleToggleTheme = (currentMode: ThemeMode): ThemeMode => {
  const newMode = currentMode === 'light' ? 'dark' : 'light';
  saveThemeToLocalStorage(newMode);
  return newMode;
};

const handleSetTheme = (mode: ThemeMode): ThemeMode => {
  saveThemeToLocalStorage(mode);
  return mode;
};

export const themeReducer = (state: THEME_STATE, action: THEME_ACTIONS): THEME_STATE => {
  switch (action.type) {
    case THEME_ENUM.TOGGLE_THEME:
      return { ...state, mode: handleToggleTheme(state.mode) };

    case THEME_ENUM.SET_THEME:
      return { ...state, mode: handleSetTheme(action.payload) };

    default:
      return state;
  }
};

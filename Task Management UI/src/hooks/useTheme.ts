import { useContext } from 'react';
import { AppStore } from '../contexts/appStore/store';
import { THEME_ENUM } from '../contexts/appStore/reducer';
import { selectThemeMode } from '../contexts/appStore/selector';
import type { ThemeMode } from '../contexts/appStore/reducer/themeReducer';

interface UseThemeReturn {
  mode: ThemeMode;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

export const useTheme = (): UseThemeReturn => {
  const { state, dispatch } = useContext(AppStore);
  const mode = selectThemeMode(state);

  const toggleTheme = () => {
    dispatch({ type: THEME_ENUM.TOGGLE_THEME });
  };

  const setTheme = (newMode: ThemeMode) => {
    dispatch({ type: THEME_ENUM.SET_THEME, payload: newMode });
  };

  return {
    mode,
    toggleTheme,
    setTheme
  };
};

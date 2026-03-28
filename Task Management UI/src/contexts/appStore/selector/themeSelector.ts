import type { STORE_STATE } from '../reducer';
import type { ThemeMode } from '../reducer/themeReducer';

export const selectThemeMode = (state: STORE_STATE): ThemeMode => state.mode;

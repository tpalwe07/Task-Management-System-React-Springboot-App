import { createContext, useReducer } from 'react';
import { type ALLOWED_ACTIONS, type STORE_STATE, initialState, reducer } from './reducer';

interface ContextType {
  state: STORE_STATE;
  dispatch: React.Dispatch<ALLOWED_ACTIONS>;
}

export const AppStore = createContext<ContextType>({} as ContextType);

const AppStoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <AppStore.Provider value={{ state, dispatch }}>{children}</AppStore.Provider>;
};

AppStoreProvider.displayName = 'AppStoreProvider';

export default AppStoreProvider;


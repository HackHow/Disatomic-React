import { createContext, useContext } from 'react';

export const GlobalContext = createContext();

export function useGlobal() {
  return useContext(GlobalContext);
}

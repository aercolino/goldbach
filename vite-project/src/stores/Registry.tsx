import { createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";

export interface RegistryType {
  [id: string]: {
    list: number[];
    groups: {
      sum: number;
      addenda: number[];
    }[][];
  };
}

function makeRegistryContext() {
  const [registry, setRegistry] = createStore({} as RegistryType);
  return [registry, setRegistry] as const;
}

type RegistryContextType = ReturnType<typeof makeRegistryContext>;

const context = createContext<RegistryContextType>(null);

export const injectedRegistry = () => useContext(context);

export function InjectRegistry(props = {}) {
  return (
    <context.Provider value={makeRegistryContext()}>
      {props.children}
    </context.Provider>
  );
}

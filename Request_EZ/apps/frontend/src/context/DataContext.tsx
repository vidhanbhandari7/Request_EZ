import { createContext, ReactNode, useState, useContext } from "react";

export const DataContext = createContext<
  Partial<{
    headers: RequestTab[];
    setHeaders: React.Dispatch<React.SetStateAction<RequestTab[]>>;
    params: RequestTab[];
    setParams: React.Dispatch<React.SetStateAction<RequestTab[]>>;
    body: RequestTab[];
    setBody: React.Dispatch<React.SetStateAction<RequestTab[]>>;
  }>
>({} as any);

interface RequestTab {
  id: number;
  key: string;
  value: string;
}

export const DataContextProvider = ({ children }: { children: ReactNode }) => {
  const [headers, setHeaders] = useState<RequestTab[]>([
    { id: 1, key: "", value: "" },
  ]);
  const [params, setParams] = useState<RequestTab[]>([
    { id: 1, key: "", value: "" },
  ]);
  const [body, setBody] = useState<RequestTab[]>([
    { id: 1, key: "", value: "" },
  ]);

  return (
    <DataContext.Provider
      value={{ headers, setHeaders, params, setParams, body, setBody }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useRequestTabs must be used within a RequestTabsProvider");
  }
  return context;
};

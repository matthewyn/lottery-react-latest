import React, { createContext, useContext, useState } from "react";
import { differenceInSeconds } from "date-fns";

interface DateProviderProps {
  children: React.ReactNode;
}

export type DateContextType = {
  timeRemaining: number;
  setTimeRemaining: React.Dispatch<React.SetStateAction<number>>;
};

const DateContext = createContext<DateContextType | null>(null);

function DateProvider({ children }: DateProviderProps) {
  const [timeRemaining, setTimeRemaining] = useState(() => {
    return differenceInSeconds(new Date(2024, 2, 31), new Date());
  });

  return <DateContext.Provider value={{ timeRemaining, setTimeRemaining }}>{children}</DateContext.Provider>;
}

function useDate() {
  const context = useContext(DateContext);
  return context;
}

export { DateProvider, useDate };

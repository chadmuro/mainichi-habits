import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import dayjs from "dayjs";
import { getLast365Days } from "../utils/getLast365Days";

type DateContextType = {
  dates: string[];
};

const DatesContext = createContext<DateContextType | undefined>(undefined);

const DatesProvider = ({ children }: PropsWithChildren<{}>) => {
  const today = dayjs();
  const todayFormatted = today.format("YYYY-MM-DD");

  const [dates, setDates] = useState<string[]>([]);

  useEffect(() => {
    const lastDates = getLast365Days(today);
    setDates(lastDates);
  }, [todayFormatted]);

  const value = { dates };

  return (
    <DatesContext.Provider value={value}>{children}</DatesContext.Provider>
  );
};

const useDates = () => {
  const context = useContext(DatesContext);
  if (context === undefined) {
    throw new Error("useDates must be used within a DatesProvider");
  }
  return context;
};

export { DatesProvider, useDates };

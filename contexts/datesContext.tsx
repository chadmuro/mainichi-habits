import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import dayjs from "dayjs";
import { getLast365Days } from "../utils/getLast365Days";
import { useSettingsState } from "../store/settings";
import { WeekStart } from "../types";

type DateContextType = {
  dates: string[];
};

const DatesContext = createContext<DateContextType | undefined>(undefined);

const DatesProvider = ({ children }: PropsWithChildren<{}>) => {
  const { settings } = useSettingsState();

  const weekStart = settings.get()?.week_start;
  const today = dayjs();
  const todayFormatted = today.format("YYYY-MM-DD");

  const [dates, setDates] = useState<string[]>([]);

  useEffect(() => {
    if (weekStart !== undefined) {
      const lastDates = getLast365Days(today, weekStart as WeekStart);
      setDates(lastDates);
    }
  }, [todayFormatted, weekStart]);

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

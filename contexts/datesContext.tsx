import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import updateLocale from "dayjs/plugin/updateLocale";
import { getLast365Days } from "../utils/getLast365Days";
import { useSettingsState } from "../store/settings";

type DateContextType = {
  dates: string[];
  setTodayFormatted: React.Dispatch<React.SetStateAction<string>>;
};

const DatesContext = createContext<DateContextType | undefined>(undefined);

const DatesProvider = ({ children }: PropsWithChildren<{}>) => {
  const { settings } = useSettingsState();

  const weekStart = settings.get()?.week_start;
  const today = dayjs();

  const [todayFormatted, setTodayFormatted] = useState(
    today.format("YYYY-MM-DD")
  );

  const [dates, setDates] = useState<string[]>([]);
  useEffect(() => {
    if (weekStart !== undefined) {
      // set dayjs global weekday and locale
      dayjs.extend(weekday);
      dayjs.extend(updateLocale);
      dayjs.updateLocale("en", {
        weekStart: weekStart,
      });
      const lastDates = getLast365Days(todayFormatted);
      setDates(lastDates);
    }
  }, [todayFormatted, weekStart]);

  const value = { dates, setTodayFormatted };

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

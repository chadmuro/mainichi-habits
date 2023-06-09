import { ScrollView, View, StyleSheet } from "react-native";
import YearDay from "./YearDay";
import { getLast365Days } from "../../utils/getLast365Days";
import { useMemo, useRef } from "react";
import { Check } from "../../types";
import { adjustColor } from "../../utils/adjustColor";
import dayjs from "dayjs";
import { useTheme } from "../../contexts/themeContext";

interface Props {
  color: string;
  checks: Check[];
  startDate: string;
}

export default function YearGrid({ color, checks, startDate }: Props) {
  const { theme, selectedTheme } = useTheme();
  const today = dayjs();
  const todayFormatted = today.format("YYYY-MM-DD");
  const scrollViewRef = useRef<ScrollView | null>(null);
  const days = useMemo(() => {
    return getLast365Days(today);
  }, [todayFormatted]);

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      horizontal={true}
      ref={scrollViewRef}
      onContentSizeChange={() =>
        scrollViewRef.current?.scrollToEnd({ animated: false })
      }
    >
      <View style={styles.container}>
        {days.map((day) => {
          let dayColor = color;
          if (day < startDate || day > todayFormatted) {
            dayColor = adjustColor(
              theme.colors.background,
              selectedTheme === "dark" ? 50 : -50
            );
          } else {
            const index = checks.findIndex((check) => check.date === day);
            if (index === -1) {
              dayColor = adjustColor(color, -100);
            }
          }
          return <YearDay key={day} color={dayColor} />;
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 2,
    height: 12 * 7,
    flexWrap: "wrap",
  },
});

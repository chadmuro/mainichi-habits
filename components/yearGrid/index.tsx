import { ScrollView, View, StyleSheet } from "react-native";
import YearDay from "./YearDay";
import { useRef } from "react";
import { Check } from "../../types";
import dayjs from "dayjs";
import { useTheme } from "../../contexts/themeContext";
import {
  HabitColorTitle,
  HabitMainColor,
  habitMainColorMap,
} from "../../theme";
import { useDates } from "../../contexts/datesContext";

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
  const { dates } = useDates();

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      horizontal={true}
      ref={scrollViewRef}
      onContentSizeChange={() =>
        scrollViewRef.current?.scrollToEnd({ animated: false })
      }
    >
      <View
        style={styles.container}
        onStartShouldSetResponder={(event) => true}
        onTouchEnd={(e) => {
          e.stopPropagation();
        }}
      >
        {dates.map((day) => {
          let dayColor = color;
          if (day < startDate || day > todayFormatted) {
            dayColor = theme.colors.foreground;
          } else {
            const index = checks.findIndex((check) => check.date === day);
            if (index === -1) {
              dayColor =
                selectedTheme === "dark"
                  ? theme.colors.habit[
                      habitMainColorMap[
                        color as HabitMainColor
                      ] as HabitColorTitle
                    ].dark
                  : theme.colors.habit[
                      habitMainColorMap[
                        color as HabitMainColor
                      ] as HabitColorTitle
                    ].light;
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

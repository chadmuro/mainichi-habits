import { View, ScrollView } from "react-native";
import Text from "../../../components/styled/Text";
import HabitCard from "../../../components/habitCard";
import TabLayout from "../../../components/TabLayout";
import { useHabitState } from "../../../store/habits";
import { theme } from "../../../theme";
import { useInitialLoad } from "../../../hooks/useInitialLoad";
export default function Today() {
  const { habits } = useHabitState();
  const { appLoaded } = useInitialLoad();

  // TODO implemenet logic to keep splash screen visibile while data is fetching
  // https://github.com/expo/expo/issues/21662
  if (!appLoaded) {
    return (
      <TabLayout>
        <View></View>
      </TabLayout>
    );
  }

  let habitCards: React.ReactElement | null = null;
  if (habits.get().length === 0) {
    habitCards = <Text style={{ margin: theme.spacing.m }}>No habits</Text>;
  } else {
    habitCards = (
      <>
        {habits.get().map((habit) => (
          <HabitCard key={habit.id} habit={habit} />
        ))}
      </>
    );
  }

  return (
    <TabLayout>
      <ScrollView style={{ width: "100%" }}>
        <View
          style={{
            width: "100%",
            height: "100%",
            gap: theme.spacing.m,
          }}
        >
          {habitCards}
        </View>
      </ScrollView>
    </TabLayout>
  );
}

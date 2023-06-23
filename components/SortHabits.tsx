import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import Text from "./styled/Text";
import { Habit } from "../types";
import { adjustColor } from "../utils/adjustColor";
import { useHabitState } from "../store/habits";
import { getHabitSeq } from "../utils/getHabitSeq";
import { useTheme } from "../contexts/themeContext";

if (__DEV__) {
  const ignoreWarns = [
    "VirtualizedLists should never be nested inside plain ScrollViews",
  ];

  const errorWarn = global.console.error;
  global.console.error = (...arg) => {
    for (const error of ignoreWarns) {
      if (arg[0].startsWith(error)) {
        return;
      }
    }
    errorWarn(...arg);
  };
}

interface Props {
  habits: Habit[];
}

export default function SortHabits({ habits }: Props) {
  const [data, setData] = useState<Habit[]>([]);
  const { updateHabitSeq } = useHabitState();
  const { theme, selectedTheme } = useTheme();

  useEffect(() => {
    setData(habits);
  }, [habits]);

  const renderItem = ({ item, drag, isActive }: RenderItemParams<Habit>) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity
          // onPressIn={drag}
          onLongPress={drag}
          disabled={isActive}
          style={{
            backgroundColor:
              selectedTheme === "dark"
                ? adjustColor(item.color, -100)
                : adjustColor(item.color, 100),
            width: "100%",
            padding: theme.spacing.m,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Text style={{ fontSize: 16, flex: 1 }}>{item.title}</Text>
          <Ionicons
            name="reorder-three-outline"
            size={24}
            color={theme.colors.text}
          />
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  return (
    <>
      <DraggableFlatList
        containerStyle={{ width: "100%" }}
        data={data}
        onDragEnd={({ data }) => {
          setData(data);
          const seqHabits = getHabitSeq(data);
          updateHabitSeq(seqHabits);
        }}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </>
  );
}

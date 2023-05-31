import { useState } from "react";
import { TouchableOpacity } from "react-native";
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import Text from "./styled/Text";
import { Habit } from "../types";
import { theme } from "../theme";
import { adjustColor } from "../utils/adjustColor";

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
  const [data, setData] = useState(habits);

  const renderItem = ({ item, drag, isActive }: RenderItemParams<Habit>) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity
          onPressIn={drag}
          disabled={isActive}
          style={{
            backgroundColor: adjustColor(item.color, -100),
            width: "100%",
            padding: theme.spacing.m,
          }}
        >
          <Text style={{ fontSize: 16 }}>{item.title}</Text>
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  return (
    <DraggableFlatList
      containerStyle={{ width: "100%" }}
      data={data}
      onDragEnd={({ data }) => {
        console.log(data);
        setData(data);
      }}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
    />
  );
}

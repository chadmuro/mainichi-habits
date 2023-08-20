import BottomSheet from "@gorhom/bottom-sheet";
import { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "../../contexts/themeContext";
import SmallButton from "../styled/SmallButton";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import Text from "../../components/styled/Text";

interface Props {
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
  handleClosePress: () => void;
  handleSheetChanges: (index: number) => void;
}
export function ImportExportInfo({
  bottomSheetRef,
  handleClosePress,
  handleSheetChanges,
}: Props) {
  const { theme } = useTheme();

  const snapPoints = useMemo(() => [400], []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      onChange={handleSheetChanges}
      containerStyle={{ zIndex: 100 }}
      handleIndicatorStyle={{ backgroundColor: theme.colors.text }}
      backgroundStyle={{
        backgroundColor: theme.colors.background,
      }}
      style={{
        paddingVertical: theme.spacing.s,
        paddingHorizontal: theme.spacing.m,
      }}
    >
      <View>
        <Text style={styles.header}>Got a new phone? No Worries 👌</Text>
        <Text>
          You can export your data from one phone and import it into another.
        </Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.header}>Export your data:</Text>
        <Text>
          Select the Export Data button and save the db.db file to your phone or
          send to your new device
        </Text>
        <Text>
          * If you export your data, all of your reminders will be cleared from
          this device
        </Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.header}>Import your data:</Text>
        <Text>
          Select the Import Data button select the db.db file sent from your
          previous device
        </Text>
        <Text>
          * Be sure to import the correct file, or the app may not function
          properly
        </Text>
        <Text>
          * When importing data, your current data will be overwritten. This
          data cannot be recovered. You will also need to add reminders to your
          new device
        </Text>
      </View>
      <View style={styles.container}>
        <SmallButton
          color={theme.colors.primary}
          onPress={() => handleClosePress()}
        >
          Got it!
        </SmallButton>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
  },
  header: {
    fontSize: 16,
    fontWeight: "700",
  },
});

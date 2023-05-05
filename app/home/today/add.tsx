import { View } from "react-native";
import TextInput from "../../../components/styled/TextInput";
import TextLabel from "../../../components/styled/TextLabel";
import TabLayout from "../../../components/TabLayout";

export default function Add() {
  return (
    <TabLayout>
      <View style={{ width: "90%", alignItems: "center", marginBottom: 16 }}>
        <TextLabel title="New habit" />
        <TextInput placeholder="New habit" />
      </View>
      <View style={{ width: "90%", alignItems: "center", marginBottom: 16 }}>
        <TextLabel title="Start date" />
        <TextInput placeholder="Start date" />
      </View>
      <View style={{ width: "90%", alignItems: "center" }}>
        <TextLabel title="Color" />
        <TextInput placeholder="Color" />
      </View>
    </TabLayout>
  );
}

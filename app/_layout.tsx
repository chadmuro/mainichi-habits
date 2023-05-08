import { Slot } from "expo-router";
import { DatabaseProvider } from "../contexts/databaseContext";

export default function Layout() {
  return (
    <DatabaseProvider>
      <Slot />
    </DatabaseProvider>
  );
}

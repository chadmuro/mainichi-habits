import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

export function useFileSystem() {
  async function exportData() {
    try {
      const dbInfo = await FileSystem.getInfoAsync(
        FileSystem.documentDirectory + "SQLite/" + "db.db"
      );
      console.log(dbInfo);
      if (dbInfo.exists) {
        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(dbInfo.uri);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function importData() {}

  return { exportData };
}

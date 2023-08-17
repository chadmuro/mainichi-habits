import { DevSettings } from "react-native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as DocumentPicker from "expo-document-picker";

export function useFileSystem() {
  async function exportData() {
    // save db file to phone
    try {
      const dbInfo = await FileSystem.getInfoAsync(
        FileSystem.documentDirectory + "SQLite/" + "db.db"
      );
      if (dbInfo.exists) {
        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(dbInfo.uri);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function importData() {
    // import db file from phone to app
    const file = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
      type: "application/octet-stream",
    });

    if (!file || !file.assets) return;
    let filePath = file.assets[0].uri;

    const dbFileInfo = await FileSystem.getInfoAsync(filePath);

    if (
      !(await FileSystem.getInfoAsync(FileSystem.documentDirectory + "SQLite"))
        .exists
    ) {
      await FileSystem.makeDirectoryAsync(
        FileSystem.documentDirectory + "SQLite"
      );
    }
    await FileSystem.copyAsync({
      from: dbFileInfo.uri,
      to: FileSystem.documentDirectory + "SQLite/db.db",
    });
    DevSettings.reload();
  }

  return { exportData, importData };
}
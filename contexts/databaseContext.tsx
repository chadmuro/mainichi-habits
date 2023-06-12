import { createContext, PropsWithChildren, useContext, useEffect } from "react";
import { Platform } from "react-native";
import * as SQLite from "expo-sqlite";

type DatabaseContextType = {
  db:
    | SQLite.WebSQLDatabase
    | {
        transaction: () => {
          executeSql: () => void;
        };
      };
};

const DatabaseContext = createContext<DatabaseContextType | undefined>(
  undefined
);

const DatabaseProvider = ({ children }: PropsWithChildren<{}>) => {
  function openDatabase() {
    if (Platform.OS === "web") {
      return {
        transaction: () => {
          return {
            executeSql: () => {},
          };
        },
      };
    }

    const db = SQLite.openDatabase("db.db");
    return db;
  }

  console.log("create db");
  const db = openDatabase();

  useEffect(() => {
    console.log("set up db");
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists habits (id string primary key not null, title text, days_per_week int, color text, start_date text, seq integer);"
      );
      tx.executeSql(
        "create table if not exists checks (id string primary key not null, habit_id string, date text);"
      );
      tx.executeSql(
        "create table if not exists settings (id string primary key not null, theme string default 'auto' not null);"
      );
      tx.executeSql("insert or ignore into settings (id) values('1')");
      // tx.executeSql("drop table notifications");
      tx.executeSql(
        "create table if not exists notifications (id string primary key not null, habit_id string, days integer, hour integer, minute integer);"
      );
    });
  }, []);

  const value = { db };

  return (
    <DatabaseContext.Provider value={value}>
      {children}
    </DatabaseContext.Provider>
  );
};

const useDatabase = () => {
  const context = useContext(DatabaseContext);
  if (context === undefined) {
    throw new Error("useDatabase must be used within a DatabaseProvider");
  }
  return context;
};

export { DatabaseProvider, useDatabase };

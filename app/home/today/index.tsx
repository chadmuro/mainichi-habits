import { useEffect } from "react";
import Text from "../../../components/styled/Text";
import TabLayout from "../../../components/TabLayout";
import { useDatabase } from "../../../contexts/databaseContext";

export default function Today() {
  const { db } = useDatabase();

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM habits;`, [], (_, { rows: { _array } }) =>
        console.log(_array)
      );
    });
  }, []);

  return (
    <TabLayout>
      <Text>Today Screen</Text>
    </TabLayout>
  );
}

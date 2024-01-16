import { Button, StyleSheet, Text, View } from "react-native";
import NavBar from "../components/NavBar";
import { useContext, useState } from "react";
import { ThemeColor } from "../context/ThemeColor";
import PeopleFilters from "../components/people/PeopleFilter";
import PeoplePopularList from "../components/people/PeoplePopularList";
import PeopleSearchList from "../components/people/PeopleSearchList";

export default function PeopleScreen({ navigation }) {
  const colors = useContext(ThemeColor);
  const styles = {
    container: {
      flex: 1,
      backgroundColor: colors.blue,
    },
    subContainerNavBar: {},
    subContainerFilter: {},
    listContainer: {
      flex: 1,
      marginTop: 10,
    },
  };
  const [peopleName, setPeopleName] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.subContainerNavBar}>
        <NavBar />
      </View>
      <View style={styles.subContainerFilter}>
        <PeopleFilters setPeopleName={setPeopleName} peopleName={peopleName} />
      </View>

      {peopleName != "" ? (
        <View style={styles.listContainer}>
          <PeopleSearchList peopleName={peopleName} />
        </View>
      ) : (
        <View style={styles.listContainer}>
          <PeoplePopularList/>
        </View>
      )}
    </View>
  );
}

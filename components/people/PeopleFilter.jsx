import { View, Text, StyleSheet } from "react-native";
import React from "react";
import PeopleNameFilterInput from "./PeopleNameFilterInput";

export default function PeopleFilters({ setPeopleName, peopleName }) {
    return (
        <>
            <View style={styles.container}>
                {/* <CategoryDropdownFilter /> */}
                <PeopleNameFilterInput
                    setPeopleName={setPeopleName}
                    peopleName={peopleName}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
});

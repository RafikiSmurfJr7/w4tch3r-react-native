import { Button, StyleSheet, Text, View } from "react-native";
import NavBar from "../components/NavBar";
import { useContext, useState } from "react";
import { ThemeColor } from "../context/ThemeColor";
import Filters from "../components/Filters";
import SeriePopularList from "../components/series/SeriePopularList";
import SerieTopRatedList from "../components/series/SerieTopRatedList";
import SerieSearchList from "../components/series/SerieSearchList";
import SwitchSelector from "react-native-switch-selector";

export default function SerieScreen({ navigation }) {
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
        switchContainer: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
            margin: 18,
        },
        switchLabel: {
            color: colors.white,
            marginRight: 10,
        },
    };

    const [serieName, setSerieName] = useState("");
    const [showTopRated, setShowTopRated] = useState(true);

    return (
        <View style={styles.container}>
            <View style={styles.subContainerNavBar}>
                <NavBar />
            </View>
            <View style={styles.subContainerFilter}>
                <Filters setSerieName={setSerieName} serieName={serieName} />
            </View>
            <View style={styles.switchContainer}>
                <SwitchSelector
                    initial={0}
                    textColor={"#000000"}
                    selectedColor={"#fff"}
                    buttonColor={colors.blue}
                    borderColor={"#ffffff"}
                    valuePadding={2}
                    hasPadding
                    onPress={(value) => setShowTopRated(!showTopRated)}
                    options={[
                        { label: "Top Rated", value: false },
                        { label: "Popular", value: false },
                    ]}
                />
            </View>
            <View style={styles.listContainer}>
                {serieName != "" ? (
                    <SerieSearchList serieName={serieName} />
                ) : showTopRated ? (
                    <SerieTopRatedList />
                ) : (
                    <SeriePopularList />
                )}
            </View>
        </View>
    );
}

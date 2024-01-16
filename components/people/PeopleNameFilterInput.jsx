import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useContext, useState } from "react";
import { Icon, Input, color } from "@rneui/base";
import { ThemeColor } from "../../context/ThemeColor";

export default function PeopleNameFilterInput({ setPeopleName, peopleName }) {
    const colors = useContext(ThemeColor);

    const [text, setText] = useState("");

    const styles = {
        input: {
            width: 350,
            height: 35,
            backgroundColor: colors.white,
            marginHorizontal: 25,
            borderRadius: 8,
            paddingHorizontal: 10,
        },
        searchIcon: {
            position: "absolute",
            right: 35,
            top: 6,
        },
    };

    return (
        <View>
            <TextInput
                style={styles.input}
                placeholder="Person name..."
                onChangeText={setText}
                value={text}
                inputMode="search"
                onSubmitEditing={() => setPeopleName(text)}
            />
            <View style={styles.searchIcon}>
                <Icon
                    name="search"
                    type="font-awesome"
                    color={colors.greyDark}
                    size={20}
                />
            </View>
        </View>
    );
}

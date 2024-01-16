import { View, TextInput } from "react-native";
import React, { useContext, useState } from "react";
import { Icon } from "@rneui/base";
import { ThemeColor } from "../../context/ThemeColor";

export default function MovieNameFilterInput({ setMovieName, movieName }) {
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

    const handleSearch = () => {
        setMovieName(text);
        setText('');
    };

    return (
        <View>
            <TextInput
                style={styles.input}
                placeholder="Movie name..."
                onChangeText={setText}
                value={text}
                inputMode="search"
                onSubmitEditing={handleSearch}
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

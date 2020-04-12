import React from "react";
import {StyleSheet, Text, TextStyle} from "react-native";

interface Styles {
    extraText: TextStyle,
}

const styles = StyleSheet.create<Styles>({
    extraText: {
        marginTop: 24,
        textAlign: 'center',
        fontSize: 14,
        color: '#000',
        width: '80%',
        alignSelf: 'center',
    }
});

export const ExtraText: React.FC = ({ children }): JSX.Element =>
    <Text style={styles.extraText}>
        {children}
    </Text>;
import React from "react";
import {Text, StyleSheet, TextStyle} from "react-native";

interface Styles {
    infoText: TextStyle,
}

const styles = StyleSheet.create<Styles>({
    infoText: {
        lineHeight: 24,
        margin: 16,
        backgroundColor: '#fff',
        borderRadius: 4,
        padding: 16,
        textAlign: 'center',
        fontSize: 14,
        color: '#000',
        alignSelf: 'stretch',
        fontWeight: "500",
    }
});

export const InfoText: React.FC = ({ children}): JSX.Element => children
    ? <Text style={styles.infoText}>{ children }</Text>
    : null;
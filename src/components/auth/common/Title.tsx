import I18n from "../../../i18n";
import {StyleSheet, Text, TextStyle} from "react-native";
import React from "react";

interface Styles {
    title: TextStyle,
}

const styles = StyleSheet.create<Styles>({
    title: {
        marginBottom: 50,
        textAlign: 'center',
        fontSize: 36,
        color: '#007aff',
    }
});

export const Title: React.FC = (): JSX.Element =>
    <Text style={styles.title}>
        {I18n.t('title')}
    </Text>;
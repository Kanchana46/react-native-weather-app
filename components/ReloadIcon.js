import { View, Platform, StyleSheet } from 'react-native'
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

const ReloadIcon = ({ load }) => {
    const refreshIconName = Platform.OS === "ios" ? "ios-refresh" : "md-refresh";
    return (
        <View style={styles.reloadIcon}>
            <Ionicons onPress={load} name={refreshIconName} size={24} color="black" />
        </View>
    )
}

export default ReloadIcon;

const styles = StyleSheet.create({
    reloadIcon: {
        position: 'absolute',
        top: 116,
        right: 150
    }
});
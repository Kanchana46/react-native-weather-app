import React from 'react';
import { StyleSheet, Platform, View } from 'react-native';

import { Picker } from '@react-native-picker/picker';

const UnitsPicker = ({ units, setUnits }) => {
    return (
        <View style={styles.unitsSystem}>
            <Picker
                selectedValue={units}
                onValueChange={(item) => setUnits(item)}
                mode="dropdown"
                itemStyle={{ fontSize: 12 }}
            >
                <Picker.Item label="°C" value="metric" />
                <Picker.Item label="°F" value="imperial" />
            </Picker>
        </View>
    )
}

export default UnitsPicker;

const styles = StyleSheet.create({
    unitsSystem: {
        ...Platform.select({
            ios: {
                top: -20
            },
            android: {
                top: 100,
            }
        }),
        position: 'absolute',
        left: 100,
        height: 50,
        width: 100
    }
});
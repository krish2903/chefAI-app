import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import SettingsIcon from '../Icons/SettingsIcon';

const TopBar = () => {
    const [searchClicked, setSearchClicked] = useState(false);

    const toggleView = () => {
        setSearchClicked(!searchClicked);
    };

    return (
        <View style={styles.barContainer}>
            <View style={styles.headingContainer}>
                <Text style={styles.heading}>Intelli<Text style={styles.bold}>Chef</Text></Text>
            </View>
            <View style={styles.iconContainer}>
                <TouchableOpacity>
                    <SettingsIcon />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    barContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 15,
        paddingHorizontal: 5,
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
    },
    headingContainer: {
        fontFamily: 'Roboto',
        fontSize: 24,
        color: '#cccdd0',
        letterSpacing: 1,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    heading: {
        fontFamily: 'Roboto',
        fontSize: 24,
        color: '#cccdd0',
        letterSpacing: 1,
    },
    bold: {
        fontFamily: 'Roboto',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#41a36b',
    },
    chefIcon: {
        width: 20,
        height: 20,
    },
});

export default TopBar;

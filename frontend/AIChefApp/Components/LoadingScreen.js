import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const LoadingScreen = () => {
    const scaleValue = new Animated.Value(1);
    const opacityValue = new Animated.Value(1);

    useEffect(() => {
        const timeout = setTimeout(() => {
            Animated.timing(scaleValue, {
                toValue: 1000,
                duration: 1000,
                useNativeDriver: true,
            }).start();
            Animated.timing(opacityValue, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
            }).start();
        }, 3000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <Animated.View style={styles.container}>
            <StatusBar style="light" />
            <Animated.Image
                source={require('../Icons/intelliChefLogoNoBg.png')}
                style={[styles.logo, { transform: [{ scale: scaleValue }] }, {opacity: opacityValue}]}
            />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    logo: {
        width: 50,
        height: 50,
    },
});

export default LoadingScreen;

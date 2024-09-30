import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, FlatList, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const ProfileScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image resizeMode='cover' style={styles.coverImg} />
            <Image resizeMode='cover' style={styles.userIcon} source={require('../Icons/intelliChefLogo.png')} />
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
            >
                <View style={styles.stepsContainer}>
                    <Image
                        source={require('../assets/step1.png')}
                        style={styles.stepsImage}
                    />
                    <View>
                        <Text style={styles.stepsTitle}>
                            Welcome (Step 1)
                        </Text>
                        <Text style={styles.stepsText}>
                            This is the first step of creating your account.
                        </Text>
                    </View>
                </View>
                <View style={styles.stepsContainer}>
                    <Image
                        source={require('../assets/step2.png')}
                        style={styles.stepsImage}
                    />
                    <View>
                        <Text style={styles.stepsTitle}>
                            Account Information (Step 2)
                        </Text>
                        <Text style={styles.stepsText}>
                            This is the second step of creating your account.
                        </Text>
                    </View>
                </View>
                <View style={styles.stepsContainer}>
                    <Image
                        source={require('../assets/step3.png')}
                        style={styles.stepsImage}
                    />
                    <View>
                        <Text style={styles.stepsTitle}>
                            Personal Information (Step 3)
                        </Text>
                        <Text style={styles.stepsText}>
                            This is the third step of creating your account.
                        </Text>
                    </View>
                </View>
                <View style={styles.stepsContainer}>
                    <Image
                        source={require('../assets/step4.png')}
                        style={styles.stepsImage}
                    />
                    <View>
                        <Text style={styles.stepsTitle}>
                            Complete (Step 4)
                        </Text>
                        <Text style={styles.stepsText}>
                            This is the final step of creating your account.
                        </Text>
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity style={styles.signUpButton} onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.signUpButtonText}>Get Started</Text>
            </TouchableOpacity>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#1E2124',
        alignItems: 'center',
    },
    coverImg: {
        width: '100%',
        height: '25%',
        backgroundColor: 'rgba(0, 0, 0,0.35)',
    },
    userIcon: {
        position: 'absolute',
        top: '25%',
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 8,
        borderColor: '#2c2d35',
        transform: 'translateY(-60px)',
    },
    stepsContainer: {
        width: width,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 90,
        marginBottom: 30,
        gap: 30,

    },
    stepsImage: {
        width: 150,
        height: 150,
    },
    stepsTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: 5,
    },
    stepsText: {
        fontSize: 12,
        color: '#cccdd0',
        textAlign: 'center',
    },
    signUpButton: {
        width: '80vw',
        backgroundColor: '#41a36b',
        padding: 15,
        borderRadius: 5,
        marginBottom: 30,
    },
    signUpButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default ProfileScreen;

import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../Utils/Colors';

export default function LoadingOverlay({ visible }) {
    if (!visible) return null;
    
    return (
        <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color={Colors.PRIMARY} />
            <Text style={styles.loadingText}>Precessing...</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    loadingText: {
        marginTop: 10,
        color: Colors.PRIMARY,
        fontSize: 16,
    },
})

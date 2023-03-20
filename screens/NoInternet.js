/* eslint-disable prettier/prettier */
import React from "react";
import { Animated, StatusBar,StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 40,
        backgroundColor: 'red',
        padding: 5,
        paddingLeft: 0,
        position: 'absolute',
        top: 0,
        zIndex: 100
    },
    text: {
        fontSize: 17,
        color: '#fff',
        textAlign:'center'
    }
})


const NoInternet = () => {
    return (
        <Animated.View style={[styles.container]}>
            <StatusBar
                backgroundColor='red'
            />
            <Text style={styles.text}>
                No Internet Connection
            </Text>
        </Animated.View>
    )
}

export default NoInternet
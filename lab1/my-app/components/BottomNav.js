import React from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';

export default function BottomNav({ navigation }) {
    return (
        <View style={styles.nav}>
            <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Home')}>
                <Image source={require('../assets/home.png')} style={styles.icon} />
                <Text>Головна</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Gallery')}>
                <Image source={require('../assets/gallery.png')} style={styles.icon} />
                <Text>Фотогалерея</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Profile')}>
                <Image source={require('../assets/profile.png')} style={styles.icon} />
                <Text>Профіль</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    nav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        backgroundColor: '#ddd',
    },
    item: {
        alignItems: 'center',
    },
    icon: {
        width: 30,
        height: 30,
        marginBottom: 5,
        resizeMode: 'contain',
    },
});
import { View, Text, Image, StyleSheet } from 'react-native';

export default function Header() {
    return (
        <View style={styles.header}>
            <Image
                source={require('../assets/home.png')}
                style={styles.logo}
                resizeMode="contain"
            />
            <Text style={styles.title}>FirstMobileApp</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#4A90D9',
        paddingTop: 50,
        paddingBottom: 12,
        paddingHorizontal: 16,
    },
    logo: {
        width: 40,
        height: 40,
    },
    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 12,
    },
});
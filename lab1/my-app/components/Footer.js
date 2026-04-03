import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Footer() {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.footer, { paddingBottom: insets.bottom + 8 }]}>
            <Text style={styles.text}>Алієв Омар Емінович, ІПЗ-22-1</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    footer: {
        backgroundColor: '#4A90D9',
        paddingVertical: 10,
        alignItems: 'center',
    },
    text: {
        color: '#fff',
        fontSize: 13,
    },
});
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const NEWS = [
    {
        id: '1',
        title: 'Перша новина',
        date: '06.03.2026',
        text: 'Опис новини',
        image: null,
    },
    {
        id: '2',
        title: 'Друга новина',
        date: '05.03.2026',
        text: 'Опис новини',
        image: null,
    },
    {
        id: '3',
        title: 'Третя новина',
        date: '04.03.2026',
        text: 'Опис новини',
        image: null,
    },
    {
        id: '4',
        title: 'Четверта новина',
        date: '03.03.2026',
        text: 'Опис новини',
        image: null,
    },
    {
        id: '5',
        title: "П'ята новина",
        date: '02.03.2026',
        text: 'Опис новини',
        image: null,
    },
];

function NewsCard({ item }) {
    return (
        <View style={styles.card}>

            {item.image ? (
                <Image
                    source={{ uri: item.image }}
                    style={styles.cardImage}
                    resizeMode="cover"
                />
            ) : (
                <View style={styles.cardImagePlaceholder}>
                    <Ionicons name="newspaper-outline" size={36} color="#4A90D9" />
                </View>
            )}

            <View style={styles.cardContent}>
                <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.cardDate}>{item.date}</Text>
                <Text style={styles.cardText} numberOfLines={3}>{item.text}</Text>
            </View>

        </View>
    );
}

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Новини</Text>
            <ScrollView contentContainerStyle={styles.list}>
                {NEWS.map(item => (
                    <NewsCard key={item.id} item={item} />
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    heading: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 8,
    },
    list: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 12,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    cardImage: {
        width: 90,
        height: 90,
    },
    cardImagePlaceholder: {
        width: 90,
        height: 90,
        backgroundColor: '#EAF2FB',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardContent: {
        flex: 1,
        padding: 10,
        justifyContent: 'space-between',
    },
    cardTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#222',
    },
    cardDate: {
        fontSize: 12,
        color: '#999',
        marginTop: 2,
    },
    cardText: {
        fontSize: 13,
        color: '#555',
        marginTop: 4,
        lineHeight: 18,
    },
});
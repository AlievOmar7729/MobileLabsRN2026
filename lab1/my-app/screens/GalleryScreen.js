import { View, Text, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const COLUMN_GAP = 12;
const PADDING = 16;
const TILE_SIZE = (width - PADDING * 2 - COLUMN_GAP) / 2;

const PHOTOS = [
    { id: '1', uri: 'https://picsum.photos/seed/1/400/400', title: 'Природа' },
    { id: '2', uri: 'https://picsum.photos/seed/2/400/400', title: 'Місто' },
    { id: '3', uri: 'https://picsum.photos/seed/3/400/400', title: 'Архітектура' },
    { id: '4', uri: 'https://picsum.photos/seed/4/400/400', title: 'Люди' },
    { id: '5', uri: 'https://picsum.photos/seed/5/400/400', title: 'Тварини' },
    { id: '6', uri: 'https://picsum.photos/seed/6/400/400', title: 'Захід сонця' },
    { id: '7', uri: 'https://picsum.photos/seed/7/400/400', title: 'Гори' },
    { id: '8', uri: 'https://picsum.photos/seed/8/400/400', title: 'Море' },
    { id: '9', uri: 'https://picsum.photos/seed/9/400/400', title: 'Ліс' },
    { id: '10', uri: 'https://picsum.photos/seed/10/400/400', title: 'Квіти' },
];

function PhotoTile({ item }) {
    return (
        <View style={styles.tile}>
            <Image
                source={{ uri: item.uri }}
                style={styles.image}
                resizeMode="cover"
            />
            <Text style={styles.tileTitle} numberOfLines={1}>{item.title}</Text>
        </View>
    );
}

export default function GalleryScreen() {
    const rows = [];
    for (let i = 0; i < PHOTOS.length; i += 2) {
        rows.push(PHOTOS.slice(i, i + 2));
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Фотогалерея</Text>
            <ScrollView contentContainerStyle={styles.list}>
                {rows.map((row, rowIndex) => (
                    <View key={rowIndex} style={styles.row}>
                        {row.map(item => (
                            <PhotoTile key={item.id} item={item} />
                        ))}
                    </View>
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
        paddingHorizontal: PADDING,
        paddingTop: 16,
        paddingBottom: 8,
    },
    list: {
        paddingHorizontal: PADDING,
        paddingBottom: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: COLUMN_GAP,
    },
    tile: {
        width: TILE_SIZE,
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    image: {
        width: TILE_SIZE,
        height: TILE_SIZE,
    },
    tileTitle: {
        fontSize: 13,
        color: '#333',
        padding: 8,
        textAlign: 'center',
    },
});
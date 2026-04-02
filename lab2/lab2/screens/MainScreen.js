import { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { mockData } from '../data/mockData';

const REFRESH_DELAY = 1200;
const LOAD_MORE_DELAY = 1000;
const PAGE_SIZE = 5;

function createNewsBatch(startIndex, count = PAGE_SIZE) {
  return Array.from({ length: count }, (_, index) => {
    const itemNumber = startIndex + index;

    return {
      id: String(itemNumber),
      title: `Breaking News #${itemNumber}`,
      description: `Story ${itemNumber} covers a major local event with fresh updates, background details, and reactions from the community.`,
      image: `https://picsum.photos/seed/news-${itemNumber}/900/600`,
    };
  });
}

export function MainScreen({ navigation }) {
  const [news, setNews] = useState(mockData);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setNews(mockData);
      setRefreshing(false);
    }, REFRESH_DELAY);
  };

  const onEndReached = () => {
    if (loadingMore) {
      return;
    }

    setLoadingMore(true);

    setTimeout(() => {
      setNews((currentNews) => [
        ...currentNews,
        ...createNewsBatch(currentNews.length + 1),
      ]);
      setLoadingMore(false);
    }, LOAD_MORE_DELAY);
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.screenTitle}>Top Headlines</Text>
      <Text style={styles.screenSubtitle}>
        Swipe down to refresh or scroll to load more news.
      </Text>
    </View>
  );

  const renderFooter = () => (
    <View style={styles.footer}>
      {loadingMore ? (
        <ActivityIndicator size="small" color="#0b6e4f" />
      ) : (
        <Text style={styles.footerText}>You are up to date for now.</Text>
      )}
    </View>
  );

  const renderSeparator = () => <View style={styles.separator} />;

  const renderItem = ({ item }) => (
    <Pressable
      style={styles.card}
      onPress={() => navigation.navigate('DetailsScreen', { article: item })}
    >
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={news}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.4}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        ItemSeparatorComponent={renderSeparator}
        initialNumToRender={4}
        maxToRenderPerBatch={4}
        windowSize={7}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f7f1',
  },
  listContent: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 16,
  },
  screenTitle: {
    fontSize: 30,
    fontWeight: '700',
    color: '#16302b',
    marginBottom: 6,
  },
  screenSubtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: '#4d635d',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 190,
    backgroundColor: '#d9e4dd',
  },
  cardBody: {
    padding: 14,
    gap: 8,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#16302b',
  },
  cardDescription: {
    fontSize: 15,
    lineHeight: 22,
    color: '#41534f',
  },
  separator: {
    height: 14,
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 18,
    paddingBottom: 8,
    minHeight: 56,
  },
  footerText: {
    fontSize: 14,
    color: '#5c706a',
  },
});

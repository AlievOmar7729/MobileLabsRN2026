import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

export function DetailsScreen({ route }) {
  const { article } = route.params;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Image source={{ uri: article.image }} style={styles.image} />
      <View style={styles.card}>
        <Text style={styles.title}>{article.title}</Text>
        <Text style={styles.meta}>Article ID: {article.id}</Text>
        <Text style={styles.description}>{article.description}</Text>
        <Text style={styles.body}>
          This details screen receives the selected article through navigation
          params and displays a full preview of the content.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f7f1',
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  image: {
    width: '100%',
    height: 240,
    borderRadius: 20,
    marginBottom: 16,
    backgroundColor: '#d9e4dd',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 18,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 34,
    color: '#16302b',
    marginBottom: 10,
  },
  meta: {
    fontSize: 13,
    color: '#5c706a',
    marginBottom: 14,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#41534f',
    marginBottom: 14,
  },
  body: {
    fontSize: 15,
    lineHeight: 24,
    color: '#4d635d',
  },
});

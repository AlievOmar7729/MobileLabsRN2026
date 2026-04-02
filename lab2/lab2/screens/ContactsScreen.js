import {
  SafeAreaView,
  SectionList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { contactSections } from '../data/contactsData';

export function ContactsScreen() {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.phone}>{item.phone}</Text>
    </View>
  );

  const renderSectionHeader = ({ section }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
    </View>
  );

  const renderSeparator = () => <View style={styles.separator} />;

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={contactSections}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        ItemSeparatorComponent={renderSeparator}
        contentContainerStyle={styles.content}
        stickySectionHeadersEnabled
      />
    </SafeAreaView>
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
  sectionHeader: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginTop: 8,
    marginBottom: 10,
    backgroundColor: '#dcebe3',
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#16302b',
  },
  item: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 14,
  },
  name: {
    fontSize: 17,
    fontWeight: '600',
    color: '#16302b',
    marginBottom: 4,
  },
  phone: {
    fontSize: 14,
    color: '#4d635d',
  },
  separator: {
    height: 10,
  },
});

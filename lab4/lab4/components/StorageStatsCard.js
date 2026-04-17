import { Text, View } from 'react-native';

export default function StorageStatsCard({ storageStats, styles }) {
  return (
    <View style={styles.storageCard}>
      <Text style={styles.sectionTitle}>
        {'Статистика пам’яті пристрою'}
      </Text>
      <View style={styles.storageRow}>
        <Text style={styles.storageLabel}>
          {'Загальний обсяг'}
        </Text>
        <Text style={styles.storageValue}>{storageStats.total}</Text>
      </View>
      <View style={styles.storageRow}>
        <Text style={styles.storageLabel}>
          {'Вільний простір'}
        </Text>
        <Text style={styles.storageValue}>{storageStats.available}</Text>
      </View>
      <View style={styles.storageRow}>
        <Text style={styles.storageLabel}>
          {'Зайнятий простір'}
        </Text>
        <Text style={styles.storageValue}>{storageStats.used}</Text>
      </View>
    </View>
  );
}

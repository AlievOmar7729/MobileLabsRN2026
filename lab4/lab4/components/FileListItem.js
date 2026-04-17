import { Pressable, Text, View } from 'react-native';

export default function FileListItem({
  item,
  onOpenItem,
  onShowFileInfo,
  onDeleteItem,
  styles,
}) {
  return (
    <View style={styles.itemCard}>
      <Pressable
        onPress={() => onOpenItem(item)}
        style={({ pressed }) => [
          styles.itemMainArea,
          pressed ? styles.itemCardPressed : null,
        ]}
      >
        <View style={styles.itemTextWrap}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemMeta}>
            {item.isDirectory ? 'Папка' : 'Файл'}
          </Text>
        </View>
        {item.isDirectory ? <Text style={styles.itemArrow}>{'>'}</Text> : null}
      </Pressable>
      <View style={styles.itemActions}>
        {!item.isDirectory ? (
          <Pressable
            onPress={() => onShowFileInfo(item)}
            style={({ pressed }) => [
              styles.infoButton,
              pressed ? styles.actionButtonPressed : null,
            ]}
          >
            <Text style={styles.infoButtonText}>{'Деталі'}</Text>
          </Pressable>
        ) : null}
        <Pressable
          onPress={() => onDeleteItem(item)}
          style={({ pressed }) => [
            styles.deleteButton,
            pressed ? styles.actionButtonPressed : null,
          ]}
        >
          <Text style={styles.deleteButtonText}>{'Видалити'}</Text>
        </Pressable>
      </View>
    </View>
  );
}

import { Pressable, Text, TextInput, View } from 'react-native';

export default function CreateFolderSection({
  folderName,
  onChangeFolderName,
  onCreateFolder,
  styles,
}) {
  return (
    <View style={styles.formSection}>
      <Text style={styles.sectionTitle}>
        {'Створення папки'}
      </Text>
      <TextInput
        value={folderName}
        onChangeText={onChangeFolderName}
        placeholder={'Назва нової папки'}
        style={styles.input}
        placeholderTextColor="#94a3b8"
      />
      <Pressable
        onPress={onCreateFolder}
        style={({ pressed }) => [styles.actionButton, pressed ? styles.actionButtonPressed : null]}
      >
        <Text style={styles.actionButtonText}>
          {'Створити папку'}
        </Text>
      </Pressable>
    </View>
  );
}

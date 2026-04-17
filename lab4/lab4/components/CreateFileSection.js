import { Pressable, Text, TextInput, View } from 'react-native';

export default function CreateFileSection({
  fileName,
  fileContent,
  onChangeFileName,
  onChangeFileContent,
  onCreateFile,
  styles,
}) {
  return (
    <View style={styles.formSection}>
      <Text style={styles.sectionTitle}>
        {'Створення TXT файлу'}
      </Text>
      <TextInput
        value={fileName}
        onChangeText={onChangeFileName}
        placeholder={'Ім’я файлу'}
        style={styles.input}
        placeholderTextColor="#94a3b8"
        autoCapitalize="none"
      />
      <TextInput
        value={fileContent}
        onChangeText={onChangeFileContent}
        placeholder={'Початковий вміст'}
        style={[styles.input, styles.textArea]}
        placeholderTextColor="#94a3b8"
        multiline
        textAlignVertical="top"
      />
      <Pressable
        onPress={onCreateFile}
        style={({ pressed }) => [
          styles.actionButton,
          styles.fileButton,
          pressed ? styles.actionButtonPressed : null,
        ]}
      >
        <Text style={styles.actionButtonText}>
          {'Створити .txt файл'}
        </Text>
      </Pressable>
    </View>
  );
}

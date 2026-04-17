import { ActivityIndicator, Modal, Pressable, Text, TextInput, View } from 'react-native';

export default function FileViewerCard({
  readingFile,
  openedFileName,
  openedFileContent,
  editedFileContent,
  savingFile,
  onChangeEditedContent,
  onCloseViewer,
  onSaveFile,
  styles,
}) {
  const visible = readingFile || Boolean(openedFileName);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCloseViewer}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalCard}>
          {readingFile ? (
            <View style={styles.viewerLoadingWrap}>
              <ActivityIndicator size="large" color="#7c3aed" />
              <Text style={styles.stateText}>
                {'Відкриття файлу...'}
              </Text>
            </View>
          ) : openedFileName ? (
            <>
              <View style={styles.viewerHeader}>
                <View style={styles.viewerTitleWrap}>
                  <Text style={styles.viewerLabel}>
                    {'Відкритий .txt файл'}
                  </Text>
                  <Text style={styles.viewerTitle}>{openedFileName}</Text>
                </View>
                <Pressable
                  onPress={onCloseViewer}
                  style={({ pressed }) => [styles.closeButton, pressed ? styles.actionButtonPressed : null]}
                >
                  <Text style={styles.closeButtonText}>{'Закрити'}</Text>
                </Pressable>
              </View>
              <TextInput
                value={editedFileContent}
                onChangeText={onChangeEditedContent}
                style={[styles.input, styles.viewerEditor]}
                multiline
                textAlignVertical="top"
              />
              <Text style={styles.viewerHint}>
                {openedFileContent === editedFileContent
                  ? 'Змін поки немає.'
                  : 'Є незбережені зміни.'}
              </Text>
              <Pressable
                onPress={onSaveFile}
                disabled={savingFile}
                style={({ pressed }) => [
                  styles.saveButton,
                  savingFile ? styles.saveButtonDisabled : null,
                  pressed && !savingFile ? styles.actionButtonPressed : null,
                ]}
              >
                <Text style={styles.actionButtonText}>
                  {savingFile
                    ? 'Збереження...'
                    : 'Зберегти зміни'}
                </Text>
              </Pressable>
            </>
          ) : null}
        </View>
      </View>
    </Modal>
  );
}

import { Modal, Pressable, Text, View } from 'react-native';

export default function FileInfoModal({ selectedFileInfo, onClose, styles }) {
  return (
    <Modal
      visible={Boolean(selectedFileInfo)}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalCard}>
          <Text style={styles.sectionTitle}>
            {'Детальна інформація про файл'}
          </Text>
          {selectedFileInfo ? (
            <>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>{'Назва'}</Text>
                <Text style={styles.infoValue}>{selectedFileInfo.name}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>{'Тип'}</Text>
                <Text style={styles.infoValue}>{selectedFileInfo.type}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>{'Розмір'}</Text>
                <Text style={styles.infoValue}>{selectedFileInfo.size}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>{'Змінено'}</Text>
                <Text style={styles.infoValue}>{selectedFileInfo.modificationDate}</Text>
              </View>
            </>
          ) : null}
          <Pressable
            onPress={onClose}
            style={({ pressed }) => [styles.closeModalButton, pressed ? styles.actionButtonPressed : null]}
          >
            <Text style={styles.closeButtonText}>{'Закрити'}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

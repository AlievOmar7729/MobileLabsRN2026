import { Pressable, Text } from 'react-native';

export default function FileManagerHeader({
  currentUri,
  formatBreadcrumb,
  isAtRoot,
  onGoUp,
  styles,
}) {
  return (
    <>
      <Text style={styles.title}>
        {'Файловий менеджер'}
      </Text>
      <Text style={styles.pathLabel}>
        {'Поточний шлях'}
      </Text>
      <Text style={styles.pathValue}>{formatBreadcrumb(currentUri)}</Text>

      <Pressable
        onPress={onGoUp}
        disabled={isAtRoot}
        style={({ pressed }) => [
          styles.upButton,
          isAtRoot ? styles.upButtonDisabled : null,
          pressed && !isAtRoot ? styles.upButtonPressed : null,
        ]}
      >
        <Text style={styles.upButtonText}>{'Вгору'}</Text>
      </Pressable>
    </>
  );
}

import { StatusBar } from 'expo-status-bar';
import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, SafeAreaView, Text, View } from 'react-native';
import { Directory, File, Paths } from 'expo-file-system';
import CreateFileSection from './components/CreateFileSection';
import CreateFolderSection from './components/CreateFolderSection';
import FileInfoModal from './components/FileInfoModal';
import FileListItem from './components/FileListItem';
import FileManagerHeader from './components/FileManagerHeader';
import FileViewerCard from './components/FileViewerCard';
import StorageStatsCard from './components/StorageStatsCard';
import styles from './fileManagerStyles';

const ROOT_DIRECTORY = Paths.document;

function normalizeUri(uri) {
  return uri.endsWith('/') ? uri.slice(0, -1) : uri;
}

function getRelativePath(uri) {
  const normalizedRoot = normalizeUri(ROOT_DIRECTORY.uri);
  const normalizedUri = normalizeUri(uri);

  if (normalizedUri === normalizedRoot) {
    return '/';
  }

  return normalizedUri.replace(normalizedRoot, '') || '/';
}

function formatBreadcrumb(uri) {
  const relativePath = getRelativePath(uri);
  return relativePath === '/' ? 'Documents' : `Documents${relativePath}`;
}

function formatFileSize(bytes) {
  if (!bytes) {
    return '0 B';
  }

  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(2)} KB`;
  }

  if (bytes < 1000 * 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }

  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

function formatModificationDate(timestamp) {
  if (!timestamp) {
    return 'Невідомо';
  }

  const normalizedTimestamp = timestamp < 1000000000000 ? timestamp * 1000 : timestamp;
  return new Date(normalizedTimestamp).toLocaleString('uk-UA');
}

function formatFileType(extension) {
  if (!extension) {
    return 'Без розширення';
  }

  return extension.startsWith('.') ? extension.slice(1).toUpperCase() : extension.toUpperCase();
}

export default function App() {
  const [currentUri, setCurrentUri] = useState(ROOT_DIRECTORY.uri);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);
  const [folderName, setFolderName] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [openedFileUri, setOpenedFileUri] = useState('');
  const [openedFileName, setOpenedFileName] = useState('');
  const [openedFileContent, setOpenedFileContent] = useState('');
  const [editedFileContent, setEditedFileContent] = useState('');
  const [selectedFileInfo, setSelectedFileInfo] = useState(null);
  const [readingFile, setReadingFile] = useState(false);
  const [savingFile, setSavingFile] = useState(false);

  const currentDirectory = useMemo(() => new Directory(currentUri), [currentUri]);
  const isAtRoot = normalizeUri(currentUri) === normalizeUri(ROOT_DIRECTORY.uri);
  const storageStats = useMemo(() => {
    const total = Paths.totalDiskSpace || 0;
    const available = Paths.availableDiskSpace || 0;
    const used = Math.max(total - available, 0);

    return {
      total: formatFileSize(total),
      available: formatFileSize(available),
      used: formatFileSize(used),
    };
  }, [refreshKey]);

  useEffect(() => {
    let isMounted = true;

    const loadDirectory = async () => {
      setLoading(true);
      setError('');

      try {
        const listedItems = currentDirectory
          .list()
          .sort((left, right) => {
            const leftIsDirectory = left instanceof Directory;
            const rightIsDirectory = right instanceof Directory;

            if (leftIsDirectory !== rightIsDirectory) {
              return leftIsDirectory ? -1 : 1;
            }

            return left.name.localeCompare(right.name);
          })
          .map((entry) => ({
            isDirectory: entry instanceof Directory,
            name: entry.name,
            uri: entry.uri,
          }));

        if (isMounted) {
          setItems(listedItems);
        }
      } catch (loadError) {
        if (isMounted) {
          setItems([]);
          setError(loadError.message || 'Не вдалося прочитати директорію.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadDirectory();

    return () => {
      isMounted = false;
    };
  }, [currentDirectory, refreshKey]);

  const refreshDirectory = () => {
    setRefreshKey((value) => value + 1);
  };

  const clearOpenedFileState = () => {
    setOpenedFileUri('');
    setOpenedFileName('');
    setOpenedFileContent('');
    setEditedFileContent('');
  };

  const handleOpenItem = (item) => {
    if (item.isDirectory) {
      setSelectedFileInfo(null);
      clearOpenedFileState();
      setCurrentUri(item.uri);
      return;
    }

    if (!item.name.toLowerCase().endsWith('.txt')) {
      Alert.alert(
        'Не підтримується',
        'Перегляд доступний лише для .txt файлів.'
      );
      return;
    }

    const openFile = async () => {
      setReadingFile(true);

      try {
        const file = new File(item.uri);
        const content = await file.text();

        setOpenedFileUri(item.uri);
        setOpenedFileName(item.name);
        setOpenedFileContent(content);
        setEditedFileContent(content);
      } catch (readError) {
        Alert.alert(
          'Не вдалося',
          readError.message || 'Не вдалося прочитати файл.'
        );
      } finally {
        setReadingFile(false);
      }
    };

    openFile();
  };

  const handleShowFileInfo = (item) => {
    try {
      const file = new File(item.uri);
      setSelectedFileInfo({
        uri: item.uri,
        name: file.name,
        type: formatFileType(file.extension),
        size: formatFileSize(file.size),
        modificationDate: formatModificationDate(file.modificationTime),
      });
    } catch (infoError) {
      Alert.alert(
        'Не вдалося',
        infoError.message || 'Не вдалося отримати інформацію про файл.'
      );
    }
  };

  const handleGoUp = () => {
    if (isAtRoot) {
      return;
    }

    setSelectedFileInfo(null);
    clearOpenedFileState();
    setCurrentUri(currentDirectory.parentDirectory.uri);
  };

  const handleCreateFolder = () => {
    const trimmedName = folderName.trim();

    if (!trimmedName) {
      Alert.alert(
        'Помилка',
        'Введіть назву папки.'
      );
      return;
    }

    try {
      const newDirectory = new Directory(currentDirectory, trimmedName);
      newDirectory.create();
      setFolderName('');
      refreshDirectory();
    } catch (creationError) {
      Alert.alert(
        'Не вдалося',
        creationError.message || 'Не вдалося створити папку.'
      );
    }
  };

  const handleCreateFile = () => {
    const trimmedName = fileName.trim();

    if (!trimmedName) {
      Alert.alert(
        'Помилка',
        'Введіть ім’я файлу.'
      );
      return;
    }

    const normalizedName = trimmedName.endsWith('.txt') ? trimmedName : `${trimmedName}.txt`;

    try {
      const newFile = new File(currentDirectory, normalizedName);
      newFile.create();
      newFile.write(fileContent);
      setFileName('');
      setFileContent('');
      refreshDirectory();
    } catch (creationError) {
      Alert.alert(
        'Не вдалося',
        creationError.message || 'Не вдалося створити файл.'
      );
    }
  };

  const handleCloseViewer = () => {
    setSelectedFileInfo(null);
    clearOpenedFileState();
  };

  const handleCloseFileInfo = () => {
    setSelectedFileInfo(null);
  };

  const handleSaveFile = async () => {
    if (!openedFileUri) {
      return;
    }

    setSavingFile(true);

    try {
      const file = new File(openedFileUri);
      file.write(editedFileContent);
      setOpenedFileContent(editedFileContent);
      refreshDirectory();
      Alert.alert(
        'Збережено',
        'Зміни у файлі успішно записано.'
      );
    } catch (saveError) {
      Alert.alert(
        'Не вдалося',
        saveError.message || 'Не вдалося зберегти файл.'
      );
    } finally {
      setSavingFile(false);
    }
  };

  const handleDeleteItem = (item) => {
    Alert.alert(
      'Підтвердження',
      item.isDirectory
        ? 'Ви справді хочете видалити цю папку разом із усім вмістом?'
        : 'Ви справді хочете видалити цей файл?',
      [
        { text: 'Скасувати', style: 'cancel' },
        {
          text: 'Видалити',
          style: 'destructive',
          onPress: () => {
            try {
              if (item.isDirectory) {
                new Directory(item.uri).delete();
              } else {
                new File(item.uri).delete();
              }

              if (openedFileUri === item.uri) {
                handleCloseViewer();
              }

              if (selectedFileInfo?.uri === item.uri) {
                setSelectedFileInfo(null);
              }

              refreshDirectory();
            } catch (deleteError) {
              Alert.alert(
                'Не вдалося',
                deleteError.message || 'Не вдалося видалити елемент.'
              );
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <FileListItem
      item={item}
      onOpenItem={handleOpenItem}
      onShowFileInfo={handleShowFileInfo}
      onDeleteItem={handleDeleteItem}
      styles={styles}
    />
  );

  const renderHeader = () => (
    <>
      <FileManagerHeader
        currentUri={currentUri}
        formatBreadcrumb={formatBreadcrumb}
        isAtRoot={isAtRoot}
        onGoUp={handleGoUp}
        styles={styles}
      />
      <StorageStatsCard storageStats={storageStats} styles={styles} />
      <CreateFolderSection
        folderName={folderName}
        onChangeFolderName={setFolderName}
        onCreateFolder={handleCreateFolder}
        styles={styles}
      />
      <CreateFileSection
        fileName={fileName}
        fileContent={fileContent}
        onChangeFileName={setFileName}
        onChangeFileContent={setFileContent}
        onCreateFile={handleCreateFile}
        styles={styles}
      />
      <Text style={styles.listTitle}>
        {'Вміст поточної папки'}
      </Text>
    </>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <FileInfoModal selectedFileInfo={selectedFileInfo} onClose={handleCloseFileInfo} styles={styles} />
      <FileViewerCard
        readingFile={readingFile}
        openedFileName={openedFileName}
        openedFileContent={openedFileContent}
        editedFileContent={editedFileContent}
        savingFile={savingFile}
        onChangeEditedContent={setEditedFileContent}
        onCloseViewer={handleCloseViewer}
        onSaveFile={handleSaveFile}
        styles={styles}
      />
      <View style={styles.container}>
        {loading ? (
          <View style={styles.centerState}>
            <ActivityIndicator size="large" color="#1d4ed8" />
            <Text style={styles.stateText}>
              {'Завантаження директорії...'}
            </Text>
          </View>
        ) : error ? (
          <View style={styles.centerState}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : (
          <FlatList
            data={items}
            keyExtractor={(item) => item.uri}
            renderItem={renderItem}
            ListHeaderComponent={renderHeader}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListEmptyComponent={
              <View style={styles.centerState}>
                <Text style={styles.stateText}>
                  {'У цій директорії немає файлів або папок.'}
                </Text>
              </View>
            }
            contentContainerStyle={items.length ? styles.listContent : styles.emptyListContent}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

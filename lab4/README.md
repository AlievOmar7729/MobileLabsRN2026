# Лабораторна робота №4

Цей проєкт виконаний з використанням `Expo SDK 54`.

## Тема

Робота з файловою системою в React Native з використанням `expo-file-system`.

## Що реалізовано

- навігація по локальній файловій системі застосунку
- відображення поточного шляху
- перегляд вмісту поточної директорії через `FlatList`
- перехід у вкладені папки
- повернення до батьківської директорії
- створення нової папки
- створення нового `.txt` файлу з початковим вмістом
- відкриття `.txt` файлів для перегляду вмісту
- редагування текстових файлів
- збереження змін у файл
- видалення файлів і папок з підтвердженням
- перегляд детальної інформації про файл у модальному вікні
- відображення статистики пам’яті пристрою:
  загальний обсяг, вільний простір, зайнятий простір
- винесення інтерфейсу на окремі компоненти

## Використані технології

- `React Native`
- `Expo SDK 54`
- `expo-file-system`
- `expo-status-bar`

## Додані залежності

У проєкті використовуються:

- `expo`
- `expo-file-system`
- `expo-status-bar`
- `react`
- `react-native`

## Структура проєкту

- [App.js](./lab4/App.js) - головна логіка файлового менеджера
- [fileManagerStyles.js](./lab4/fileManagerStyles.js) - спільні стилі застосунку
- [components/FileManagerHeader.js](./lab4/components/FileManagerHeader.js) - шапка з поточним шляхом і кнопкою переходу вгору
- [components/StorageStatsCard.js](./lab4/components/StorageStatsCard.js) - блок статистики пам’яті пристрою
- [components/CreateFolderSection.js](./lab4/components/CreateFolderSection.js) - форма створення папки
- [components/CreateFileSection.js](./lab4/components/CreateFileSection.js) - форма створення текстового файлу
- [components/FileListItem.js](./lab4/components/FileListItem.js) - елемент списку файлів і папок
- [components/FileInfoModal.js](./lab4/components/FileInfoModal.js) - модальне вікно з інформацією про файл
- [components/FileViewerCard.js](./lab4/components/FileViewerCard.js) - модальне вікно перегляду та редагування `.txt` файлу

## Приклади коду

### 1. Завантаження вмісту поточної директорії

```jsx
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
```

цей код зчитує всі елементи з поточної папки, сортує їх так, щоб папки були вище за файли, а потім перетворює кожен елемент у зручний об’єкт для відображення у списку.

### 2. Відкриття текстового файлу

```jsx
const file = new File(item.uri);
const content = await file.text();

setOpenedFileUri(item.uri);
setOpenedFileName(item.name);
setOpenedFileContent(content);
setEditedFileContent(content);
```
 
цей фрагмент відкриває вибраний `.txt` файл, зчитує його текст і записує в стан застосунку, щоб потім показати вміст у вікні перегляду та дати можливість редагувати його.

## Запуск проєкту

1. Перейти в папку проєкту:

```bash
cd lab4/lab4
```

2. Встановити залежності:

```bash
npm install
```

3. Запустити застосунок:

```bash
npx expo start
```

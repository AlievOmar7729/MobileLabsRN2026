import {
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import { Image, StyleSheet, Text, View } from 'react-native';

export function CustomDrawerContent(props) {
  const { navigation, state } = props;
  const activeRouteName = state.routeNames[state.index];

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.profileCard}>
        <Image
          source={{ uri: 'https://scontent-ams2-1.cdninstagram.com/v/t51.2885-19/573323465_1219825463302212_7278921664109726296_n.png?stp=dst-jpg_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4yMjQuYzIifQ&_nc_ht=scontent-ams2-1.cdninstagram.com&_nc_cat=1&_nc_oc=Q6cZ2gFK8w9YUOZGKm_FH3RYraRe4p0XvdbH7Ms_rXvUy_qSGyHAfLOS5Z7m0r68xJGnxEP5eFXXj6MSkkS_B0-3ll5L&_nc_ohc=Ays5fKPwO3oQ7kNvwHb0s4E&edm=AAAAAAABAAAA&ccb=7-5&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.3-ccb7-5&oh=00_Af2xreREKrqjtzZ7K-KV8ozrGfdb8DqHG_TGxm7JGASgAg&oe=69D485AA&_nc_sid=328259' }}
          style={styles.avatar}
        />
        <Text style={styles.fullName}>Aliiev Omar</Text>
        <Text style={styles.group}>Group: IPZ-22-1</Text>
      </View>

      <View style={styles.menuSection}>
        <DrawerItem
          label="Новини"
          focused={activeRouteName === 'NewsStack'}
          onPress={() => navigation.navigate('NewsStack')}
          labelStyle={styles.label}
          activeTintColor="#0b6e4f"
          inactiveTintColor="#41534f"
          style={styles.item}
        />
        <DrawerItem
          label="Контакти"
          focused={activeRouteName === 'ContactsScreen'}
          onPress={() => navigation.navigate('ContactsScreen')}
          labelStyle={styles.label}
          activeTintColor="#0b6e4f"
          inactiveTintColor="#41534f"
          style={styles.item}
        />
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flex: 1,
    backgroundColor: '#f4f7f1',
    paddingTop: 0,
  },
  profileCard: {
    alignItems: 'center',
    backgroundColor: '#16302b',
    paddingHorizontal: 20,
    paddingTop: 48,
    paddingBottom: 28,
  },
  avatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
    marginBottom: 14,
    borderWidth: 3,
    borderColor: '#dcebe3',
  },
  fullName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  group: {
    fontSize: 14,
    color: '#dcebe3',
  },
  menuSection: {
    paddingTop: 18,
    paddingHorizontal: 10,
  },
  item: {
    borderRadius: 14,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
});

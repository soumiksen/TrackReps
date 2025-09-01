import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import styles from './TabBar.styles';

const TabBar = ({ state, descriptors, navigation }: any) => {
  const icons: Record<string, keyof typeof Ionicons.glyphMap> = {
    index: 'home-outline',
    chat: 'chatbubble-outline',
    profile: 'person-outline',
    barbell: 'barbell-outline',
  };

  const activeIcons: Record<string, keyof typeof Ionicons.glyphMap> = {
    index: 'home',
    chat: 'chatbubble',
    profile: 'person',
    barbell: 'barbell',
  };

  return (
    <View style={styles.tabContainer}>
      {state.routes.map((route: any, index: any) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole='button'
            onPress={onPress}
            style={[styles.tabItem, isFocused && styles.activeTab]}
          >
            <Ionicons
              name={isFocused ? activeIcons[route.name] : icons[route.name]}
              size={18}
              color={isFocused ? '#fff' : '#8e8e93'}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBar;

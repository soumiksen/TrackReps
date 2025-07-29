import Button from '@/components/Button/Button';
import { signOut } from '@/services/authentication';
import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfileScreen = () => {
  return (
    <SafeAreaView>
      <Text>ProfileScreen</Text>
      <Button onPress={() => signOut()}>Sign Out</Button>
    </SafeAreaView>
  );
};

export default ProfileScreen;

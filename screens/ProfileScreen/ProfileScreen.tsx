import Button from '@/components/Button/Button';
import Container from '@/components/Container/Container';
import { signOut } from '@/services/users';
import React from 'react';
import { Text } from 'react-native';

const ProfileScreen = () => {
  return (
    <Container>
      <Text>Profile</Text>
      <Button onPress={() => signOut()}>Sign Out</Button>
    </Container>
  );
};

export default ProfileScreen;

import Button from '@/components/Button/Button';
import Container from '@/components/Container/Container';
import GradientBackground from '@/components/GradientBackground/GradientBackground';
import { signOut } from '@/services/users';
import React from 'react';
import { Text } from 'react-native';

const ProfileScreen = () => {
  return (
    <GradientBackground>
      <Container>
        <Text>Profile</Text>
        <Button onPress={() => signOut()}>Sign Out</Button>
      </Container>
    </GradientBackground>
  );
};

export default ProfileScreen;

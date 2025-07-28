import AuthProvider, { AuthContext } from '@/context/AuthContext';
import { Stack } from 'expo-router';
import { useContext } from 'react';

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}

const RootNavigator = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <Stack>
      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name='auth/signin' options={{ headerShown: false }} />
        <Stack.Screen name='auth/signup' options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        <Stack.Screen
          name='workout/[id]'
          options={{ title: 'Workout Details', headerBackTitle: 'Go Back' }}
        />
        <Stack.Screen
          name='workout/add'
          options={{ title: 'Add Workout', headerBackTitle: 'Go Back' }}
        />
      </Stack.Protected>

    </Stack>
  );
};

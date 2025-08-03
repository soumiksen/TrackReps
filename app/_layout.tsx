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
          name='routine/[id]'
          options={{ title: 'Routine Details', headerBackTitle: 'Go Back' }}
        />
        <Stack.Screen
          name='routine/add'
          options={{ title: 'Add Routine', headerBackTitle: 'Go Back' }}
        />
        <Stack.Screen
          name='workouts/history'
          options={{ title: 'Workouts History', headerBackTitle: 'Go Back' }}
        />
        <Stack.Screen
          name='workouts/add'
          options={{ title: 'Add Workout', headerBackTitle: 'Go Back' }}
        />
        <Stack.Screen
          name='workouts/[id]'
          options={{ title: 'Workout Detail', headerBackTitle: 'Go Back' }}
        />
      </Stack.Protected>

    </Stack>
  );
};

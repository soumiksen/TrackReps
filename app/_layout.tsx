import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      <Stack.Screen
        name='workout/[id]'
        options={{ title: 'Workout Details', headerBackTitle: 'Go back' }}
      />
      <Stack.Screen
        name='workout/add'
        options={{ title: 'Add Workout', headerBackTitle: 'Go back' }}
      />
    </Stack>
  );
}

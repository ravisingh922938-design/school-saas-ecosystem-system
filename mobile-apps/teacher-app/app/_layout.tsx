import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        <Stack.Screen name="AttendanceScreen" options={{ title: 'Attendance' }} />
        <Stack.Screen name="HomeworkScreen" options={{ title: 'Homework' }} />
        <Stack.Screen name="LiveChatScreen" options={{ title: 'Live Chat' }} />
        <Stack.Screen name="StudentDetailsScreen" options={{ title: 'Student Details' }} />
        <Stack.Screen name="NotificationScreen" options={{ title: 'Notifications' }} />
        <Stack.Screen name="ClassListScreen" options={{ title: 'Classes' }} />
        <Stack.Screen name="StudentListScreen" options={{ title: 'Students' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

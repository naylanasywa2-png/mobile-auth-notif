import { Stack } from 'expo-router';
import * as Notifications from 'expo-notifications'; // 1. Import expo-notifications
import { AuthProvider, useAuth } from '../../context/AuthContext';

// 2. Set handler notifikasi secara global (wajib ditaruh di luar komponen)
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

function Navigator() {
  const { token, loading } = useAuth();
  if (loading) return null;

  return (
    <Stack>
      <Stack.Protected guard={!token}>
        {/* Perbaikan spasi pada name="sign-in" */}
        <Stack.Screen name="sign-in" options={{ title: 'Login' }} />
        <Stack.Screen name="register" options={{ title: 'Daftar' }} />
      </Stack.Protected>
      <Stack.Protected guard={!!token}>
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <Navigator />
    </AuthProvider>
  );
}
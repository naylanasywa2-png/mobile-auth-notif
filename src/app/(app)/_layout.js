import { useEffect } from 'react';
import { Stack, router } from 'expo-router';
import * as Notifications from 'expo-notifications';

export default function AppLayout() {
  useEffect(() => {
    // Listener saat notifikasi diterima ketika aplikasi aktif (foreground)
    const received = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log('Notifikasi diterima:', notification.request.content);
      }
    );

    // Listener saat notifikasi diketuk oleh pengguna
    const response = Notifications.addNotificationResponseReceivedListener(
      (event) => {
        const screen = event.notification.request.content.data?.screen;
        if (screen === 'profile') {
          router.push('/profile');
        }
      }
    );

    // Cleanup listener saat komponen dilepas (unmount)
    return () => {
      received.remove();
      response.remove();
    };
  }, []);

  return <Stack />;
}
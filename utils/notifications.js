import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

// 1. Konfigurasi cara notifikasi ditampilkan saat aplikasi aktif di foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

/**
 * Mendaftarkan Notification Channel khusus Android
 * Diperlukan agar notifikasi bisa muncul sebagai banner/pop-up di Android 8.0+
 */
export async function setupAndroidNotificationChannel() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'Default Notification Channel',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
      enableVibrate: true,
    });
  }
}

/**
 * Meminta izin dan mengambil Expo Push Token perangkat
 */
export async function getExpoPushToken() {
  // Pastikan Android Notification Channel sudah siap
  await setupAndroidNotificationChannel();

  // 2. Cek dan minta izin notifikasi dari pengguna
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    throw new Error('Izin notifikasi tidak diberikan');
  }

  // 3. Ambil EAS Project ID dari konfigurasi app.json
  const projectId =
    Constants.expoConfig?.extra?.eas?.projectId ??
    Constants.easConfig?.projectId;

  if (!projectId) {
    throw new Error('EAS projectId tidak ditemukan di app.json');
  }

  // 4. Ambil dan kembalikan push token
  const tokenData = await Notifications.getExpoPushTokenAsync({ projectId });
  return tokenData.data;
}
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../../../context/AuthContext';
import { getExpoPushToken } from '../../../utils/notifications';
// 1. Import kirimNotifikasiUji
import { simpanPushToken, kirimNotifikasiUji } from '../../../services/notificationService';

export default function HomeScreen() {
  // Ambil user, signOut, dan token JWT dari Context
  const { user, signOut, token } = useAuth();

  // State untuk mengontrol Pop-up Alert Pastel Custom
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  // Fungsi penampil modal pop-up
  const showAlert = (title, message) => {
    setModalTitle(title);
    setModalMessage(message);
    setModalVisible(true);
  };

  // Fungsi untuk meminta izin & menyimpan Push Token (Langkah 25)
  async function aktifkanNotifikasi() {
    try {
      const expoPushToken = await getExpoPushToken();
      await simpanPushToken(token, expoPushToken);
      showAlert('Berhasil', 'Perangkat terdaftar untuk notifikasi');
    } catch (e) {
      showAlert('Notifikasi', e.message);
    }
  }

  // 2. Fungsi testNotifikasi (Langkah 28)
  async function testNotifikasi() {
    try {
      const data = await kirimNotifikasiUji(token);
      showAlert('Server', data.pesan);
    } catch (e) {
      showAlert('Gagal', e.message);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.welcomeText}>Halo, {user?.nama || 'percoba'} 👋</Text>
        <Text style={styles.subtitle}>Anda sudah login menggunakan JWT.</Text>

        {/* Tombol Lihat Profil */}
        <TouchableOpacity 
          style={[styles.btn, styles.btnProfil]} 
          onPress={() => router.push('/profile')}
          activeOpacity={0.8}
        >
          <Text style={styles.btnText}>😊 LIHAT PROFIL</Text>
        </TouchableOpacity>

        {/* Tombol Aktifkan Notifikasi */}
        <TouchableOpacity 
          style={[styles.btn, styles.btnNotif]} 
          onPress={aktifkanNotifikasi}
          activeOpacity={0.8}
        >
          <Text style={styles.btnText}>🔔 AKTIFKAN NOTIFIKASI</Text>
        </TouchableOpacity>

        {/* 3. Tombol Kirim Notifikasi Uji (Langkah 28) */}
        <TouchableOpacity 
          style={[styles.btn, styles.btnTest]} 
          onPress={testNotifikasi}
          activeOpacity={0.8}
        >
          <Text style={styles.btnText}>🚀 KIRIM NOTIFIKASI UJI</Text>
        </TouchableOpacity>

        {/* Tombol Logout */}
        <TouchableOpacity 
          style={[styles.btn, styles.btnLogout]} 
          onPress={signOut}
          activeOpacity={0.8}
        >
          <Text style={styles.btnText}>🚪 LOGOUT</Text>
        </TouchableOpacity>
      </View>

      {/* Pop-up Alert Pastel Custom */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalEmoji}>🐰✨</Text>
            <Text style={styles.modalTitle}>{modalTitle}</Text>
            <Text style={styles.modalMessage}>{modalMessage}</Text>

            <TouchableOpacity
              style={styles.modalBtn}
              onPress={() => setModalVisible(false)}
              activeOpacity={0.8}
            >
              <Text style={styles.modalBtnText}>OK ✩</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF7F2',
    padding: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    gap: 14,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4A3728',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B5B52',
    marginBottom: 16,
  },
  btn: {
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  btnProfil: {
    backgroundColor: '#92B4EC',
  },
  btnNotif: {
    backgroundColor: '#A2CA8C',
  },
  btnTest: {
    backgroundColor: '#FBB083',
  },
  btnLogout: {
    backgroundColor: '#F4989C',
  },
  btnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 0.5,
  },

  /* Styling Modal Alert Pastel Custom */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalCard: {
    width: '82%',
    backgroundColor: '#FFFBF7',
    borderWidth: 2,
    borderColor: '#F3D2C1',
    borderRadius: 28,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  modalEmoji: {
    fontSize: 38,
    marginBottom: 6,
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#4A3728',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 15,
    color: '#6B5B52',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  modalBtn: {
    backgroundColor: '#F4989C',
    paddingVertical: 10,
    paddingHorizontal: 28,
    borderRadius: 20,
    shadowColor: '#F4989C',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  modalBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';
import { Link, router } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

export default function SignInScreen() {
  const { signIn, token } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // State untuk Custom Pop-up Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  // Otomatis pindah halaman begitu token di AuthContext berhasil terisi
  useEffect(() => {
    if (token) {
      router.replace('/(app)');
    }
  }, [token]);

  async function handleLogin() {
    try {
      setLoading(true);
      await signIn(email, password);
      router.replace('/(app)');
    } catch (e) {
      setModalTitle('Login gagal');
      setModalMessage(e.message || 'email atau password salah');
      setModalVisible(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.mainTitle}>Masuk</Text>

        {/* Input Email */}
        <TextInput
          style={styles.input}
          placeholder="📧 Email"
          placeholderTextColor="#A89F91"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        {/* Input Password */}
        <TextInput
          style={styles.input}
          placeholder="🔒 Password"
          placeholderTextColor="#A89F91"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* Tombol Login bergaya Pill pastel */}
        <TouchableOpacity
          style={[styles.btnLogin, loading && styles.btnDisabled]}
          onPress={handleLogin}
          disabled={loading}
          activeOpacity={0.8}
        >
          <Text style={styles.btnText}>
            {loading ? 'MEMPROSES...' : 'LOGIN'}
          </Text>
        </TouchableOpacity>

        {/* Link Daftar */}
        <View style={styles.linkContainer}>
          <Text style={styles.subText}>Belum punya akun? </Text>
          <Link href="/register" style={styles.link}>
            Daftar
          </Link>
        </View>
      </View>

      {/* Pop-up Alert Pastel Custom (Login Gagal) */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalEmoji}>🌸🐰⭐</Text>
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
    justifyContent: 'center',
  },
  content: {
    marginTop: 20,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4A3728',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#FFF3EB',
    borderWidth: 1.5,
    borderColor: '#F3D2C1',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 14,
    fontSize: 16,
    color: '#4A3728',
    marginBottom: 16,
  },
  btnLogin: {
    backgroundColor: '#FF9E88',
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#FF9E88',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  btnDisabled: {
    opacity: 0.6,
  },
  btnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  subText: {
    color: '#4A3728',
    fontSize: 14,
  },
  link: {
    color: '#92B4EC',
    fontWeight: 'bold',
    fontSize: 14,
  },

  /* Custom Pop-up Modal Pastel */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalCard: {
    width: '85%',
    backgroundColor: '#FFFBF7',
    borderWidth: 2,
    borderColor: '#F3D2C1',
    borderRadius: 28,
    paddingHorizontal: 20,
    paddingVertical: 26,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  modalEmoji: {
    fontSize: 36,
    marginBottom: 8,
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#4A3728',
    marginBottom: 6,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 16,
    color: '#6B5B52',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  modalBtn: {
    backgroundColor: '#F4989C',
    paddingVertical: 10,
    paddingHorizontal: 32,
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
    fontSize: 16,
  },
});
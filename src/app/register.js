import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { router } from 'expo-router';
import { registerUser } from '../../services/authService';

export default function RegisterScreen() {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleRegister() {
    try {
      await registerUser(nama, email, password);
      Alert.alert('Berhasil', 'Akun dibuat. Silakan login.');
      router.replace('/sign-in');
    } catch (e) {
      Alert.alert('Registrasi gagal', e.message);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.mainTitle}>Buat Akun</Text>

        {/* Input Nama */}
        <TextInput
          style={styles.input}
          placeholder="👤 Nama"
          placeholderTextColor="#A89F91"
          value={nama}
          onChangeText={setNama}
        />

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
          placeholder="🔒 Password min. 8 karakter"
          placeholderTextColor="#A89F91"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* Tombol Daftar Biru Pastel */}
        <TouchableOpacity
          style={styles.btnDaftar}
          onPress={handleRegister}
          activeOpacity={0.8}
        >
          <Text style={styles.btnText}>DAFTAR</Text>
        </TouchableOpacity>
      </View>
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
  btnDaftar: {
    backgroundColor: '#92B4EC',
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#92B4EC',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  btnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
});
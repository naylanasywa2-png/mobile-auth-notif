import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useAuth } from '../../../context/AuthContext';
import { getMe } from '../../../services/authService';

export default function ProfileScreen() {
  const { token } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getMe(token).then(setProfile).catch(console.error);
  }, [token]);

  if (!profile) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF9E88" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Kartu Informasi Profil Pastel */}
      <View style={styles.profileCard}>
        <View style={styles.avatarHeader}>
          <Text style={styles.avatarEmoji}>🐰👧✨</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoText}>
            👤 <Text style={styles.label}>Nama:</Text> {profile.nama}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoText}>
            📧 <Text style={styles.label}>Email:</Text> {profile.email}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoText}>
            🪪 <Text style={styles.label}>ID:</Text> {profile.id}
          </Text>
        </View>
      </View>
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
  loadingContainer: {
    flex: 1,
    backgroundColor: '#FFF7F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileCard: {
    backgroundColor: '#FFF3EB',
    borderWidth: 2,
    borderColor: '#F3D2C1',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#F3D2C1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 4,
  },
  avatarHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarEmoji: {
    fontSize: 40,
  },
  infoRow: {
    marginVertical: 8,
    paddingVertical: 4,
  },
  infoText: {
    fontSize: 16,
    color: '#4A3728',
  },
  label: {
    fontWeight: 'bold',
  },
});
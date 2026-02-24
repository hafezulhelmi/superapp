import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
  ScrollView,
} from 'react-native';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { logout } from '../store/authSlice';
import colors from '../theme/colors';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainTabParamList } from '../navigation/RootNavigator';

type HomeScreenProps = NativeStackScreenProps<MainTabParamList, 'Home'>;

/**
 * HomeScreen Component
 * Main landing page showing user info and Mini App cards
 */
const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const handleLogout = () => {
    if (Platform.OS === 'web') {
      const confirmLogout = window.confirm('Are you sure you want to logout?');
      if (confirmLogout) {
        dispatch(logout());
      }
    } else {
      Alert.alert(
        'Logout',
        'Are you sure you want to logout?',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Logout', 
            style: 'destructive',
            onPress: () => dispatch(logout()) 
          },
        ]
      );
    }
  };

  const getRoleBadgeColor = () => {
    switch (user?.role) {
      case 'superadmin':
        return colors.superadmin;
      case 'admin':
        return colors.admin;
      case 'user':
        return colors.user;
      default:
        return colors.textSecondary;
    }
  };

  const getRoleDisplayName = () => {
    if (!user) return 'USER';
    switch (user.role) {
      case 'superadmin':
        return 'SUPER ADMIN';
      case 'admin':
        return 'ADMIN';
      case 'user':
        return 'USER';
      default:
        return String(user.role).toUpperCase();
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{getGreeting()},</Text>
            <Text style={styles.userName}>{user?.name || 'User'}</Text>
            <Text style={styles.waveEmoji}>👋</Text>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* User Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {user?.name?.charAt(0).toUpperCase() || 'S'}
              </Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{user?.name || 'User'}</Text>
              <Text style={styles.profileEmail}>{user?.email || 'user@app.com'}</Text>
              <View style={[styles.roleBadge, { backgroundColor: getRoleBadgeColor() }]}>
                <Text style={styles.roleBadgeText}>{getRoleDisplayName()}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Mini Apps Section */}
        <Text style={styles.sectionTitle}>Mini Apps</Text>
        <View style={styles.miniAppsGrid}>
          {/* Profile Mini App Card */}
          <TouchableOpacity
            style={styles.miniAppCard}
            onPress={() => navigation.navigate('Profile')}
          >
            <View style={[styles.miniAppIcon, { backgroundColor: '#E9D5FF' }]}>
              <Text style={styles.miniAppIconText}>👤</Text>
            </View>
            <Text style={styles.miniAppTitle}>Profile</Text>
            <Text style={styles.miniAppDescription}>
              View and manage your account details
            </Text>
          </TouchableOpacity>

          {/* Dashboard Mini App Card */}
          <TouchableOpacity
            style={styles.miniAppCard}
            onPress={() => navigation.navigate('Dashboard')}
          >
            <View style={[styles.miniAppIcon, { backgroundColor: '#DBEAFE' }]}>
              <Text style={styles.miniAppIconText}>📊</Text>
            </View>
            <Text style={styles.miniAppTitle}>Dashboard</Text>
            <Text style={styles.miniAppDescription}>
              Role-based insights and overview
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  greeting: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  waveEmoji: {
    fontSize: 24,
    marginTop: 4,
  },
  logoutButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: colors.textWhite,
    fontSize: 14,
    fontWeight: '600',
  },
  profileCard: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textWhite,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textWhite,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 8,
  },
  roleBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  roleBadgeText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: colors.textWhite,
    letterSpacing: 0.5,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 16,
  },
  miniAppsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  miniAppCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    width: '47%',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  miniAppIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  miniAppIconText: {
    fontSize: 24,
  },
  miniAppTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  miniAppDescription: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
});

export default HomeScreen;

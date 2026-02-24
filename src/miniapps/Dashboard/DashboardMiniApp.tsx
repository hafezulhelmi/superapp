import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useAppSelector } from '../../store/hooks';
import colors from '../../theme/colors';

/**
 * Dashboard Mini App
 * Displays a personalized dashboard with role-based content
 * Accesses the shared user profile from global Redux state
 */
const DashboardMiniApp: React.FC = () => {
  const user = useAppSelector(state => state.auth.user);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No user data available</Text>
      </View>
    );
  }

  const getRoleBasedMessage = () => {
    switch (user.role) {
      case 'superadmin':
        return {
          title: 'Super Admin',
          message: 'You have unrestricted access to the entire platform.',
          accessLevel: 'Level 3 — Full Control',
          capabilities: ['Manage all users & roles', 'View analytics', 'Configure settings'],
          color: colors.superadmin,
        };
      case 'admin':
        return {
          title: 'Admin',
          message: 'You have administrative access to manage users and content.',
          accessLevel: 'Level 2 — Administrative',
          capabilities: ['Manage users', 'View analytics'],
          color: colors.admin,
        };
      case 'user':
        return {
          title: 'User',
          message: 'Welcome! You can access all available Mini Apps.',
          accessLevel: 'Level 1 — Standard Access',
          capabilities: ['Access Mini Apps', 'Manage profile'],
          color: colors.user,
        };
      default:
        return {
          title: 'User',
          message: 'Welcome to the SuperApp!',
          accessLevel: 'Standard Access',
          capabilities: [],
          color: colors.textSecondary,
        };
    }
  };

  const roleInfo = getRoleBasedMessage();
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.breadcrumb}>MINI APP</Text>
          <View style={styles.titleRow}>
            <Text style={styles.icon}>📊</Text>
            <Text style={styles.title}>Dashboard</Text>
          </View>
        </View>

        {/* Welcome Banner */}
        <View style={[styles.banner, { backgroundColor: roleInfo.color + '20' }]}>
          <Text style={styles.dateText}>{formattedDate}</Text>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.welcomeName}>{user.name}!</Text>
          <View style={[styles.roleBadge, { backgroundColor: roleInfo.color }]}>
            <Text style={styles.roleBadgeText}>{roleInfo.title.toUpperCase()}</Text>
          </View>
        </View>

        {/* Access Status */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Access Status</Text>
          <View style={styles.accessContainer}>
            <Text style={styles.accessLevel}>{roleInfo.accessLevel}</Text>
            <Text style={styles.accessMessage}>{roleInfo.message}</Text>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Quick Stats</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Sessions</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>47</Text>
              <Text style={styles.statLabel}>Actions</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>30</Text>
              <Text style={styles.statLabel}>Days Active</Text>
            </View>
          </View>
        </View>

        {/* Available Features */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Available Features</Text>
          {roleInfo.capabilities.map((capability, index) => (
            <View key={index} style={styles.featureRow}>
              <Text style={styles.featureBullet}>●</Text>
              <Text style={styles.featureText}>{capability}</Text>
            </View>
          ))}
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
    marginBottom: 24,
  },
  breadcrumb: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: 8,
    letterSpacing: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 32,
    marginRight: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  banner: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  dateText: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  welcomeName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  roleBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  roleBadgeText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: colors.textWhite,
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 16,
  },
  accessContainer: {
    paddingVertical: 8,
  },
  accessLevel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  accessMessage: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    borderLeftWidth: 2,
    borderLeftColor: colors.primary,
    marginHorizontal: 4,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  featureBullet: {
    fontSize: 16,
    color: colors.primary,
    marginRight: 12,
  },
  featureText: {
    fontSize: 14,
    color: colors.textPrimary,
    flex: 1,
    lineHeight: 20,
  },
  errorText: {
    fontSize: 16,
    color: colors.error,
    textAlign: 'center',
    marginTop: 40,
  },
});

export default DashboardMiniApp;

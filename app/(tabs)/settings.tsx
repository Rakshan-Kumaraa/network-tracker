import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Switch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import {
  Settings as SettingsIcon,
  Bell,
  Moon,
  Database,
  Shield,
  Smartphone,
  Wifi,
  HelpCircle,
  Star,
  Share,
  ChevronRight,
  AlertTriangle,
  Palette,
  Timer,
} from 'lucide-react-native';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';

interface SettingItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: any;
  iconColor: string;
  type: 'toggle' | 'navigation' | 'action';
  value?: boolean;
  onPress?: () => void;
  onToggle?: (value: boolean) => void;
}

export default function Settings() {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: true,
    dataAlerts: true,
    backgroundRefresh: false,
    autoUpdate: true,
    batteryOptimization: true,
  });

  const updateSetting = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const settingSections = [
    {
      title: 'Monitoring',
      items: [
        {
          id: 'notifications',
          title: 'Push Notifications',
          subtitle: 'Get alerts for data usage',
          icon: Bell,
          iconColor: '#F59E0B',
          type: 'toggle',
          value: settings.notifications,
          onToggle: (value: boolean) => updateSetting('notifications', value),
        },
        {
          id: 'dataAlerts',
          title: 'Data Usage Alerts',
          subtitle: 'Warn when approaching limits',
          icon: AlertTriangle,
          iconColor: '#EF4444',
          type: 'toggle',
          value: settings.dataAlerts,
          onToggle: (value: boolean) => updateSetting('dataAlerts', value),
        },
        {
          id: 'backgroundRefresh',
          title: 'Background Refresh',
          subtitle: 'Update data in background',
          icon: Timer,
          iconColor: '#8B5CF6',
          type: 'toggle',
          value: settings.backgroundRefresh,
          onToggle: (value: boolean) => updateSetting('backgroundRefresh', value),
        },
      ] as SettingItem[],
    },
    {
      title: 'Appearance',
      items: [
        {
          id: 'darkMode',
          title: 'Dark Mode',
          subtitle: 'Use dark theme',
          icon: Moon,
          iconColor: '#6366F1',
          type: 'toggle',
          value: settings.darkMode,
          onToggle: (value: boolean) => updateSetting('darkMode', value),
        },
        {
          id: 'themes',
          title: 'Themes',
          subtitle: 'Customize app appearance',
          icon: Palette,
          iconColor: '#EC4899',
          type: 'navigation',
          onPress: () => console.log('Open themes'),
        },
      ] as SettingItem[],
    },
    {
      title: 'Data & Privacy',
      items: [
        {
          id: 'dataManagement',
          title: 'Data Management',
          subtitle: 'Manage stored data',
          icon: Database,
          iconColor: '#10B981',
          type: 'navigation',
          onPress: () => console.log('Open data management'),
        },
        {
          id: 'privacy',
          title: 'Privacy Settings',
          subtitle: 'Control data sharing',
          icon: Shield,
          iconColor: '#3B82F6',
          type: 'navigation',
          onPress: () => console.log('Open privacy settings'),
        },
      ] as SettingItem[],
    },
    {
      title: 'Advanced',
      items: [
        {
          id: 'networkSettings',
          title: 'Network Settings',
          subtitle: 'Configure network preferences',
          icon: Wifi,
          iconColor: '#06B6D4',
          type: 'navigation',
          onPress: () => console.log('Open network settings'),
        },
        {
          id: 'deviceSettings',
          title: 'Device Settings',
          subtitle: 'App-specific device settings',
          icon: Smartphone,
          iconColor: '#84CC16',
          type: 'navigation',
          onPress: () => console.log('Open device settings'),
        },
        {
          id: 'autoUpdate',
          title: 'Auto Update',
          subtitle: 'Update app automatically',
          icon: SettingsIcon,
          iconColor: '#A855F7',
          type: 'toggle',
          value: settings.autoUpdate,
          onToggle: (value: boolean) => updateSetting('autoUpdate', value),
        },
      ] as SettingItem[],
    },
    {
      title: 'Support',
      items: [
        {
          id: 'help',
          title: 'Help & Support',
          subtitle: 'Get help and documentation',
          icon: HelpCircle,
          iconColor: '#F59E0B',
          type: 'navigation',
          onPress: () => console.log('Open help'),
        },
        {
          id: 'rate',
          title: 'Rate App',
          subtitle: 'Rate us on Play Store',
          icon: Star,
          iconColor: '#EAB308',
          type: 'action',
          onPress: () => console.log('Open Play Store'),
        },
        {
          id: 'share',
          title: 'Share App',
          subtitle: 'Share with friends',
          icon: Share,
          iconColor: '#06B6D4',
          type: 'action',
          onPress: () => console.log('Share app'),
        },
      ] as SettingItem[],
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={['#0F0715', '#1A0B2E', '#2D1B69']}
        style={styles.gradient}
      />
      
      {/* Header */}
      <Animated.View entering={FadeInDown.delay(100)} style={styles.header}>
        <BlurView intensity={20} style={styles.headerBlur}>
          <View style={styles.headerContent}>
            <View style={styles.headerLeft}>
              <SettingsIcon size={28} color="#7C3AED" />
              <View>
                <Text style={styles.headerTitle}>Settings</Text>
                <Text style={styles.headerSubtitle}>Customize your experience</Text>
              </View>
            </View>
          </View>
        </BlurView>
      </Animated.View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {settingSections.map((section, sectionIndex) => (
          <Animated.View 
            key={section.title}
            entering={FadeInDown.delay(200 + sectionIndex * 100)}
            style={styles.section}
          >
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <BlurView intensity={15} style={styles.sectionBlur}>
              <View style={styles.sectionContent}>
                {section.items.map((item, index) => (
                  <Pressable
                    key={item.id}
                    onPress={item.type === 'toggle' ? undefined : item.onPress}
                    style={[
                      styles.settingItem,
                      index < section.items.length - 1 && styles.settingItemBorder
                    ]}
                  >
                    <View style={styles.settingLeft}>
                      <View style={[styles.settingIcon, { backgroundColor: `${item.iconColor}20` }]}>
                        <item.icon size={20} color={item.iconColor} />
                      </View>
                      <View style={styles.settingText}>
                        <Text style={styles.settingTitle}>{item.title}</Text>
                        {item.subtitle && (
                          <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
                        )}
                      </View>
                    </View>
                    
                    <View style={styles.settingRight}>
                      {item.type === 'toggle' && (
                        <Switch
                          value={item.value}
                          onValueChange={item.onToggle}
                          trackColor={{ false: 'rgba(255, 255, 255, 0.2)', true: '#7C3AED' }}
                          thumbColor={item.value ? '#FFFFFF' : '#FFFFFF'}
                        />
                      )}
                      {(item.type === 'navigation' || item.type === 'action') && (
                        <ChevronRight size={20} color="rgba(255, 255, 255, 0.5)" />
                      )}
                    </View>
                  </Pressable>
                ))}
              </View>
            </BlurView>
          </Animated.View>
        ))}

        {/* App Info */}
        <Animated.View entering={FadeInDown.delay(800)} style={styles.appInfo}>
          <BlurView intensity={15} style={styles.appInfoBlur}>
            <View style={styles.appInfoContent}>
              <View style={styles.appLogo}>
                <Text style={styles.appLogoText}>📊</Text>
              </View>
              <View style={styles.appDetails}>
                <Text style={styles.appName}>Network Monitor</Text>
                <Text style={styles.appVersion}>Version 1.0.0</Text>
                <Text style={styles.appDescription}>
                  Advanced network tracking with 4G/5G/WiFi monitoring
                </Text>
              </View>
            </View>
          </BlurView>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0715',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerBlur: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0.3)',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
    marginBottom: 12,
    marginLeft: 4,
  },
  sectionBlur: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0.3)',
  },
  sectionContent: {
    backgroundColor: 'rgba(124, 58, 237, 0.08)',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  settingItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(124, 58, 237, 0.15)',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  settingRight: {
    marginLeft: 12,
  },
  appInfo: {
    marginBottom: 20,
  },
  appInfoBlur: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0.3)',
  },
  appInfoContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    gap: 16,
  },
  appLogo: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: 'rgba(124, 58, 237, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0.4)',
  },
  appLogoText: {
    fontSize: 28,
  },
  appDetails: {
    flex: 1,
  },
  appName: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
    marginBottom: 4,
  },
  appVersion: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 8,
  },
  appDescription: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.6)',
    lineHeight: 18,
  },
});
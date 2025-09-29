import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Pressable,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import {
  Signal,
  Download,
  Upload,
  Smartphone,
  AlertTriangle,
  TrendingUp,
  Clock,
  Zap,
} from 'lucide-react-native';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

interface NetworkStats {
  fourGUsage: string;
  fiveGUsage: string;
  wifiUsage: string;
  totalUsage: string;
  downloadSpeed: string;
  uploadSpeed: string;
  signal: number;
  currentNetwork: '4G' | '5G' | 'WiFi';
  activeApps: number;
  dailyLimit: string;
  monthlyUsed: string;
}

export default function Dashboard() {
  const [networkStats, setNetworkStats] = useState<NetworkStats>({
    fourGUsage: '1.2 GB',
    fiveGUsage: '890 MB',
    wifiUsage: '3.1 GB',
    totalUsage: '5.19 GB',
    downloadSpeed: '45.2 Mbps',
    uploadSpeed: '12.8 Mbps',
    signal: 85,
    currentNetwork: '5G',
    activeApps: 12,
    dailyLimit: '500 MB',
    monthlyUsed: '15.2 GB',
  });

  const [selectedMode, setSelectedMode] = useState<'4G' | '5G' | 'WiFi' | 'All'>('All');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getSignalColor = (signal: number) => {
    if (signal >= 80) return '#10B981';
    if (signal >= 50) return '#F59E0B';
    return '#EF4444';
  };

  const getNetworkTypeColor = (type: string) => {
    switch (type) {
      case '5G': return '#7C3AED';
      case '4G': return '#2563EB';
      case 'WiFi': return '#059669';
      default: return '#6B7280';
    }
  };

  const getModeData = () => {
    switch (selectedMode) {
      case '4G': return { usage: networkStats.fourGUsage, color: '#2563EB' };
      case '5G': return { usage: networkStats.fiveGUsage, color: '#7C3AED' };
      case 'WiFi': return { usage: networkStats.wifiUsage, color: '#059669' };
      default: return { usage: networkStats.totalUsage, color: '#7C3AED' };
    }
  };
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
            <View>
              <Text style={styles.headerTitle}>Network Monitor</Text>
              <Text style={styles.headerSubtitle}>Real-time tracking</Text>
            </View>
            <View style={styles.timeContainer}>
              <Clock size={16} color="#7C3AED" />
              <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
            </View>
          </View>
        </BlurView>
      </Animated.View>

      {/* Mode Selector */}
      <Animated.View entering={FadeInDown.delay(150)} style={styles.modeSelector}>
        <BlurView intensity={15} style={styles.modeSelectorBlur}>
          <View style={styles.modeSelectorContent}>
            {(['All', '4G', '5G', 'WiFi'] as const).map((mode) => (
              <Pressable
                key={mode}
                onPress={() => setSelectedMode(mode)}
                style={[
                  styles.modeButton,
                  selectedMode === mode && styles.modeButtonActive
                ]}
              >
                <Text style={[
                  styles.modeButtonText,
                  selectedMode === mode && styles.modeButtonTextActive
                ]}>
                  {mode}
                </Text>
              </Pressable>
            ))}
          </View>
        </BlurView>
      </Animated.View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Network Status Cards */}
        <View style={styles.statusGrid}>
          <Animated.View entering={FadeInDown.delay(200)} style={styles.statusCard}>
            <BlurView intensity={15} style={styles.cardBlur}>
              <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                  <Signal size={24} color="#7C3AED" />
                  <Text style={styles.cardTitle}>Signal</Text>
                </View>
                <Text style={styles.cardValue}>{networkStats.signal}%</Text>
                <View style={styles.signalBar}>
                  <View 
                    style={[
                      styles.signalFill, 
                      { 
                        width: `${networkStats.signal}%`,
                        backgroundColor: getSignalColor(networkStats.signal)
                      }
                    ]} 
                  />
                </View>
              </View>
            </BlurView>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(300)} style={styles.statusCard}>
            <BlurView intensity={15} style={styles.cardBlur}>
              <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                  <Zap size={24} color={getNetworkTypeColor(networkStats.currentNetwork)} />
                  <Text style={styles.cardTitle}>Network</Text>
                </View>
                <Text style={styles.cardValue}>{networkStats.currentNetwork}</Text>
                <Text style={styles.cardSubtext}>Ultra Fast</Text>
              </View>
            </BlurView>
          </Animated.View>
        </View>

        {/* Speed Cards */}
        <View style={styles.speedGrid}>
          <Animated.View entering={FadeInRight.delay(400)} style={styles.speedCard}>
            <BlurView intensity={15} style={styles.cardBlur}>
              <View style={styles.cardContent}>
                <Download size={20} color="#10B981" />
                <Text style={styles.speedLabel}>Download</Text>
                <Text style={styles.speedValue}>{networkStats.downloadSpeed}</Text>
              </View>
            </BlurView>
          </Animated.View>

          <Animated.View entering={FadeInRight.delay(500)} style={styles.speedCard}>
            <BlurView intensity={15} style={styles.cardBlur}>
              <View style={styles.cardContent}>
                <Upload size={20} color="#F59E0B" />
                <Text style={styles.speedLabel}>Upload</Text>
                <Text style={styles.speedValue}>{networkStats.uploadSpeed}</Text>
              </View>
            </BlurView>
          </Animated.View>
        </View>

        {/* Network Usage by Type */}
        <Animated.View entering={FadeInDown.delay(550)} style={styles.networkUsageCard}>
          <BlurView intensity={15} style={styles.cardBlur}>
            <View style={styles.networkUsageContent}>
              <Text style={styles.networkUsageTitle}>Data Usage by Network</Text>
              <View style={styles.networkUsageGrid}>
                <View style={styles.networkUsageItem}>
                  <View style={[styles.networkUsageIcon, { backgroundColor: 'rgba(37, 99, 235, 0.2)' }]}>
                    <Radio size={20} color="#2563EB" />
                  </View>
                  <Text style={styles.networkUsageLabel}>4G</Text>
                  <Text style={styles.networkUsageValue}>{networkStats.fourGUsage}</Text>
                </View>
                <View style={styles.networkUsageItem}>
                  <View style={[styles.networkUsageIcon, { backgroundColor: 'rgba(124, 58, 237, 0.2)' }]}>
                    <Radio size={20} color="#7C3AED" />
                  </View>
                  <Text style={styles.networkUsageLabel}>5G</Text>
                  <Text style={styles.networkUsageValue}>{networkStats.fiveGUsage}</Text>
                </View>
                <View style={styles.networkUsageItem}>
                  <View style={[styles.networkUsageIcon, { backgroundColor: 'rgba(5, 150, 105, 0.2)' }]}>
                    <Wifi size={20} color="#059669" />
                  </View>
                  <Text style={styles.networkUsageLabel}>WiFi</Text>
                  <Text style={styles.networkUsageValue}>{networkStats.wifiUsage}</Text>
                </View>
              </View>
            </View>
          </BlurView>
        </Animated.View>

        {/* Current Mode Usage */}
        <Animated.View entering={FadeInDown.delay(600)} style={styles.usageCard}>
          <BlurView intensity={15} style={styles.cardBlur}>
            <View style={styles.usageContent}>
              <View style={styles.usageHeader}>
                <TrendingUp size={24} color={getModeData().color} />
                <Text style={styles.usageTitle}>{selectedMode} Usage</Text>
              </View>
              
              <View style={styles.usageStats}>
                <View style={styles.usageStat}>
                  <Text style={styles.usageLabel}>Current</Text>
                  <Text style={styles.usageValue}>{getModeData().usage}</Text>
                </View>
                <View style={styles.usageStat}>
                  <Text style={styles.usageLabel}>Total</Text>
                  <Text style={styles.usageValue}>{networkStats.totalUsage}</Text>
                </View>
                <View style={styles.usageStat}>
                  <Text style={styles.usageLabel}>Monthly</Text>
                  <Text style={styles.usageValue}>{networkStats.monthlyUsed}</Text>
                </View>
              </View>

              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { backgroundColor: getModeData().color }]} />
              </View>
              <Text style={styles.progressText}>68% of monthly data used</Text>
            </View>
          </BlurView>
        </Animated.View>

        {/* Quick Actions */}
        <Animated.View entering={FadeInDown.delay(700)} style={styles.actionsCard}>
          <BlurView intensity={15} style={styles.cardBlur}>
            <View style={styles.actionsContent}>
              <Text style={styles.actionsTitle}>Quick Actions</Text>
              <View style={styles.actionButtons}>
                <Pressable style={styles.actionButton}>
                  <Smartphone size={20} color="#7C3AED" />
                  <Text style={styles.actionText}>App Usage</Text>
                </Pressable>
                <Pressable style={styles.actionButton}>
                  <AlertTriangle size={20} color="#F59E0B" />
                  <Text style={styles.actionText}>Set Alerts</Text>
                </Pressable>
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
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timeText: {
    fontSize: 16,
    color: '#7C3AED',
    fontWeight: '600',
  },
  modeSelector: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  modeSelectorBlur: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0.3)',
  },
  modeSelectorContent: {
    flexDirection: 'row',
    padding: 4,
  },
  modeButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  modeButtonActive: {
    backgroundColor: 'rgba(124, 58, 237, 0.3)',
  },
  modeButtonText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '600',
  },
  modeButtonTextActive: {
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  statusGrid: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 20,
  },
  statusCard: {
    flex: 1,
  },
  cardBlur: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0.3)',
  },
  cardContent: {
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
  cardValue: {
    fontSize: 28,
    color: '#FFFFFF',
    fontWeight: '700',
    marginBottom: 8,
  },
  cardSubtext: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  signalBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  signalFill: {
    height: '100%',
    borderRadius: 2,
  },
  speedGrid: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 20,
  },
  speedCard: {
    flex: 1,
  },
  speedLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 8,
    marginBottom: 4,
  },
  speedValue: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  networkUsageCard: {
    marginBottom: 20,
  },
  networkUsageContent: {
    padding: 20,
  },
  networkUsageTitle: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
    marginBottom: 16,
  },
  networkUsageGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  networkUsageItem: {
    alignItems: 'center',
    flex: 1,
  },
  networkUsageIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  networkUsageLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 4,
  },
  networkUsageValue: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  usageCard: {
    marginBottom: 20,
  },
  usageContent: {
    padding: 20,
  },
  usageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  usageTitle: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  usageStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  usageStat: {
    alignItems: 'center',
  },
  usageLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 4,
  },
  usageValue: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 3,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    width: '68%',
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
  },
  actionsCard: {
    marginBottom: 20,
  },
  actionsContent: {
    padding: 20,
  },
  actionsTitle: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 15,
  },
  actionButton: {
    flex: 1,
    backgroundColor: 'rgba(124, 58, 237, 0.2)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0.4)',
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
});
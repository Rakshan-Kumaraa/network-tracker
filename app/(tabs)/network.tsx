import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import {
  Wifi,
  Radio,
  Globe,
  Zap,
  MapPin,
  Router,
  Shield,
  Activity,
} from 'lucide-react-native';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';

interface NetworkInfo {
  type: 'WiFi' | '4G' | '5G';
  name: string;
  signal: number;
  frequency: string;
  ip: string;
  dns: string;
  gateway: string;
  speed: {
    download: number;
    upload: number;
  };
  latency: number;
  location: string;
  provider: string;
}

interface SpeedTestResult {
  download: number;
  upload: number;
  ping: number;
  jitter: number;
  server: string;
}

export default function Network() {
  const [networkInfo, setNetworkInfo] = useState<NetworkInfo>({
    type: '5G',
    name: 'Vodafone 5G',
    signal: 87,
    frequency: '3.5 GHz',
    ip: '192.168.1.105',
    dns: '8.8.8.8',
    gateway: '192.168.1.1',
    speed: { download: 45.2, upload: 12.8 },
    latency: 18,
    location: 'Mumbai, India',
    provider: 'Vodafone Idea',
  });

  const [isSpeedTesting, setIsSpeedTesting] = useState(false);
  const [speedTestResult, setSpeedTestResult] = useState<SpeedTestResult | null>(null);

  const runSpeedTest = () => {
    setIsSpeedTesting(true);
    
    // Simulate speed test
    setTimeout(() => {
      setSpeedTestResult({
        download: Math.random() * 50 + 20,
        upload: Math.random() * 15 + 5,
        ping: Math.random() * 30 + 10,
        jitter: Math.random() * 5 + 1,
        server: 'Mumbai Server',
      });
      setIsSpeedTesting(false);
    }, 3000);
  };

  const getSignalColor = (signal: number) => {
    if (signal >= 80) return '#10B981';
    if (signal >= 50) return '#F59E0B';
    return '#EF4444';
  };

  const getNetworkTypeColor = (type: string) => {
    switch (type) {
      case '5G': return '#8B5CF6';
      case '4G': return '#3B82F6';
      case 'WiFi': return '#10B981';
      default: return '#6B7280';
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
            <View style={styles.headerLeft}>
              <Wifi size={28} color="#7C3AED" />
              <View>
                <Text style={styles.headerTitle}>Network</Text>
                <Text style={styles.headerSubtitle}>Connection details</Text>
              </View>
            </View>
            <View style={styles.connectionStatus}>
              <View style={[styles.statusDot, { backgroundColor: getSignalColor(networkInfo.signal) }]} />
              <Text style={styles.statusText}>Connected</Text>
            </View>
          </View>
        </BlurView>
      </Animated.View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Current Connection */}
        <Animated.View entering={FadeInDown.delay(200)} style={styles.connectionCard}>
          <BlurView intensity={15} style={styles.cardBlur}>
            <View style={styles.connectionContent}>
              <View style={styles.connectionHeader}>
                <View style={styles.networkTypeContainer}>
                  <Radio size={24} color={getNetworkTypeColor(networkInfo.type)} />
                  <View>
                    <Text style={styles.networkType}>{networkInfo.type}</Text>
                    <Text style={styles.networkName}>{networkInfo.name}</Text>
                  </View>
                </View>
                <View style={styles.signalContainer}>
                  <Text style={styles.signalText}>{networkInfo.signal}%</Text>
                  <View style={styles.signalBars}>
                    {[1, 2, 3, 4].map((bar) => (
                      <View
                        key={bar}
                        style={[
                          styles.signalBar,
                          {
                            height: bar * 4,
                            backgroundColor: bar <= (networkInfo.signal / 25) 
                              ? getSignalColor(networkInfo.signal) 
                              : 'rgba(255, 255, 255, 0.2)'
                          }
                        ]}
                      />
                    ))}
                  </View>
                </View>
              </View>

              <View style={styles.connectionDetails}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Frequency</Text>
                  <Text style={styles.detailValue}>{networkInfo.frequency}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Provider</Text>
                  <Text style={styles.detailValue}>{networkInfo.provider}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Location</Text>
                  <Text style={styles.detailValue}>{networkInfo.location}</Text>
                </View>
              </View>
            </View>
          </BlurView>
        </Animated.View>

        {/* Speed Test */}
        <Animated.View entering={FadeInDown.delay(300)} style={styles.speedTestCard}>
          <BlurView intensity={15} style={styles.cardBlur}>
            <View style={styles.speedTestContent}>
              <View style={styles.speedTestHeader}>
                <Zap size={24} color="#7C3AED" />
                <Text style={styles.speedTestTitle}>Speed Test</Text>
                <Pressable 
                  onPress={runSpeedTest} 
                  disabled={isSpeedTesting}
                  style={[
                    styles.speedTestButton,
                    isSpeedTesting && styles.speedTestButtonDisabled
                  ]}
                >
                  <Text style={styles.speedTestButtonText}>
                    {isSpeedTesting ? 'Testing...' : 'Start Test'}
                  </Text>
                </Pressable>
              </View>

              {speedTestResult && (
                <View style={styles.speedResults}>
                  <View style={styles.speedResultItem}>
                    <Text style={styles.speedResultLabel}>Download</Text>
                    <Text style={styles.speedResultValue}>
                      {speedTestResult.download.toFixed(1)} Mbps
                    </Text>
                  </View>
                  <View style={styles.speedResultItem}>
                    <Text style={styles.speedResultLabel}>Upload</Text>
                    <Text style={styles.speedResultValue}>
                      {speedTestResult.upload.toFixed(1)} Mbps
                    </Text>
                  </View>
                  <View style={styles.speedResultItem}>
                    <Text style={styles.speedResultLabel}>Ping</Text>
                    <Text style={styles.speedResultValue}>
                      {speedTestResult.ping.toFixed(0)} ms
                    </Text>
                  </View>
                  <View style={styles.speedResultItem}>
                    <Text style={styles.speedResultLabel}>Jitter</Text>
                    <Text style={styles.speedResultValue}>
                      {speedTestResult.jitter.toFixed(1)} ms
                    </Text>
                  </View>
                </View>
              )}

              {isSpeedTesting && (
                <View style={styles.testingIndicator}>
                  <View style={styles.testingBar}>
                    <Animated.View style={styles.testingProgress} />
                  </View>
                  <Text style={styles.testingText}>Measuring connection speed...</Text>
                </View>
              )}
            </View>
          </BlurView>
        </Animated.View>

        {/* Network Details */}
        <View style={styles.detailsGrid}>
          <Animated.View entering={FadeInRight.delay(400)} style={styles.detailCard}>
            <BlurView intensity={15} style={styles.cardBlur}>
              <View style={styles.detailCardContent}>
                <Globe size={20} color="#3B82F6" />
                <Text style={styles.detailCardLabel}>IP Address</Text>
                <Text style={styles.detailCardValue}>{networkInfo.ip}</Text>
              </View>
            </BlurView>
          </Animated.View>

          <Animated.View entering={FadeInRight.delay(500)} style={styles.detailCard}>
            <BlurView intensity={15} style={styles.cardBlur}>
              <View style={styles.detailCardContent}>
                <Shield size={20} color="#10B981" />
                <Text style={styles.detailCardLabel}>DNS</Text>
                <Text style={styles.detailCardValue}>{networkInfo.dns}</Text>
              </View>
            </BlurView>
          </Animated.View>

          <Animated.View entering={FadeInRight.delay(600)} style={styles.detailCard}>
            <BlurView intensity={15} style={styles.cardBlur}>
              <View style={styles.detailCardContent}>
                <Router size={20} color="#F59E0B" />
                <Text style={styles.detailCardLabel}>Gateway</Text>
                <Text style={styles.detailCardValue}>{networkInfo.gateway}</Text>
              </View>
            </BlurView>
          </Animated.View>

          <Animated.View entering={FadeInRight.delay(700)} style={styles.detailCard}>
            <BlurView intensity={15} style={styles.cardBlur}>
              <View style={styles.detailCardContent}>
                <Activity size={20} color="#EF4444" />
                <Text style={styles.detailCardLabel}>Latency</Text>
                <Text style={styles.detailCardValue}>{networkInfo.latency} ms</Text>
              </View>
            </BlurView>
          </Animated.View>
        </View>

        {/* Network Quality */}
        <Animated.View entering={FadeInDown.delay(800)} style={styles.qualityCard}>
          <BlurView intensity={15} style={styles.cardBlur}>
            <View style={styles.qualityContent}>
              <Text style={styles.qualityTitle}>Network Quality</Text>
              <View style={styles.qualityMetrics}>
                <View style={styles.qualityMetric}>
                  <Text style={styles.qualityMetricLabel}>Stability</Text>
                  <View style={styles.qualityBar}>
                    <View style={[styles.qualityBarFill, { width: '92%', backgroundColor: '#10B981' }]} />
                  </View>
                  <Text style={styles.qualityMetricValue}>Excellent</Text>
                </View>

                <View style={styles.qualityMetric}>
                  <Text style={styles.qualityMetricLabel}>Coverage</Text>
                  <View style={styles.qualityBar}>
                    <View style={[styles.qualityBarFill, { width: '87%', backgroundColor: '#10B981' }]} />
                  </View>
                  <Text style={styles.qualityMetricValue}>Very Good</Text>
                </View>

                <View style={styles.qualityMetric}>
                  <Text style={styles.qualityMetricLabel}>Performance</Text>
                  <View style={styles.qualityBar}>
                    <View style={[styles.qualityBarFill, { width: '78%', backgroundColor: '#F59E0B' }]} />
                  </View>
                  <Text style={styles.qualityMetricValue}>Good</Text>
                </View>
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
  connectionStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  connectionCard: {
    marginBottom: 20,
  },
  cardBlur: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0.3)',
  },
  connectionContent: {
    padding: 20,
  },
  connectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  networkTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  networkType: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  networkName: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  signalContainer: {
    alignItems: 'center',
    gap: 8,
  },
  signalText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  signalBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2,
  },
  signalBar: {
    width: 4,
    borderRadius: 2,
  },
  connectionDetails: {
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  detailValue: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  speedTestCard: {
    marginBottom: 20,
  },
  speedTestContent: {
    padding: 20,
  },
  speedTestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  speedTestTitle: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
    flex: 1,
    marginLeft: 12,
  },
  speedTestButton: {
    backgroundColor: 'rgba(124, 58, 237, 0.3)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0.5)',
  },
  speedTestButtonDisabled: {
    opacity: 0.5,
  },
  speedTestButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  speedResults: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  speedResultItem: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0.3)',
  },
  speedResultLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 4,
  },
  speedResultValue: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  testingIndicator: {
    alignItems: 'center',
    gap: 12,
  },
  testingBar: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  testingProgress: {
    height: '100%',
    width: '60%',
    backgroundColor: '#7C3AED',
    borderRadius: 2,
  },
  testingText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  detailCard: {
    width: '48%',
  },
  detailCardContent: {
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  detailCardLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  detailCardValue: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'center',
  },
  qualityCard: {
    marginBottom: 20,
  },
  qualityContent: {
    padding: 20,
  },
  qualityTitle: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
    marginBottom: 16,
  },
  qualityMetrics: {
    gap: 16,
  },
  qualityMetric: {
    gap: 8,
  },
  qualityMetricLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  qualityBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  qualityBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  qualityMetricValue: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
  },
});
import React, { useState } from 'react';
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
  BarChart3,
  Calendar,
  TrendingUp,
  TrendingDown,
  Smartphone,
  Wifi,
  Radio,
} from 'lucide-react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

interface DataPoint {
  day: string;
  fourG: number;
  fiveG: number;
  wifi: number;
}

const mockData: DataPoint[] = [
  { day: 'Mon', fourG: 120, fiveG: 200, wifi: 450 },
  { day: 'Tue', fourG: 180, fiveG: 280, wifi: 320 },
  { day: 'Wed', fourG: 90, fiveG: 350, wifi: 280 },
  { day: 'Thu', fourG: 160, fiveG: 180, wifi: 380 },
  { day: 'Fri', fourG: 220, fiveG: 420, wifi: 150 },
  { day: 'Sat', fourG: 300, fiveG: 180, wifi: 620 },
  { day: 'Sun', fourG: 250, fiveG: 320, wifi: 580 },
];

export default function Analytics() {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('week');

  const maxValue = Math.max(...mockData.map(d => d.fourG + d.fiveG + d.wifi));
  
  const totalUsage = mockData.reduce((acc, curr) => ({
    fourG: acc.fourG + curr.fourG,
    fiveG: acc.fiveG + curr.fiveG,
    wifi: acc.wifi + curr.wifi,
  }), { fourG: 0, fiveG: 0, wifi: 0 });

  const formatBytes = (mb: number) => {
    if (mb >= 1000) return `${(mb / 1000).toFixed(1)} GB`;
    return `${mb} MB`;
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={['#1A0B2E', '#2D1B69', '#4C1D95']}
        style={styles.gradient}
      />
      
      {/* Header */}
      <Animated.View entering={FadeInUp.delay(100)} style={styles.header}>
        <BlurView intensity={20} style={styles.headerBlur}>
          <View style={styles.headerContent}>
            <View style={styles.headerLeft}>
              <BarChart3 size={28} color="#A855F7" />
              <View>
                <Text style={styles.headerTitle}>Analytics</Text>
                <Text style={styles.headerSubtitle}>Data usage insights</Text>
              </View>
            </View>
            <View style={styles.periodSelector}>
              {(['week', 'month', 'year'] as const).map((period) => (
                <Pressable
                  key={period}
                  onPress={() => setSelectedPeriod(period)}
                  style={[
                    styles.periodButton,
                    selectedPeriod === period && styles.periodButtonActive
                  ]}
                >
                  <Text style={[
                    styles.periodText,
                    selectedPeriod === period && styles.periodTextActive
                  ]}>
                    {period.charAt(0).toUpperCase() + period.slice(1)}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </BlurView>
      </Animated.View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Usage Summary Cards */}
        <View style={styles.summaryGrid}>
          <Animated.View entering={FadeInDown.delay(200)} style={styles.summaryCard}>
            <BlurView intensity={15} style={styles.cardBlur}>
              <View style={styles.cardContent}>
                <Radio size={20} color="#3B82F6" />
                <Text style={styles.summaryLabel}>4G Usage</Text>
                <Text style={styles.summaryValue}>{formatBytes(totalUsage.fourG)}</Text>
                <View style={styles.trendContainer}>
                  <TrendingUp size={14} color="#10B981" />
                  <Text style={styles.trendText}>+12%</Text>
                </View>
              </View>
            </BlurView>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(300)} style={styles.summaryCard}>
            <BlurView intensity={15} style={styles.cardBlur}>
              <View style={styles.cardContent}>
                <Radio size={20} color="#8B5CF6" />
                <Text style={styles.summaryLabel}>5G Usage</Text>
                <Text style={styles.summaryValue}>{formatBytes(totalUsage.fiveG)}</Text>
                <View style={styles.trendContainer}>
                  <TrendingUp size={14} color="#10B981" />
                  <Text style={styles.trendText}>+28%</Text>
                </View>
              </View>
            </BlurView>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(400)} style={styles.summaryCard}>
            <BlurView intensity={15} style={styles.cardBlur}>
              <View style={styles.cardContent}>
                <Wifi size={20} color="#10B981" />
                <Text style={styles.summaryLabel}>WiFi Usage</Text>
                <Text style={styles.summaryValue}>{formatBytes(totalUsage.wifi)}</Text>
                <View style={styles.trendContainer}>
                  <TrendingDown size={14} color="#EF4444" />
                  <Text style={[styles.trendText, { color: '#EF4444' }]}>-5%</Text>
                </View>
              </View>
            </BlurView>
          </Animated.View>
        </View>

        {/* Chart */}
        <Animated.View entering={FadeInDown.delay(500)} style={styles.chartCard}>
          <BlurView intensity={15} style={styles.cardBlur}>
            <View style={styles.chartContent}>
              <View style={styles.chartHeader}>
                <Text style={styles.chartTitle}>Daily Usage Breakdown</Text>
                <View style={styles.legend}>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendColor, { backgroundColor: '#3B82F6' }]} />
                    <Text style={styles.legendText}>4G</Text>
                  </View>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendColor, { backgroundColor: '#8B5CF6' }]} />
                    <Text style={styles.legendText}>5G</Text>
                  </View>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendColor, { backgroundColor: '#10B981' }]} />
                    <Text style={styles.legendText}>WiFi</Text>
                  </View>
                </View>
              </View>
              
              <View style={styles.chart}>
                {mockData.map((item, index) => {
                  const total = item.fourG + item.fiveG + item.wifi;
                  const height = (total / maxValue) * 120;
                  
                  return (
                    <View key={item.day} style={styles.chartColumn}>
                      <View style={[styles.chartBar, { height }]}>
                        <View style={[
                          styles.chartSegment,
                          { 
                            height: `${(item.wifi / total) * 100}%`,
                            backgroundColor: '#10B981'
                          }
                        ]} />
                        <View style={[
                          styles.chartSegment,
                          { 
                            height: `${(item.fiveG / total) * 100}%`,
                            backgroundColor: '#8B5CF6'
                          }
                        ]} />
                        <View style={[
                          styles.chartSegment,
                          { 
                            height: `${(item.fourG / total) * 100}%`,
                            backgroundColor: '#3B82F6'
                          }
                        ]} />
                      </View>
                      <Text style={styles.chartLabel}>{item.day}</Text>
                    </View>
                  );
                })}
              </View>
            </View>
          </BlurView>
        </Animated.View>

        {/* Insights */}
        <Animated.View entering={FadeInDown.delay(600)} style={styles.insightsCard}>
          <BlurView intensity={15} style={styles.cardBlur}>
            <View style={styles.insightsContent}>
              <Text style={styles.insightsTitle}>Smart Insights</Text>
              <View style={styles.insightsList}>
                <View style={styles.insight}>
                  <View style={styles.insightIcon}>
                    <TrendingUp size={16} color="#10B981" />
                  </View>
                  <View style={styles.insightText}>
                    <Text style={styles.insightTitle}>5G Usage Growing</Text>
                    <Text style={styles.insightDescription}>
                      Your 5G usage increased by 28% this week
                    </Text>
                  </View>
                </View>
                
                <View style={styles.insight}>
                  <View style={styles.insightIcon}>
                    <Calendar size={16} color="#F59E0B" />
                  </View>
                  <View style={styles.insightText}>
                    <Text style={styles.insightTitle}>Weekend Peak</Text>
                    <Text style={styles.insightDescription}>
                      Highest usage occurs on weekends
                    </Text>
                  </View>
                </View>

                <View style={styles.insight}>
                  <View style={styles.insightIcon}>
                    <Wifi size={16} color="#8B5CF6" />
                  </View>
                  <View style={styles.insightText}>
                    <Text style={styles.insightTitle}>WiFi Preference</Text>
                    <Text style={styles.insightDescription}>
                      52% of your data usage is on WiFi
                    </Text>
                  </View>
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
    borderColor: 'rgba(139, 92, 246, 0.2)',
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
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderRadius: 12,
    padding: 4,
  },
  periodButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  periodButtonActive: {
    backgroundColor: 'rgba(139, 92, 246, 0.3)',
  },
  periodText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '500',
  },
  periodTextActive: {
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  summaryGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  summaryCard: {
    flex: 1,
  },
  cardBlur: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
  },
  cardContent: {
    padding: 16,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 8,
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '700',
    marginBottom: 8,
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendText: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '600',
  },
  chartCard: {
    marginBottom: 20,
  },
  chartContent: {
    padding: 20,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  legend: {
    flexDirection: 'row',
    gap: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendColor: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 150,
  },
  chartColumn: {
    alignItems: 'center',
    gap: 8,
  },
  chartBar: {
    width: 28,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  chartSegment: {
    width: '100%',
  },
  chartLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  insightsCard: {
    marginBottom: 20,
  },
  insightsContent: {
    padding: 20,
  },
  insightsTitle: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
    marginBottom: 16,
  },
  insightsList: {
    gap: 16,
  },
  insight: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  insightIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  insightText: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
    marginBottom: 4,
  },
  insightDescription: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    lineHeight: 16,
  },
});
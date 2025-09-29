import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import {
  Smartphone,
  Search,
  TrendingUp,
  TrendingDown,
  Clock,
  BarChart2,
  Filter,
} from 'lucide-react-native';
import Animated, { FadeInDown, FadeInLeft } from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';

interface AppUsage {
  name: string;
  icon: string;
  dataUsed: string;
  percentage: number;
  trend: 'up' | 'down';
  trendPercentage: number;
  timeUsed: string;
  category: 'social' | 'streaming' | 'productivity' | 'games' | 'other';
}

const mockApps: AppUsage[] = [
  {
    name: 'YouTube',
    icon: '📺',
    dataUsed: '1.2 GB',
    percentage: 35,
    trend: 'up',
    trendPercentage: 15,
    timeUsed: '2h 45m',
    category: 'streaming',
  },
  {
    name: 'Instagram',
    icon: '📸',
    dataUsed: '890 MB',
    percentage: 25,
    trend: 'up',
    trendPercentage: 8,
    timeUsed: '1h 32m',
    category: 'social',
  },
  {
    name: 'WhatsApp',
    icon: '💬',
    dataUsed: '456 MB',
    percentage: 13,
    trend: 'down',
    trendPercentage: 5,
    timeUsed: '45m',
    category: 'social',
  },
  {
    name: 'Netflix',
    icon: '🎬',
    dataUsed: '2.1 GB',
    percentage: 60,
    trend: 'up',
    trendPercentage: 22,
    timeUsed: '3h 20m',
    category: 'streaming',
  },
  {
    name: 'Spotify',
    icon: '🎵',
    dataUsed: '234 MB',
    percentage: 7,
    trend: 'up',
    trendPercentage: 3,
    timeUsed: '1h 15m',
    category: 'streaming',
  },
  {
    name: 'Chrome',
    icon: '🌐',
    dataUsed: '345 MB',
    percentage: 10,
    trend: 'down',
    trendPercentage: 2,
    timeUsed: '52m',
    category: 'productivity',
  },
];

const categories = ['all', 'social', 'streaming', 'productivity', 'games', 'other'];

export default function Apps() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredApps = mockApps.filter((app) => {
    const matchesCategory = selectedCategory === 'all' || app.category === selectedCategory;
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'social': return '#F59E0B';
      case 'streaming': return '#EF4444';
      case 'productivity': return '#10B981';
      case 'games': return '#8B5CF6';
      default: return '#6B7280';
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={['#1A0B2E', '#2D1B69', '#4C1D95']}
        style={styles.gradient}
      />
      
      {/* Header */}
      <Animated.View entering={FadeInDown.delay(100)} style={styles.header}>
        <BlurView intensity={20} style={styles.headerBlur}>
          <View style={styles.headerContent}>
            <View style={styles.headerLeft}>
              <Smartphone size={28} color="#A855F7" />
              <View>
                <Text style={styles.headerTitle}>App Usage</Text>
                <Text style={styles.headerSubtitle}>Monitor data consumption</Text>
              </View>
            </View>
            <Pressable style={styles.filterButton}>
              <Filter size={20} color="#A855F7" />
            </Pressable>
          </View>
        </BlurView>
      </Animated.View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Search */}
        <Animated.View entering={FadeInDown.delay(200)} style={styles.searchContainer}>
          <BlurView intensity={15} style={styles.searchBlur}>
            <View style={styles.searchContent}>
              <Search size={20} color="rgba(255, 255, 255, 0.6)" />
              <TextInput
                style={styles.searchInput}
                placeholder="Search apps..."
                placeholderTextColor="rgba(255, 255, 255, 0.6)"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </BlurView>
        </Animated.View>

        {/* Categories */}
        <Animated.View entering={FadeInDown.delay(300)} style={styles.categoriesContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categories}
          >
            {categories.map((category) => (
              <Pressable
                key={category}
                onPress={() => setSelectedCategory(category)}
                style={[
                  styles.categoryButton,
                  selectedCategory === category && styles.categoryButtonActive
                ]}
              >
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category && styles.categoryTextActive
                ]}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </Animated.View>

        {/* Stats Summary */}
        <View style={styles.statsGrid}>
          <Animated.View entering={FadeInLeft.delay(400)} style={styles.statCard}>
            <BlurView intensity={15} style={styles.cardBlur}>
              <View style={styles.statContent}>
                <BarChart2 size={20} color="#A855F7" />
                <Text style={styles.statLabel}>Total Apps</Text>
                <Text style={styles.statValue}>{filteredApps.length}</Text>
              </View>
            </BlurView>
          </Animated.View>

          <Animated.View entering={FadeInLeft.delay(500)} style={styles.statCard}>
            <BlurView intensity={15} style={styles.cardBlur}>
              <View style={styles.statContent}>
                <Clock size={20} color="#10B981" />
                <Text style={styles.statLabel}>Screen Time</Text>
                <Text style={styles.statValue}>8h 42m</Text>
              </View>
            </BlurView>
          </Animated.View>
        </View>

        {/* App List */}
        <View style={styles.appsList}>
          {filteredApps.map((app, index) => (
            <Animated.View 
              key={app.name}
              entering={FadeInDown.delay(600 + index * 100)}
              style={styles.appItem}
            >
              <BlurView intensity={15} style={styles.cardBlur}>
                <View style={styles.appContent}>
                  <View style={styles.appLeft}>
                    <View style={styles.appIconContainer}>
                      <Text style={styles.appIcon}>{app.icon}</Text>
                    </View>
                    <View style={styles.appInfo}>
                      <Text style={styles.appName}>{app.name}</Text>
                      <Text style={styles.appCategory}>
                        {app.category.charAt(0).toUpperCase() + app.category.slice(1)}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={styles.appRight}>
                    <View style={styles.appStats}>
                      <Text style={styles.appDataUsed}>{app.dataUsed}</Text>
                      <Text style={styles.appTimeUsed}>{app.timeUsed}</Text>
                    </View>
                    
                    <View style={styles.trendContainer}>
                      {app.trend === 'up' ? (
                        <TrendingUp size={16} color="#10B981" />
                      ) : (
                        <TrendingDown size={16} color="#EF4444" />
                      )}
                      <Text style={[
                        styles.trendText,
                        { color: app.trend === 'up' ? '#10B981' : '#EF4444' }
                      ]}>
                        {app.trend === 'up' ? '+' : '-'}{app.trendPercentage}%
                      </Text>
                    </View>
                  </View>
                </View>
                
                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View 
                      style={[
                        styles.progressFill,
                        { 
                          width: `${app.percentage}%`,
                          backgroundColor: getCategoryColor(app.category)
                        }
                      ]} 
                    />
                  </View>
                  <Text style={styles.progressText}>{app.percentage}% of total</Text>
                </View>
              </BlurView>
            </Animated.View>
          ))}
        </View>

        {filteredApps.length === 0 && (
          <Animated.View entering={FadeInDown.delay(600)} style={styles.emptyState}>
            <BlurView intensity={15} style={styles.cardBlur}>
              <View style={styles.emptyContent}>
                <Smartphone size={48} color="rgba(255, 255, 255, 0.3)" />
                <Text style={styles.emptyTitle}>No apps found</Text>
                <Text style={styles.emptyDescription}>
                  Try adjusting your search or filter criteria
                </Text>
              </View>
            </BlurView>
          </Animated.View>
        )}
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
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  searchContainer: {
    marginBottom: 20,
  },
  searchBlur: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
  },
  searchContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categories: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 4,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
  },
  categoryButtonActive: {
    backgroundColor: 'rgba(139, 92, 246, 0.3)',
    borderColor: 'rgba(139, 92, 246, 0.5)',
  },
  categoryText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
  },
  cardBlur: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
  },
  statContent: {
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  statValue: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  appsList: {
    gap: 12,
  },
  appItem: {
    marginBottom: 4,
  },
  appContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  appLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  appIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appIcon: {
    fontSize: 24,
  },
  appInfo: {
    flex: 1,
  },
  appName: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
    marginBottom: 4,
  },
  appCategory: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  appRight: {
    alignItems: 'flex-end',
    gap: 8,
  },
  appStats: {
    alignItems: 'flex-end',
  },
  appDataUsed: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
    marginBottom: 2,
  },
  appTimeUsed: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600',
  },
  progressContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
  },
  emptyState: {
    marginTop: 40,
  },
  emptyContent: {
    padding: 40,
    alignItems: 'center',
    gap: 12,
  },
  emptyTitle: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  emptyDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
  },
});
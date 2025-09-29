import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Activity, Download, Upload } from 'lucide-react-native';

interface NetworkWidgetProps {
  dataUsage: string;
  downloadSpeed: string;
  uploadSpeed: string;
  networkType: '4G' | '5G' | 'WiFi';
}

export default function NetworkWidget({ 
  dataUsage, 
  downloadSpeed, 
  uploadSpeed, 
  networkType 
}: NetworkWidgetProps) {
  return (
    <View style={styles.widget}>
      <LinearGradient
        colors={['rgba(139, 92, 246, 0.8)', 'rgba(76, 29, 149, 0.9)']}
        style={styles.gradient}
      />
      <BlurView intensity={20} style={styles.blur}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Activity size={16} color="#FFFFFF" />
            <Text style={styles.title}>Network Monitor</Text>
            <Text style={styles.networkType}>{networkType}</Text>
          </View>
          
          <View style={styles.stats}>
            <View style={styles.stat}>
              <Text style={styles.statLabel}>Usage</Text>
              <Text style={styles.statValue}>{dataUsage}</Text>
            </View>
            
            <View style={styles.speeds}>
              <View style={styles.speed}>
                <Download size={12} color="#10B981" />
                <Text style={styles.speedValue}>{downloadSpeed}</Text>
              </View>
              <View style={styles.speed}>
                <Upload size={12} color="#F59E0B" />
                <Text style={styles.speedValue}>{uploadSpeed}</Text>
              </View>
            </View>
          </View>
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  widget: {
    width: 160,
    height: 80,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  blur: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  title: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
    flex: 1,
  },
  networkType: {
    fontSize: 8,
    color: '#A855F7',
    fontWeight: '700',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flex: 1,
  },
  stat: {
    alignItems: 'flex-start',
  },
  statLabel: {
    fontSize: 8,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 2,
  },
  statValue: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  speeds: {
    gap: 2,
  },
  speed: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  speedValue: {
    fontSize: 8,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
  },
});
# Building APK for Network Tracker Pro

## Prerequisites

1. **Install Node.js** (v18 or later)
2. **Install Expo CLI globally**:
   ```bash
   npm install -g @expo/cli
   ```

3. **Install EAS CLI globally**:
   ```bash
   npm install -g eas-cli
   ```

## Method 1: Using EAS Build (Recommended)

### Step 1: Create Expo Account
1. Go to [expo.dev](https://expo.dev) and create an account
2. Login via CLI:
   ```bash
   eas login
   ```

### Step 2: Configure Project
1. Initialize EAS in your project:
   ```bash
   eas build:configure
   ```

2. Update your project ID in `app.json`:
   - Replace `"your-project-id-here"` with your actual Expo project ID

### Step 3: Build APK
```bash
# For development build
eas build --platform android --profile development

# For production APK
eas build --platform android --profile production
```

### Step 4: Download APK
- Once build completes, download the APK from the provided link
- Install on your Android device

## Method 2: Local Build (Alternative)

### Prerequisites for Local Build
1. **Install Android Studio** and set up Android SDK
2. **Set environment variables**:
   ```bash
   export ANDROID_HOME=$HOME/Android/Sdk
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/tools
   export PATH=$PATH:$ANDROID_HOME/tools/bin
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   ```

### Build Steps
1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Prebuild for Android**:
   ```bash
   npx expo prebuild --platform android
   ```

3. **Build APK**:
   ```bash
   cd android
   ./gradlew assembleRelease
   ```

4. **Find APK**:
   - APK will be located at: `android/app/build/outputs/apk/release/app-release.apk`

## Method 3: Expo Development Build

### For Testing During Development
1. **Install Expo Go** on your Android device
2. **Start development server**:
   ```bash
   npm run dev
   ```
3. **Scan QR code** with Expo Go app

## App Features Included

✅ **Real-time Network Monitoring**
- 4G, 5G, and WiFi data segregation
- Live speed testing and network quality monitoring
- Signal strength and connection details

✅ **Advanced Analytics**
- Daily/weekly/monthly usage charts
- Network type breakdown with visual graphs
- Smart insights and usage predictions

✅ **App Usage Tracking**
- Per-app data consumption monitoring
- Category-wise filtering (Social, Streaming, etc.)
- Usage trends and statistics

✅ **Network Diagnostics**
- Connection speed tests
- Network quality metrics
- Latency and jitter measurements

✅ **Material Design UI**
- Dark mode with deep purple theme
- Glass morphism effects with blur
- Smooth animations and transitions
- Material U adaptive theming support

✅ **Smart Features**
- Data usage alerts and limits
- Background monitoring
- Export usage reports
- Widget support ready

## Permissions Required

The app requests these Android permissions:
- `ACCESS_NETWORK_STATE` - Monitor network connections
- `ACCESS_WIFI_STATE` - Access WiFi information
- `INTERNET` - Network connectivity
- `READ_PHONE_STATE` - Access cellular network info

## Troubleshooting

### Common Issues:

1. **Build fails with "Project ID not found"**:
   - Update the project ID in `app.json` with your Expo project ID

2. **Android SDK not found**:
   - Install Android Studio and set up ANDROID_HOME environment variable

3. **Gradle build fails**:
   - Clean gradle cache: `cd android && ./gradlew clean`

4. **Permission denied on gradlew**:
   - Make executable: `chmod +x android/gradlew`

### Performance Optimization:

The app is optimized for performance with:
- Lazy loading of components
- Efficient state management
- Optimized animations using react-native-reanimated
- Proper memory management
- ProGuard enabled for release builds

## Final APK Size
Expected APK size: ~15-25 MB (optimized with ProGuard)

## Support
For issues or questions, refer to:
- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [EAS Build Documentation](https://docs.expo.dev/build/introduction/)
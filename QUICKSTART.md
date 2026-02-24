# Quick Start Guide

## 🚀 Fastest Way to Run (Expo)

### On Windows 11 Desktop (Browser - Mobile View)
```powershell
# Install dependencies
npm install

# Start Expo
npx expo start

# Press 'w' to open in web browser
# Then press F12 → Toggle device toolbar → Select "iPhone 14 Pro"
```

### On iPhone 16 Pro (Physical Device)
```powershell
# 1. Install "Expo Go" from App Store on iPhone
# 2. Start Expo on Windows
npx expo start

# 3. Scan QR code with Expo Go app
# 4. App loads on iPhone instantly! 🎉
```

**No Mac needed! No Xcode needed!**

---

## Development on Windows 11

### Prerequisites
```powershell
# Node.js 18+
node --version

# npm or yarn
npm --version
```

### Installation
```powershell
# Navigate to project
cd "C:\Users\V01935\OneDrive - Telekom Malaysia Berhad\Desktop\Assignment 2"

# Install dependencies
npm install
```

### Run Expo
```powershell
# Start development server
npx expo start

# Options:
# w = web browser
# a = Android emulator  
# i = iOS simulator (Mac only)
# r = reload
# c = clear cache
```

---

## On macOS (for iPhone Testing - Optional)

### Prerequisites
```bash
# Xcode 14+ (only if testing with Xcode)
xcode-select --version
```

### With Expo (Recommended)
```bash
# Install dependencies
npm install

# Start Expo
npx expo start

# Press 'i' for iOS simulator
# Or scan QR code with Expo Go on iPhone
```

### Without Expo (Traditional Method)
```bash
# CocoaPods
pod --version

# If CocoaPods not installed:
sudo gem install cocoapods

# Install iOS dependencies
cd ios
pod install
cd ..

# Run on iPhone 16 Pro
npm run ios
```

---

## Demo Accounts

| Email | Role | Any Password |
|-------|------|--------------|
| superadmin@superapp.com | Super Admin | ✓ |
| admin@superapp.com | Admin | ✓ |
| user@superapp.com | User | ✓ |

---

## Project Structure

```
src/
├── App.tsx                      # Main entry
├── navigation/
│   └── RootNavigator.tsx        # Navigation
├── screens/
│   └── LoginScreen.tsx          # Login
├── miniapps/
│   ├── Dashboard/
│   │   └── DashboardMiniApp.tsx
│   └── Profile/
│       └── ProfileMiniApp.tsx
├── store/
│   ├── index.ts                 # Redux store
│   ├── authSlice.ts             # Auth logic
│   └── hooks.ts                 # Typed hooks
└── types/
    └── auth.types.ts            # Types
```

---

## Common Issues

### Metro bundler won't start
```pExpo won't start
```powershell
# Clear cache
npx expo start -c
```

### Can't connect iPhone to Expo
```powershell
# Make sure same WiFi network
# Or use tunnel mode:
npx expo start --tunnel
```

### Metro bundler won't start
```powershell
npx expo start --reset-cache
```

### Dependencies error
```powershell
rm -rf node_modules
npm install
```

---

## 📱 Mobile View in Browser

**Chrome/Edge:**
1. Open `http://localhost:8081` (after running `npx expo start --web`)
2. Press **F12** (DevTools)
3. Press **Ctrl+Shift+M** (Toggle device toolbar)
4. Select "**iPhone 14 Pro**" from dropdown
5. Refresh page

---

## Documentation

- 📖 [Full README](README.md)
- 🎯 [Expo Setup Guide](EXPO_GUIDE.md) **← Start here for iPhone!**
- 🏗️ [Architecture Guide](ARCHITECTURE.md)
- 📱 [iOS Setup Guide](IOS_SETUP_GUIDE.md) (Traditional metho
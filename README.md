
# Run the server before running the application
     npx react-native start

# In another terminal, run: emulator
     npx react-native run-android
     npx react-native run-ios

# Build app 
     cd android && ./gradlew clean && cd ..    - Очисть кеш (якщо були попередні збірки)
     cd android && ./gradlew assembleRelease   - Збілдити APK (релізна версія)
     cd android && ./gradlew assembleDebug     - Збілдити APK (відлагоджувальна версія)

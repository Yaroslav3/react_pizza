
# Запусти Metro перед тим, як запускати додаток:
    npx react-native start

# В іншому терміналі запусти: эмулятор
     npx react-native run-android
     npx react-native run-ios

#  build app 
     cd android && ./gradlew clean && cd ..    - Очисть кеш (якщо були попередні збірки)
     cd android && ./gradlew assembleRelease   - Збілдити APK (релізна версія)
     cd android && ./gradlew assembleDebug     - Збілдити APK (відлагоджувальна версія)

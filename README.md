
# Запусти Metro перед тим, як запускати додаток:
    npx react-native start

# В іншому терміналі запусти: эмулятор
     npx react-native run-android
     npx react-native run-ios

#  build app 
     cd android && ./gradlew clean && cd ..
     ./gradlew assembleRelease
     ./gradlew assembleDebug

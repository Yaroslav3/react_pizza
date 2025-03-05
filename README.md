## This is a new React Native project, bootstrapped using
     @react-native-community/cli

## Run the server before running the application
     npx react-native start


## Reinstall ios
    cd ios
    pod install
    cd ..

## Reinstall Gradle and clear the cache
    cd android
    ./gradlew clean
    ./gradlew --stop
    ./gradlew build --refresh-dependencies
    cd ..

## In another terminal, run: emulator
     npx react-native run-android
     npx react-native run-ios

## Build app Android
     cd android && ./gradlew assembleRelease   - Build APK (release version)
     cd android && ./gradlew assembleDebug     - Build APK (debug version)

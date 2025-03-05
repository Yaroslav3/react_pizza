import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

// Push notification settings
PushNotification.configure({
    onNotification: function(notification) {
        console.log("Received notification:", notification);
    },
});

const createNotificationChannel = () => {
    PushNotification.createChannel(
        {
            channelId: "default-channel-123",
            channelName: "Default Channel",
            channelDescription: "A channel to categorize your messages",
            playSound: true,
            soundName: "default",
            importance: 4,
            vibrate: true,
        },
        (created) => console.log(`Creating channel: ${created ? "successful" : "already exists"}`)
    );
};


export const firebaseAndroidService = async () => {
    try {
        // Request permission to receive notifications
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            // Call the creation of the channel after launching the application
            createNotificationChannel();
            return await messaging().getToken();
        } else {
            return null;
        }
    } catch (error) {
        console.error('error в firebaseAndroidService:', error);
        return null;
    }
};


// Processing messages in the background
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message received in background:', remoteMessage);

    PushNotification.localNotification({
        channelId: "default-channel-id",
        title: remoteMessage.notification?.title || "message",
        message: remoteMessage.notification?.body || "text",
        bigPictureUrl: remoteMessage.notification?.image || "",
        playSound: true,
        soundName: 'default',
        largeIcon: 'ic_launcher',
        smallIcon: 'ic_notification',
    });
});

// Обробка push-повідомлень у foreground режимі
export const setupForegroundNotifications = () => {
    messaging().onMessage(async remoteMessage => {
        console.log("Foreground message received:", remoteMessage);

        PushNotification.localNotification({
            channelId: "default-channel-123", // Використовуємо правильний канал
            title: remoteMessage.notification?.title || "Нове повідомлення",
            message: remoteMessage.notification?.body || "Текст повідомлення",
            bigPictureUrl: remoteMessage.notification?.image || "",
            playSound: true,
            soundName: "default",
            largeIcon: "ic_launcher",
            smallIcon: "ic_notification",
        });
    });
};

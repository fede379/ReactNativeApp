## How to....

__Instalar react-native y dependencias :)__

- __[desde acá](https://facebook.github.io/react-native/docs/getting-started.html#installing-dependencies-3)__ - all the potatoe en facebook

## Comandos para correr proyecto por primera vez
- npm install
- react-native run-android


## Problemas
### device unauthorized
It's likely that the device is no longer authorized on ADB for whatever reason.

1. Check if authorized:

<ANDROID_SDK_HOME>\platform-tools>adb devices
List of devices attached
4df798d76f98cf6d        unauthorized
2. Revoke USB Debugging on phone

If the device is shown as unauthorized, go to the developer options on the phone and click "Revoke USB debugging authorization" (tested with JellyBean & Samsung GalaxyIII).

3. Restart ADB Server:

Then restarted adb server

adb kill-server
adb start-server
4. Reconnect the device

The device will ask if you are agree to connect the computer id. You need to confirm it.

5. Now Check the device

It is now authorized!

adb devices
<ANDROID_SDK_HOME>\platform-tools>adb devices
List of devices attached
4df798d76f98cf6d        device

___

## si tira error para correr en el celular

This issue helped me resolve the problem in following steps.

(in project directory) mkdir android/app/src/main/assets

react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

react-native run-android


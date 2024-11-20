<p align="center">
  <img src="./assets/images/preview1.png" width=600" title="ui design">
</p>
<p align="center">
  <img src="./assets/images/preview2.png" width=600" title="ui design">
</p>

Chat app that uses <a href="https://firebase.google.com/codelabs/firebase-android#0">Firebase <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAABYElEQVR4Ab3WAUQDURgH8A8ACCAABHLBIACCUBAkgIAgIkEAhIEkgEBAIEAER5ZgAImupYCSAoHD3u5ve3O3P7f/vb0Nf87s/O5777vvnm0ebS80QTe9J9bqJZZFAwXMIcX17VzBz8SWPFZC23MDe6v2AoRR24kOfm3ZHmMVtKWB+t79EFRNLoJ6owjJYoFtARM6VwTx5CLoczgr6Jrm79SWJRB/dI92X+R1lJvvXXNvK0gjtCuBAFzH3DhpkcthPKyiaLapIBDKufU9+rsPNLyBJqvbIOzJg0GV5vVgxw6AUK4JlavE/K0DT7hCgEKVMsgVMpgy+H8cDPIeKlXmZxqodiknDQK7CvigVKksKT5p08E7W2OwhOpNk0uThqcNB1V6TJ0yDPLSZnVL+7HOFfI5Rwd5P3kf/ZhD+NPUEOR3M61i5W7FfuKAhWWMeohyF3ZV5Bkogmv8hkaLf0yMlAG6buWX70J8MQAAAABJRU5ErkJggg==" width="14" alt="firebase logo"></a> to handle messaging, with a very simple authentication process for Sign in and Sign up.

## Run App

    npm install
    npm run start

    # Press I to open iOS simulator
    # Press A to open Android emulator

## Decisions

- Use Expo for easier configurations, installing libraries with the correct versions, better debugging, easier building apk and ipa process, easier use of emulators/simulators, and many other benefits.
- use hooks and a Context to handle auth state.
- use Typescript, and linter + prettier configurations to improve the code quality, readeability and to avoid typing bugs.

## Credits

- This app is based on Nomi's<a href='https://www.youtube.com/watch?v=INxkJno2gIs&list=PLKWMD009Q4qRvrfjGotVfUbqGoLdvRDN4&index=2'> Build a React Native App with Firebase Auth & Chat</a> tutorial <img src='https://yt3.ggpht.com/7-rjEgICXaRN9ISCrklBOD5XNyFjkrlPj1Q8fLdv4uM2WgUuj4Ee3_rwktwJS2jTgRivhx2MsA=s48-c-k-c0x00ffffff-no-rj' width="20" title="ui design" style="border-radius: 50%; vertical-align: middle; border: 2px solid white;">
- <a href='https://expo.dev/'>Expo</a>
- <a href='https://docs.expo.dev/router/installation/'>Expo Router</a>
- <a href='https://www.nativewind.dev/'>NativeWind</a>
- <a href='https://docs.swmansion.com/react-native-reanimated/'>React Native Reanimated</a>
- <a href='https://www.typescriptlang.org/'>Typescript</a>

## Improvement areas

- Unit and E2E testing to be able to test the app without the UI. Using jest and Detox.
- add a profile screen
- maybe improve speed when fetching data
- show some image or text message if there are no users in the Chat List Screen
- add scrollview in case if there are many users

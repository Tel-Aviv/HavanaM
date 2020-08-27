# HavanaM
Havana Mobile adapted for Web

This is Web version of Havana React Native project adapted with help of React-Native-Web.The code of the project is only differs from React Native in authentication part: while mobile version utilizes JWT approach for authentication, this version expoits the build-in Windows authentication (provided by RAP, for example).
The rest of code if mostly same due to the aliasing in webpack.config where the real 'react-native' is substituted by 'react-native-web'
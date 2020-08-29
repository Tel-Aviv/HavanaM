# HavanaM
Havana Mobile adapted for Web

This is a web version of Havana React Native project adapted with help of React-Native-Web.The code of the project is mainly differs from React Native in authentication part: while the mobile version utilizes JWT approach for authentication, this version expoits the build-in Windows authentication (provided by RAP, for example).
The rest of the code if mostly same due to the aliasing in webpack.config where the real 'react-native' is substituted by 'react-native-web'. However, some React-Native componets were replaced due to poor support for web. Notably, 'react-native-calendars' from Wix is brilliant on mobile but miserable on web. This packages was replaced by 'react-datepicker' from HackerOne.
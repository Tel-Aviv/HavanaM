const regeneratorRuntime = require("regenerator-runtime");
import { AppRegistry } from 'react-native';
import App from './App';

AppRegistry.registerComponent("App", () => App);

AppRegistry.runApplication("App", {
    rootTag: document.getElementById('root')
})

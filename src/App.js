import React from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator()

import HomeScreen from './screens/HomeScreen'

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen 
                    name="home"
                    component={HomeScreen}
                    options={{
                        title: 'Home'
                    }}>
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App;
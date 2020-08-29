import React from 'react'

import { getUserFromHtml, getHost, getProtocol, API } from './utils';

import { AuthContext } from "./AuthContext";
import HomeScreen from './screens/HomeScreen'

const App = () => {

    const context = {
        user : getUserFromHtml(),
        host : getHost(),
        protocol: getProtocol(),
        API: API
    }

    return (
        <AuthContext.Provider value={context}>
            <HomeScreen />
        </AuthContext.Provider>
    )
}

export default App;
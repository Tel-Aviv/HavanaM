import React from 'react';
import { Text, View } from 'react-native';

const EditRecord = ({route, navigation}) => {

    return (
        <View>
            <Text>Edit</Text>
            <button onClick={() => navigation.goBack()}>BACK</button>
        </View>
    )
}

export default EditRecord;
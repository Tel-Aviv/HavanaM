import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import moment from 'moment';
import { DatePicker, List } from 'antd-mobile';
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';

const EditRecord = ({route, navigation}) => {

    const [enterTime, setEnterTime] = useState();
    const [exitTime, setExitTime] = useState();

    const item = route.params.item;

    useEffect(() => {
        const _entryTime = moment(item.date + 'T' + item.entry, 'YYYY-MM-DDTHH:mm');
        setEnterTime(_entryTime.toDate());

        const _exitTime = moment(item.date + 'T' + item.exit, 'YYYY-MM-DDTHH:mm');
        setExitTime(_exitTime.toDate());
    }, [route.params.item]);

    return (
        <View>
            <Text>Edit</Text>
            <List className="date-picker-list" style={{ backgroundColor: 'white' }}>
                <DatePicker 
                    value={enterTime}
                    onChange={time => setEnterTime(time)}
                    minuteStep={2}
                    locale={enUs}
                    mode="time"
                    format="HH:mm">
                    <List.Item arrow="horizontal">Entry time</List.Item>
                </DatePicker>
                <DatePicker 
                    value={exitTime}
                    onChange={time => setExitTime(time)}
                    minuteStep={2}
                    locale={enUs}
                    mode="time"
                    format="HH:mm">
                    <List.Item arrow="horizontal">Exit time</List.Item>
                </DatePicker>                   
            </List>
            <button onClick={() => navigation.goBack()}>BACK</button>
        </View>
    )
}

export default EditRecord;
/**
 * @format
 */
import React, {useState, useEffect, useContext, useReducer} from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import Reports from '../tabs/Reports';
import Profile from '../tabs/Profile';
import Notifications from '../tabs/Notifications';

import { AuthContext } from '../AuthContext';
import { DataContext } from '../DataContext';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tabs = createBottomTabNavigator();

const HavanaTabs = (props) => 
    <Tabs.Navigator
        initialRouteName="Reports"
        tabBarOptions={{
            activeTintColor: '#e91e63',
        }}>
        <Tabs.Screen
            name="Reports"
            component={Reports}
            initialParams={props.reportData}
            options={{
                tabBarLabel: 'Reports'
            }}
        />
        <Tabs.Screen
            name="Notifications"
            component={Notifications}
            options={{
              tabBarLabel: 'Inbox',
            }}
        />
        <Tabs.Screen
            name="Profile"
            component={Profile}
            options={{
                tabBarLabel: 'Profile'
            }}
        />              
    </Tabs.Navigator>

const dataReducer = (prevState, action) => {
  switch (action.type) {
    case 'SET_REPORT_DATA':
      return {
        ...prevState,
        reportData: action.data,
      };

    case 'SET_DAYS_OFF':
      return {
        ...prevState,
        daysOff: action.data,
      };

    case 'SET_MANUAL_UPDATES':
      return {
        ...prevState,
        manualUpdates: action.data,
      };

    default:
      return {
        ...prevState,
      };
  }
};

const HomeScreen = (props) => {
  const initialState = {
    reportData: [],
    daysOff: [],
    manualUpdates: [],
  };
  const [reportData, dispatch] = useReducer(dataReducer, initialState);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth(); // + 1;

        let data = [];

        // let response = await authContext.API.get(`/daysoff`, {
        //       params: {
        //         year: year,
        //         month: month
        //     }, 
        //       withCredentials: true
        //     });
        // console.log(response)

        // This sets the mock adapter on the default instance
        // let _axios = axios.create({
        //   baseURL: `http://bizdev01/ps`
        // })
        // const mock = new MockAdapter(_axios);
        // mock.onGet('/daysoff').reply(200, {
        //   "items":[
        //     {
        //         "date":"2020-07-30T00:00:00",
        //         "description":"תשעה באב"
        //     }
        //   ]
        // })
        // let response = await _axios.get("/daysoff");
        // console.log(response.data);
        

        // // Mock any GET request to /users
        // // arguments for reply are (status, data, headers)
        // mock.onGet("/users").reply(200, {
        //   users: [{ id: 1, name: "John Smith" }],
        // });
        // let response = await axios.get("/users");
        // console.log(response.data);

        let respArr = await axios.all([
        //     authContext.API.get(`/daysoff?year=${year}&month=${month}`, { withCredentials: true }),
              authContext.API.get(`/daysoff`, {
                params: {
                  year: year,
                  month: month
              }, 
                withCredentials: true
              }),
        //     // authContext.API.get(`/me/reports/status?month=${month}&year=${year}`, { withCredentials: true }),
              authContext.API.get(`/me/reports`, {
                params: {
                  month: month,
                  year: year
                },
                withCredentials: true 
              }),
        //     // authContext.API.get(`/me/manual_updates?year=${year}&month=${month}`, { withCredentials: true })
                authContext.API.get(`/me/manual_updates`, {
                  params: {
                    year: year,
                    month: month
                  },
                  withCredentials: true 
                })
        ]);
        data = respArr[0].data.items.map(
          (item) => new Date(Date.parse(item.date)),
        );
        dispatch({type: 'SET_DAYS_OFF', data: data});

        data = respArr[2].data.items;
        dispatch({type: 'SET_MANUAL_UPDATES', data: data});

        let reportId = 0;

        if (respArr[1].data) {
          // check report's status

          const savedReportId = respArr[1].data.saveReportId;

          let _resp;
          if (savedReportId) {
            // Interim report found. Actually the following call gets
            // the merged report: saved changes over the original data
            // _resp = await authContext.API.get(`/me/reports/saved?savedReportGuid=${savedReportId}`, { withCredentials: true }
            _resp = await authContext.API.get(`/me/reports/saved`, {
              params: 
              {
                savedReportGuid: savedReportId
              },
              withCredentials: true 
              }
            );
          } else {
            reportId = respArr[1].data.reportId;

            _resp = awaitauthContext.API.get(`/me/reports/${reportId}/updates`, { withCredentials: true },
            );
          }

          data = _resp.data.items.map((item, index) => {
            const _item = {...item, key: index};
            return _item;
          });

          dispatch({type: 'SET_REPORT_DATA', data: data});
        } else {
          // The status of the report is unknown, i.e. get the original report

          const resp = await authContext.API.get(`/me/reports/${year}/${month}`, { withCredentials: true }
          );

          data = resp.data.items.map((item, index) => {
            const _item = {...item, key: index};
            if (reportId === 0) reportId = item.reportId;
            return _item;
          });
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={reportData}>
        <HavanaTabs />
    </DataContext.Provider>
  );
};

export default HomeScreen;


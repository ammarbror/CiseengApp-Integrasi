/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the UI Kitten ciseengapp
 * https://github.com/akveo/react-native-ui-kitten
 *
 * Documentation: https://akveo.github.io/react-native-ui-kitten/docs
 *
 * @format
 */

import React, {useReducer, useEffect, useMemo} from 'react';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
// Theme
import {default as theme} from './custom-theme.json';
// Mapping
import {default as mapping} from './mapping.json';
// Icon
import {EvaIconsPack} from '@ui-kitten/eva-icons';
// Navigation
import {NavigationContainer} from '@react-navigation/native';
import {enableScreens} from 'react-native-screens';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
// Screens
import FirstScreen from './Screens/FirstScreen';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import HomeScreen from './Screens/HomeScreen';
import ListInfoScreen from './Screens/ListInfoScreen';
import ListMenuScreen from './Screens/ListMenuScreen';
import DetailPengajuanScreen from './Screens/DetailPengajuanScreen';
import StepScreen from './Screens/StepScreen';
import ListRiwayatScreen from './Screens/ListRiwayatScreen';
import FormScreen from './Screens/FormScreen';
import UploadScreen from './Screens/UploadScreen';
import ConfirmScreen from './Screens/ConfirmScreen';
import SplashScreen from './Screens/SplashScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from './utils/authContext';
import ProfileScreen from './Screens/ProfileScreen';
import EditFormScreen from './Screens/EditFormScreen';
import EditUploadScreen from './Screens/EditUploadScreen';

enableScreens();
const Stack = createNativeStackNavigator();
/**
 *
 * Use any valid `name` property from eva icons (e.g `github`, or `heart-outline`)
 * https://akveo.github.io/eva-icons
 */

export default () => {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            userToken: null,
            isLoading: false,
          };
      }
    },
    {
      userToken: null,
      isLoading: true,
    },
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem('token');
      } catch (error) {
        console.log(error);
      }
      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    };
    setTimeout(() => {
      bootstrapAsync();
    }, 1500);
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async data => {
        dispatch({type: 'SIGN_IN', token: data});
      },
      signOut: async () => dispatch({type: 'SIGN_OUT'}),
      getToken: () => state.token,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const AuthStack = () => (
    <>
      <Stack.Screen name="First" component={FirstScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </>
  );

  const AppStack = () => (
    <>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Info" component={ListInfoScreen} />
      <Stack.Screen name="ListMenu" component={ListMenuScreen} />
      <Stack.Screen name="Step" component={StepScreen} />
      <Stack.Screen name="DetailPengajuan" component={DetailPengajuanScreen} />
      <Stack.Screen name="ListRiwayat" component={ListRiwayatScreen} />
      <Stack.Screen name="Form" component={FormScreen} />
      <Stack.Screen name="EditForm" component={EditFormScreen} />
      <Stack.Screen name="Upload" component={UploadScreen} />
      <Stack.Screen name="EditUpload" component={EditUploadScreen} />
      <Stack.Screen name="Confirm" component={ConfirmScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </>
  );

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        {...eva}
        theme={{...eva.light, ...theme}}
        customMapping={mapping}>
        <ApplicationProvider {...eva} theme={{...eva.dark, ...theme}}>
          <AuthContext.Provider value={authContext}>
            <NavigationContainer>
              <Stack.Navigator screenOptions={{headerShown: false}}>
                {state.isLoading ? (
                  <Stack.Screen name="Splash" component={SplashScreen} />
                ) : state.userToken ? (
                  AppStack()
                ) : (
                  AuthStack()
                )}
              </Stack.Navigator>
            </NavigationContainer>
          </AuthContext.Provider>
        </ApplicationProvider>
      </ApplicationProvider>
    </>
  );
};

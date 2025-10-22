import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator,CardStyleInterpolators} from '@react-navigation/stack'
import {NativeBaseProvider} from 'native-base'; // is a context provider that wraps your entire app to enable the NativeBase UI library — giving you access to its:
import { RootStackParamList } from './types';
import LoginScreen from '../screens/LoginScreen';
import { login, signup } from '../types/constants';
import SignupScreens from '../screens/SignupScreen';

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () =>{

return(
<NativeBaseProvider>

<NavigationContainer>

    <Stack.Navigator
    screenOptions={{headerShown:false,cardStyleInterpolator:
        CardStyleInterpolators.forHorizontalIOS //controls how the transistion animation looks when navigating between screens
    }}>
    {/* <Stack.Screen name ='Splash' component={SplashScreen}/> */}
    <Stack.Screen name = {login} component={LoginScreen}/>
    <Stack.Screen name ={'signup'} component={SignupScreens}/>

    </Stack.Navigator>

</NavigationContainer>

</NativeBaseProvider>
)};
export default RootNavigator;
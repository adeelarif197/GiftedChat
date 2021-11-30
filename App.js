import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login_Screen from './assets/screens/Login_Screen';
import Signup_Screen from './assets/screens/Signup_Screen';
import Chat_Screen from './assets/screens/Chat_Screen';

const Stack = createNativeStackNavigator();

export default class App extends Component {
	render() {
		return (
			<NavigationContainer>
				<Stack.Navigator screenOptions={{ headerShown: false }}>
					<Stack.Screen name="Login_Screen" component={Login_Screen} />
					<Stack.Screen name="Signup_Screen" component={Signup_Screen} />
					<Stack.Screen name="Chat_Screen" component={Chat_Screen} />
				</Stack.Navigator>
			</NavigationContainer>
		);
	}
}

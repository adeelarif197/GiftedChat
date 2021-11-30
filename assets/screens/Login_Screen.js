import React, { Component, useState } from 'react';
import { Text, View, Image, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from '@react-native-firebase/app'
import firestore from '@react-native-firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class Login_Screen extends Component {

    constructor() {
        super();
        this.state = {
          email: '',
          password: '',
          Pass:'',
          emailError: '',
          isValid: false,
          passwordErrorMessage: '', // password error message
          loading: false,
          authUserID: '',
        };
      }
  
      storeData = async () => {
        try {
          const jsonID = JSON.stringify(this.state.authUserID)
          const jsonEmail = JSON.stringify(this.state.email)
          const jsonPassword = JSON.stringify(this.state.Pass)
    
          await AsyncStorage.setItem('@IDSession', jsonID )
          console.log('SessionID Stored: ', JSON.parse(jsonID))
    
          await AsyncStorage.setItem('@emailSession', jsonEmail )
          console.log('SessionEmail Stored: ', JSON.parse(jsonEmail))
    
          await AsyncStorage.setItem('@passwordSession', jsonPassword )
          console.log('SessionPassword Stored: ', JSON.parse(jsonPassword))
          this.props.navigation.navigate('Chat_Screen')
        } catch (e) {
          // saving error
        }
      }
    
      getFirestorData = () => {
        firestore()
          .collection('Users').where('email', '==', this.state.email).where('password', '==', this.state.Pass.toString())
          .get()
          .then(querySnapshot => {
    
            querySnapshot.forEach(documentSnapshot => {
              console.log('User ID: ', documentSnapshot.id, documentSnapshot.data())
              this.setState({authUserID: documentSnapshot.id})
            })
            
            if (querySnapshot.size == 0) {
              alert('please enter valid credentials')
              console.log('if: ', querySnapshot.size)
            } else {
              
              this.storeData()
              console.log('Total users: ', querySnapshot.size);
            }
          }).catch(err => alert('No Record Found'))

      }
    
      handleValidation = () => {
        const { email, Pass } = this.state;
        if (email == '' || Pass == '') {
          alert('All fields are required');
          return;
        }
        if (email != '' && Pass != '') {
          this.getFirestorData()
        }
        if (Pass.length < 5) {
          alert('password lenght must be 6 charater long');
          return;
        }
      };

	render() {
		return (
			<View style={{ flex: 1, backgroundColor: 'white' }}>
				<View style={{ alignItems: 'center', padding: 10, top: 0 }}>
					<Image style={{ height: '50%', width: '60%' }} source={require('../images/logo2.png')} />
				</View>

				<View style={{ flexDirection: 'row', left: 30, marginTop: -150 }}>
					<Text style={{ fontSize: 20, color: 'black' }}> Please </Text>
					<Text style={{ fontWeight: 'bold', fontSize: 20, color: '#3E87F6' }}>Login</Text>
					<Text style={{ fontSize: 20, color: 'black' }}> to proceed </Text>
				</View>

				<View style={{ left: 35 }}>
					<Text style={{ fontSize: 20, color: 'black' }}>your account</Text>
				</View>

				<View style={{ marginTop: 20 }}>
					<Text style={{ left: 35, top: 25, fontSize: 12, color: 'grey' }}>Enter Email</Text>

					<TextInput
						style={{
							marginHorizontal: 30,
							marginVertical: 30,
							borderRadius: 10,
							backgroundColor: '#FBFBFB',
							flexDirection: 'row'
						}}
                        value={this.state.email}
                        onChangeText={txt => this.setState({ email: txt })}
					/>
					<View style={{}}>
						<MaterialCommunityIcons
							name="email-outline"
							size={20}
							color="grey"
							style={{ alignSelf: 'flex-end', right: '10%', top: -65 }}
						/>
					</View>
				</View>

				<View style={{ bottom: 30 }}>
					<Text style={{ left: 35, top: 25, fontSize: 12, color: 'grey' }}>Enter Password</Text>

					<TextInput
						style={{
							marginHorizontal: 30,
							marginVertical: 30,
							borderRadius: 10,
							backgroundColor: '#FBFBFB',
							flexDirection: 'row'
						}}
                        value={this.state.Pass}
                        onChangeText={txt => this.setState({ Pass: txt })}
					/>
					<View style={{}}>
						<Feather
							name="lock"
							size={20}
							color="grey"
							style={{ alignSelf: 'flex-end', right: '10%', top: -65 }}
						/>
					</View>
				</View>

				<TouchableOpacity onPress={this.handleValidation}>
					<View
						style={{
							bottom: 30,
							padding: 10,
							marginHorizontal: 30,
							justifyContent: 'center',
							alignItems: 'center',
							borderRadius: 10,
							backgroundColor: '#4FC3F7'
						}}
					>
						<Text style={{ color: 'white', fontSize: 25 }}>Login</Text>
					</View>
				</TouchableOpacity>

				<TouchableOpacity onPress={()=>{this.props.navigation.navigate('Signup_Screen')}}>
					<View style={{ justifyContent: 'center', alignItems: 'center' }}>
						<Text style={{ color: 'grey' }}>Not have an account?</Text>
					</View>
				</TouchableOpacity>
			</View>
		);
	}
}

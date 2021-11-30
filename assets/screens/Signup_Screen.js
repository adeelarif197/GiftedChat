import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';

export default class Signup_Screen extends Component {

    constructor() {
        super();
        this.state = {
          Pass: '',
          name:'',
          password: '',
          email: '',
          Text: '',
          phone:'',
        };
      }

      PostDataToFirebase = () => {
        firestore()
          .collection('Users')
          .add({        
            email: this.state.email,
            password: this.state.Pass,
            name: this.state.name,
            phone: this.state.phone,
          })
        
        this.props.navigation.navigate('Chat_Screen')
        alert('SignUp Successfully')
      }
    
      signUpValidation =() => {
        const { email, Pass, } = this.state;
        if (email == '' || Pass == '' ) {
          alert('All fields are required');
          return;
        }
        else if (email != '' && email.includes('@gmail.com') && Pass != '' ) {
          this.PostDataToFirebase()
        }
        // } else if (Pass ){
        //   alert('password lenght must be 8 charaters long');
        //   return;
        // }
        // else if (Pass.length <= 8 ) {
        //   alert('password lenght must be 8 charaters long');
        //   return;
        // }
        else{
          alert('Not a valid email');
          return;
        }
      }

	render() {
		return (
			<View style={{ flex: 1, backgroundColor: 'white' }}>
				<View style={{ alignItems: 'center', padding: 10 }}>
					<Image style={{ height: '40%', width: '40%' }} source={require('../images/logo2.png')} />
				</View>

				<View style={{ flexDirection: 'row', left: 30, marginTop: -150 }}>
					<Text style={{ fontSize: 20, color: 'black' }}> Please </Text>
					<Text style={{ fontWeight: 'bold', fontSize: 20, color: '#3E87F6' }}>Register</Text>
					<Text style={{ fontSize: 20, color: 'black' }}> to proceed </Text>
				</View>

				<View style={{ left: 35 }}>
					<Text style={{ fontSize: 20, color: 'black' }}>your account</Text>
				</View>

				<ScrollView>
					<View style={{ marginTop: 10 }}>
						<Text style={{ left: 35, top: 20, fontSize: 12, color: 'grey' }}>Name</Text>
					</View>
					<View>
						<TextInput
							style={{
								marginHorizontal: 30,
								marginVertical: 20,
								borderRadius: 10,
								backgroundColor: '#FBFBFB',
								flexDirection: 'row'
							}}
                            onChangeText={text =>  this.setState({ name: text })}
						/>
						<View style={{ alignSelf: 'flex-end', right: '10%', top: -55 }}>
							<Feather name="user" size={20} color="grey" />
						</View>
					</View>

					<View style={{}}>
						<Text style={{ left: 35, fontSize: 12, color: 'grey' }}>Email</Text>
					</View>
					<View>
						<TextInput
							style={{
								marginHorizontal: 30,
								marginVertical: 0,
								borderRadius: 10,
								backgroundColor: '#FBFBFB',
								flexDirection: 'row'
							}}
                            onChangeText={text =>  this.setState({ email: text })}
						/>
						<View style={{ alignSelf: 'flex-end', right: '10%', top: -40 }}>
							<MaterialCommunityIcons name="email-outline" size={20} color="grey" />
						</View>
					</View>

					<View style={{}}>
						<Text style={{ left: 35, top: 10, fontSize: 12, color: 'grey' }}>PhoneNo</Text>
					</View>
					<View>
						<TextInput
							style={{
								marginHorizontal: 30,
								marginVertical: 10,
								borderRadius: 10,
								backgroundColor: '#FBFBFB',
								flexDirection: 'row'
							}}
                            onChangeText={text =>  this.setState({ phone: text })}
						/>

						<View style={{ alignSelf: 'flex-end', right: '10%', top: -40 }}>
							<MaterialCommunityIcons name="cellphone-iphone" size={20} color="grey" />
						</View>
					</View>

					<View style={{}}>
						<Text style={{ left: 35, top: 10, fontSize: 12 }}>Password</Text>
					</View>
					<View>
						<TextInput
							style={{
								marginHorizontal: 30,
								marginVertical: 10,
								borderRadius: 10,
								backgroundColor: '#FBFBFB',
								flexDirection: 'row'
							}}
                            onChangeText={txt => this.setState({ Pass: txt })}
						/>
						<View style={{ alignSelf: 'flex-end', right: '10%', top: -40 }}>
							<Feather name="lock" size={20} color="grey" />
						</View>
					</View>
				</ScrollView>

				<TouchableOpacity  onPress={() =>
                  this.signUpValidation()
                }>
					<View
						style={{
							bottom: 20,
							padding: 7,
							marginHorizontal: 30,
							justifyContent: 'center',
							alignItems: 'center',
							borderRadius: 10,
							backgroundColor: '#4FC3F7'
						}}
					>
						<Text style={{ color: 'white', fontSize: 25 }}>SignUp</Text>
					</View>
				</TouchableOpacity>
				<View style={{ marginBottom: 10 }}>
					<TouchableOpacity onPress={()=>{this.props.navigation.navigate('Login_Screen')}}>
						<View style={{ justifyContent: 'center', alignItems: 'center' }}>
							<Text style={{ color: 'grey' }}>Already have an account?</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

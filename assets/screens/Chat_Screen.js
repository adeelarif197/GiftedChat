import React, { Component, useState, useCallback, useEffect,useLayoutEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore'

var userID = ""

export default function Chat_Screen() {
const [ messages, setMessages ] = useState([]);
const [userName, setUserName] = useState('');
const [userEmail, setUserEmail] = useState('');
   

const getData = async () => {
    try {
        const jsonName = await AsyncStorage.getItem('@NameSession')
        const jsonID = await AsyncStorage.getItem('@IDSession')
        const jsonEmail = await AsyncStorage.getItem('@emailSession')
        const jsonPassword = await AsyncStorage.getItem('@passwordSession')

        if (jsonEmail && jsonPassword && jsonID) {
            setUserEmail(jsonEmail);
            userID = JSON.parse(jsonID)
            setUserID(jsonID); 
            setUserName(jsonName);

        }

    } catch (e) {
        // error reading value
    }
}


useEffect(() => {
    getData()
    setTimeout(() => {
        firestore()
            .collection('chats')
            .orderBy('createdAt', 'desc').onSnapshot((snapshot) => {
                setMessages(
                    snapshot.docs.map((doc) => ({
                        _id: doc.data()._id,
                        createdAt: doc.data().createdAt.toDate(),
                        text: doc.data().text,
                        user: doc.data().user
                    }))
                )
            }
            );
    }, 1000);
    setMessages([
    ]);
}, []);

	// useLayoutEffect(() => {
	// 	const unsubscribe = firestore().collection('chats').orderBy('createdAt', 'desc').onSnapshot((snapshot) =>
	// 		setMessages(
	// 			snapshot.docs.map((doc) => ({
	// 				_id: doc.data()._id,
	// 				createdAt: doc.data().createdAt.toDate(),
	// 				text: doc.data().text,
	// 				user: doc.data().user
	// 			}))
	// 		)
	// 	);
	// 	return unsubscribe;
	// }, []);

	

	// const onSend = useCallback((messages = []) => {
	// 	setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
	// 	const { _id, createdAt, text, user } = messages[0];
	// 	firestore().collection('chats').add({
	// 		_id,
	// 		createdAt,
	// 		text,
	// 		user
	// 	});
	// }, []);
    
    const onSend = useCallback((messages = []) => {
        setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
        const { _id, createdAt, text, user } = messages[0];

        firestore().collection('chats').add({
            _id,
            createdAt,
            text,
            user
        });
    }, []);

	

	return (
		<GiftedChat
			messages={messages}
			showAvatarForEveryMessage={true}
			onSend={(messages) => onSend(messages)}
			user={{
                _id: userID
			}}
		/>
	);
}

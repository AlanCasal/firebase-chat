import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Keyboard,
  ScrollView,
  EmitterSubscription,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import ChatRoomHeader from '@/src/features/Chat/ChatRoom/components/ChatRoomHeader/ChatRoomHeader';
import MessagesList from '@/src/components/Messages/MessageList/MessagesList';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Feather } from '@expo/vector-icons';
import CustomKeyboardView from '@/src/components/CustomKeyboardView';
import useAuthContext from '@/src/context/useAuthContext';
import { CustomUserData } from '@/src/context/types';
import { getRoomId } from '@/src/utils/common';
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { PRIMARY_RED, PRIMARY_RED_BG_TAILWIND } from '@/src/constants/Colors';

const ChatRoom = () => {
  const [inputMessage, setInputMessage] = useState('');
  const { user } = useAuthContext(); // current user
  const item = useLocalSearchParams<CustomUserData>(); // second user
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);
  const [messages, setMessages] = useState<DocumentData[]>([]);

  const createRoomIfNotExists = async () => {
    if (!user || !item) return;

    const roomId = getRoomId(user.userId, item.userId);

    await setDoc(doc(db, 'rooms', roomId), {
      roomId,
      createdAt: Timestamp.fromDate(new Date()),
    });
  };

  const handleSendMessage = async () => {
    const message = inputMessage.trim();
    if (!message || !user || !item) return;

    try {
      const roomId = getRoomId(user.userId, item.userId);

      const docRef = doc(db, 'rooms', roomId); // get document reference
      const messageRef = collection(docRef, 'messages'); // collection reference inside the document in the chat room
      if (inputMessage) setInputMessage('');

      // the new sent message
      await addDoc(messageRef, {
        userId: user?.userId,
        text: message,
        profileUrl: user?.profileUrl,
        username: user?.username,
        createdAt: Timestamp.fromDate(new Date()),
      });
    } catch (error) {
      Alert.alert('', (error as { message: string }).message);
    }
  };

  const updateScrollView = (delay = 0) => {
    // timeOut in case there's an incoming message
    setTimeout(() => {
      scrollViewRef?.current?.scrollToEnd({ animated: true });
    }, delay);
  };

  useEffect(() => {
    createRoomIfNotExists();

    let unsubscribe: () => void;
    let keyboardDidShowListener: EmitterSubscription;

    if (user) {
      const roomId = getRoomId(user.userId, item.userId);
      const docRef = doc(db, 'rooms', roomId);
      const messageRef = collection(docRef, 'messages');

      const q = query(messageRef, orderBy('createdAt', 'asc'));

      unsubscribe = onSnapshot(q, snapshot => {
        const allMessages = snapshot.docs.map(snapDoc => snapDoc.data());

        // every time we send or receive a message, messages list state will be updated
        setMessages(allMessages);
      });

      keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
        updateScrollView();
      });
    }

    return () => {
      unsubscribe();
      keyboardDidShowListener.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    updateScrollView();
  }, [messages]);

  return (
    <CustomKeyboardView inputFixedToBottom keyboardShouldPersistTaps='handled'>
      <View className='flex-1 bg-white'>
        <ChatRoomHeader user={item} router={router} />
        <View className='flex-1 justify-between bg-neutral-100 overflow-visible'>
          <View className='flex-1'>
            <MessagesList
              scrollViewRef={scrollViewRef}
              messages={messages}
              currentUser={user as CustomUserData}
            />
          </View>
          <View style={{ marginBottom: hp(1.7) }} className='pt-2'>
            <View className='flex-row mx-3 justify-between bg-white p-2 border border-neutral-300 rounded-full pl-5'>
              <TextInput
                onChangeText={value => setInputMessage(value)}
                value={inputMessage}
                placeholder='Type message...'
                placeholderTextColor='lightgray'
                style={{ fontSize: hp(2) }}
                className='flex-1 mr-2'
                cursorColor={PRIMARY_RED}
              />
              <TouchableOpacity
                onPress={handleSendMessage}
                disabled={!inputMessage.trim().length}
                className={`p-2 rounded-full ${
                  inputMessage.trim().length > 0
                    ? PRIMARY_RED_BG_TAILWIND
                    : 'bg-neutral-200'
                }`}
              >
                <Feather
                  name='send'
                  size={hp(2.7)}
                  color={inputMessage.trim().length > 0 ? 'white' : 'gray'}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
};

export default ChatRoom;

import { TouchableOpacity, View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Image } from 'expo-image';
import { BLUR_HASH, formatDate, getRoomId } from '@/src/utils/common';
import {
  collection,
  doc,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { CustomUserData } from '@/src/context/types';
import { Router } from 'expo-router';

type Props = {
  item: CustomUserData;
  currentUser: CustomUserData;
  router: Router;
  noBorder: boolean;
  index: number;
};

const ChatListItem = ({ item, router, noBorder, currentUser }: Props) => {
  const [lastMessage, setLastMessage] = useState<DocumentData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleOpenChatRoom = () => {
    router.push({ pathname: '/chatRoom', params: item });
  };

  const renderTime = () => {
    if (!lastMessage) return '';

    const date = lastMessage?.createdAt;
    return formatDate(new Date(date?.seconds * 1000));
  };

  const renderLastMessage = () => {
    if (isLoading) return 'Loading...';
    if (!lastMessage) return '- Say Hi 👋🏼';

    if (currentUser.userId === lastMessage.userId)
      return `You: ${lastMessage?.text}`; // last message sent by me

    return lastMessage?.text;
  };

  useEffect(() => {
    setIsLoading(true);
    const roomId = getRoomId(currentUser.userId, item.userId);
    const docRef = doc(db, 'rooms', roomId);
    const messageRef = collection(docRef, 'messages');

    const q = query(messageRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, snapshot => {
      const allMessages: DocumentData[] = snapshot.docs.map(snapDoc =>
        snapDoc.data()
      );

      setLastMessage(allMessages[0] ?? null);
      setIsLoading(false);
    });

    return unsubscribe;
  }, [currentUser.userId, item.userId]);

  return (
    <TouchableOpacity
      onPress={handleOpenChatRoom}
      className={`flex-row justify-between mx-4 items-center gap-3 mb-4 pb-2 ${
        noBorder ? '' : 'border-b border-b-neutral-200'
      }`}
    >
      <Image
        source={{ uri: item.profileUrl }}
        style={{ height: hp(6), aspectRatio: 1, borderRadius: 100 }}
        placeholder={BLUR_HASH}
        transition={500}
      />

      {/* name and last name */}
      <View className='flex-1 gap-1'>
        <View className='flex-row justify-between'>
          <Text
            style={{ fontSize: hp(1.8) }}
            className='font-semibold text-neutral-800'
          >
            {item.username}
          </Text>
          <Text
            style={{ fontSize: hp(1.6) }}
            className='font-medium text-neutral-500'
          >
            {renderTime()}
          </Text>
        </View>
        <Text
          style={{ fontSize: hp(1.6) }}
          className={`font-medium text-neutral-500 ${!lastMessage && 'italic font-semibold'}`}
        >
          {renderLastMessage()}{' '}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatListItem;

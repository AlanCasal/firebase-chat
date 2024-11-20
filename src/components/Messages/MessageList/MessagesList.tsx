import { ScrollView } from 'react-native';
import React from 'react';
import MessageItem from './components/MessageItem';
import { DocumentData } from 'firebase/firestore';
import { CustomUserData } from '@/src/context/types';

type Props = {
  messages: DocumentData[];
  currentUser: CustomUserData;
  scrollViewRef: React.RefObject<ScrollView>;
};

const MessagesList = ({ messages, currentUser, scrollViewRef }: Props) => {
  return (
    <ScrollView
      ref={scrollViewRef}
      contentContainerStyle={{ paddingTop: 10 }}
      showsVerticalScrollIndicator={false}
    >
      {/* to avoid error with FlatList */}
      {messages.length > 0 &&
        messages.map((message, index) => (
          <MessageItem
            message={message}
            currentUser={currentUser}
            key={`${message}${index}`}
          />
        ))}
    </ScrollView>
  );
};

export default MessagesList;

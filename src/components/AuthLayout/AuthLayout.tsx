import React from 'react';
import { Stack } from 'expo-router';
import ChatListHeader from '@/src/features/Chat/ChatList/components/ChatListHeader';

const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name='chatList'
        options={{
          header: () => <ChatListHeader />,
        }}
      />
    </Stack>
  );
};

export default AuthLayout;

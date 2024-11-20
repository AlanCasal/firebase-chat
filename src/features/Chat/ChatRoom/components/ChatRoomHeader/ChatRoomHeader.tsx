import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Stack, Router } from 'expo-router';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Image } from 'expo-image';
import { BLUR_HASH } from '@/src/utils/common';
import { CustomUserData } from '@/src/context/types';
import { PRIMARY_RED } from '@/src/constants/Colors';

type Props = {
  user: CustomUserData;
  router: Router;
};

const ChatRoomHeader = ({ user, router }: Props) => {
  const headerLeft = () => (
    <View className='flex-row items-center gap-4'>
      <TouchableOpacity onPress={() => router.back()}>
        <Entypo name='chevron-left' size={hp(4)} color='white' />
      </TouchableOpacity>
      <View className='flex-row items-center gap-3'>
        <Image
          source={{ uri: user.profileUrl }}
          style={{ height: hp(4.5), aspectRatio: 1, borderRadius: 100 }}
          placeholder={BLUR_HASH}
          transition={500}
        />
        <Text
          style={{ fontSize: hp(2.5) }}
          className='text-gray-200 font-medium'
        >
          {user?.username}
        </Text>
      </View>
    </View>
  );

  const headerRight = () => (
    <View className='flex-row items-center gap-8'>
      <Ionicons name={'call'} size={hp(2.8)} color={'gray'} />
      <Ionicons name={'videocam'} size={hp(2.8)} color={'gray'} />
    </View>
  );

  return (
    <Stack.Screen
      options={{
        title: '',
        headerShadowVisible: false,
        headerLeft,
        headerRight,
        header: () => (
          <View
            style={{
              backgroundColor: PRIMARY_RED,
              paddingTop: hp(6),
              paddingBottom: hp(2),
              paddingHorizontal: hp(2),
            }}
          >
            <View className='flex-row justify-between items-center'>
              {headerLeft()}
              {headerRight()}
            </View>
          </View>
        ),
      }}
    />
  );
};

export default ChatRoomHeader;

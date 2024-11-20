import React from 'react';
import { View, Text } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IS_IOS } from '@/src/utils/common';
import UserMenu from '../../../../../components/User/Menu/UserMenu';
import { Image } from 'expo-image';

const ChatListHeader = () => {
  const { top } = useSafeAreaInsets();

  return (
    <>
      <Image
        style={{
          height: hp(25),
          width: wp(100),
        }}
        source={require('@/assets/images/waves.png')}
      />
      <View
        style={{ paddingTop: IS_IOS ? top : top + 10 }}
        className={`flex-row justify-between px-5 absolute top-0 w-full`}
      >
        <View>
          <Text style={{ fontSize: hp(3) }} className='font-medium text-white'>
            Chats
          </Text>
        </View>

        <UserMenu />
      </View>
    </>
  );
};

export default ChatListHeader;

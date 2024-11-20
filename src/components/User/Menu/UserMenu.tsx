import { View } from 'react-native';
import React from 'react';
import { AntDesign, Feather } from '@expo/vector-icons';
import { Menu, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import MenuItem from './MenuItem';
import { MenuText } from './MenuItem/MenuItem';
import { Image } from 'expo-image';
import useAuthContext from '@/src/context/useAuthContext';
import { BLUR_HASH } from '@/src/utils/common';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Divider = () => {
  return <View className='p-[1px] w-full bg-neutral-100' />;
};

const UserMenu = () => {
  const { user, logout } = useAuthContext();

  const handleProfile = () => {
    // eslint-disable-next-line no-console
    console.log('profile');
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <View>
      <Menu>
        <MenuTrigger>
          <Image
            style={{
              height: hp(4.3),
              aspectRatio: 1,
              borderRadius: 100,
              borderWidth: 1,
              borderColor: 'white',
            }}
            source={user?.profileUrl}
            placeholder={{ blurhash: BLUR_HASH }}
            transition={500}
          />
        </MenuTrigger>
        <MenuOptions
          customStyles={{
            optionsContainer: {
              borderRadius: 10,
              borderCurve: 'continuous',
              marginTop: 40,
              marginLeft: -15,
              backgroundColor: 'white',
              shadowOpacity: 0.2,
              shadowOffset: { width: 0, height: 0 },
              width: 160,
            },
          }}
        >
          <MenuItem
            text={MenuText.PROFILE}
            action={handleProfile}
            icon={<Feather name='user' size={hp(2.5)} color='gray' />}
          />

          <Divider />

          <MenuItem
            text={MenuText.LOGOUT}
            action={handleLogout}
            icon={<AntDesign name='logout' size={hp(2.5)} color='gray' />}
          />
        </MenuOptions>
      </Menu>
    </View>
  );
};

export default UserMenu;

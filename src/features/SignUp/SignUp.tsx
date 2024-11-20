import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { Feather, Octicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import CustomKeyboardView from '@/src/components/CustomKeyboardView';
import useAuthContext from '@/src/context/useAuthContext';
import Loader from '@/src/components/Loader';
import {
  PRIMARY_RED_BG_TAILWIND,
  PRIMARY_RED_TEXT_TAILWIND,
} from '@/src/constants/Colors';

const SignUp = () => {
  const router = useRouter();
  const { register } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const usernameRef = useRef('');
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const profileRef = useRef('');

  const handleRegister = async () => {
    setLoading(true);

    const response = await register(
      emailRef.current,
      passwordRef.current,
      usernameRef.current,
      profileRef.current
    );
    setLoading(false);

    if (!response.success) Alert.alert('', response.error);
  };

  return (
    <>
      <Image
        style={{
          height: hp(25),
          width: wp(100),
        }}
        resizeMode='stretch'
        source={require('@/assets/images/waves.png')}
      />
      <Image
        style={{
          height: hp(10),
          width: wp(100),
          marginTop: -25,
        }}
        resizeMode='contain'
        source={require('@/assets/images/dragon.png')}
      />
      <CustomKeyboardView keyboardShouldPersistTaps='handled'>
        <StatusBar style='light' />
        <View
          style={{ paddingTop: hp(2), paddingHorizontal: wp(5) }}
          className='flex-1 gap-12 mb-5'
        >
          <View className='gap-10'>
            <Text
              style={{ fontSize: hp(4) }}
              className='font-bold tracking-wider text-center text-neutral-800'
            >
              Sign Up
            </Text>
            {/* inputs */}

            <View className='gap-4'>
              <View
                style={{ height: hp(7) }}
                className='flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl'
              >
                <Feather name='user' size={hp(2.7)} color='gray' />
                <TextInput
                  autoCapitalize='none'
                  onChangeText={value => (usernameRef.current = value)}
                  style={{ fontSize: hp(2) }}
                  className='flex-1 font-semibold text-neutral-700'
                  placeholder='Username'
                  placeholderTextColor={'gray'}
                />
              </View>
              <View
                style={{ height: hp(7) }}
                className='flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl'
              >
                <Octicons name='mail' size={hp(2.7)} color='gray' />
                <TextInput
                  autoCapitalize='none'
                  onChangeText={value => (emailRef.current = value)}
                  style={{ fontSize: hp(2) }}
                  className='flex-1 font-semibold text-neutral-700'
                  placeholder='Email Address'
                  placeholderTextColor={'gray'}
                />
              </View>
              <View
                style={{ height: hp(7) }}
                className='flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl'
              >
                <Octicons name='lock' size={hp(2.7)} color='gray' />
                <TextInput
                  autoCapitalize='none'
                  onChangeText={value => (passwordRef.current = value)}
                  style={{ fontSize: hp(2) }}
                  className='flex-1 font-semibold text-neutral-700'
                  placeholder='Password'
                  placeholderTextColor={'gray'}
                  secureTextEntry
                />
              </View>
              <View
                style={{ height: hp(7) }}
                className='flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl'
              >
                <Feather name='image' size={hp(2.7)} color='gray' />
                <TextInput
                  autoCapitalize='none'
                  onChangeText={value => (profileRef.current = value)}
                  style={{ fontSize: hp(2) }}
                  className='flex-1 font-semibold text-neutral-700'
                  placeholder='Profile url'
                  placeholderTextColor={'gray'}
                />
              </View>

              {/* submit btn */}
              <View>
                {loading ? (
                  <View className='flex-row justify-center'>
                    <Loader />
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={handleRegister}
                    style={{ height: hp(6.5) }}
                    className={`${PRIMARY_RED_BG_TAILWIND} rounded-xl justify-center items-center`}
                  >
                    <Text
                      style={{ fontSize: hp(2.7) }}
                      className='text-white font-bold tracking-wider'
                    >
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* sign up text */}
              <View className='flex-row justify-center'>
                <Text
                  style={{ fontSize: hp(1.8) }}
                  className='font-semibold text-neutral-500'
                >
                  Already have an account ?{' '}
                </Text>
                <Pressable onPress={() => router.push('/signIn')}>
                  <Text
                    style={{ fontSize: hp(1.8) }}
                    className={`font-bold ${PRIMARY_RED_TEXT_TAILWIND}`}
                  >
                    Sign In
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </CustomKeyboardView>
    </>
  );
};

export default SignUp;

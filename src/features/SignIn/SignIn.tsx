import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  Alert,
  Keyboard,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { Octicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import CustomKeyboardView from '@/src/components/CustomKeyboardView';
import useAuthContext from '@/src/context/useAuthContext';
import FormInput, { ICON_SIZE } from '@/src/components/FormInput';
import Loader from '@/src/components/Loader';
import FormSubmitButton from '@/src/components/FormSubmitButton';
import { updateScrollView } from '@/src/utils/common';
import { INPUT_COLOR, PRIMARY_RED_TEXT_TAILWIND } from '@/src/constants/Colors';

const SignIn = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthContext();

  const emailRef = useRef('');
  const passwordRef = useRef('');
  const scrollViewRef = useRef<ScrollView>(null);

  const handleLogin = async () => {
    setIsLoading(true);
    const response = await login(emailRef.current, passwordRef.current);
    setIsLoading(false);

    if (!response.success) Alert.alert('', response.error);
  };

  const handleOnChange = (value: string, name: string) => {
    const refList = {
      email: () => (emailRef.current = value),
      password: () => (passwordRef.current = value),
    }[name];

    refList?.();
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        updateScrollView({ scrollViewRef });
      }
    );

    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <>
      <Image
        style={{
          height: hp(20),
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
      <CustomKeyboardView
        scrollViewRef={scrollViewRef}
        keyboardShouldPersistTaps='handled'
      >
        <StatusBar style='light' />
        <ScrollView
          style={{
            paddingTop: hp(2),
            paddingHorizontal: wp(5),
          }}
          className='flex-1 gap-12 mb-5'
          keyboardShouldPersistTaps='handled'
        >
          <View className='gap-10'>
            <Text
              style={{ fontSize: hp(4) }}
              className='font-bold tracking-wider text-center text-neutral-800'
            >
              Sign In
            </Text>

            {/* inputs */}
            <View className='gap-4'>
              <FormInput
                handleOnChange={handleOnChange}
                placeholder='Email Address'
                name='email'
                icon={
                  <Octicons name='mail' size={ICON_SIZE} color={INPUT_COLOR} />
                }
                isEditable={!isLoading}
              />

              <FormInput
                handleOnChange={handleOnChange}
                placeholder='Password'
                name='password'
                secureTextEntry
                icon={
                  <Octicons name='lock' size={ICON_SIZE} color={INPUT_COLOR} />
                }
                isEditable={!isLoading}
              />

              {/* submit btn */}
              <View>
                {isLoading ? (
                  <View className='flex-row justify-center'>
                    <Loader />
                  </View>
                ) : (
                  <FormSubmitButton
                    buttonText='Sign In'
                    handleOnPress={handleLogin}
                  />
                )}
              </View>

              <View className='flex-row justify-center'>
                <Text
                  style={{ fontSize: hp(1.8) }}
                  className='font-semibold text-neutral-500'
                >
                  Don't have an account ?{' '}
                </Text>
                <Pressable onPress={() => router.push('/signUp')}>
                  <Text
                    style={{ fontSize: hp(1.8) }}
                    className={`font-bold ${PRIMARY_RED_TEXT_TAILWIND}`}
                  >
                    Sign Up
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </CustomKeyboardView>
    </>
  );
};

export default SignIn;

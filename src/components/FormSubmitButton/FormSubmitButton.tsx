import { Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

type Props = {
  handleOnPress: () => void;
  buttonText: string;
};

const FormSubmitButton: React.FC<Props> = ({ handleOnPress, buttonText }) => {
  return (
    <TouchableOpacity
      onPress={handleOnPress}
      style={{ height: hp(6.5) }}
      className='bg-red-600 rounded-xl justify-center items-center'
    >
      <Text
        style={{ fontSize: hp(2.7) }}
        className='text-white font-bold tracking-wider'
      >
        {buttonText}
      </Text>
    </TouchableOpacity>
  );
};

export default FormSubmitButton;

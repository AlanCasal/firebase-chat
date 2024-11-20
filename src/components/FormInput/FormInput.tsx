import { View, TextInput } from 'react-native';
import React from 'react';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { PRIMARY_RED } from '@/src/constants/Colors';

type Props = {
  handleOnChange: (value: string, name: string) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  name: string;
  secureTextEntry?: boolean;
  isEditable?: boolean;
};

export const ICON_SIZE = hp(2.7);

const FormInput: React.FC<Props> = ({
  handleOnChange,
  placeholder,
  icon,
  name,
  secureTextEntry = false,
  isEditable = true,
}) => {
  return (
    <View
      style={{ height: hp(7) }}
      className='flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl'
    >
      {icon && icon}
      <TextInput
        autoCapitalize='none'
        onChangeText={value => handleOnChange(value, name)}
        style={{ fontSize: hp(2) }}
        className='flex-1 font-semibold text-neutral-700'
        placeholder={placeholder}
        placeholderTextColor={'gray'}
        secureTextEntry={secureTextEntry}
        editable={isEditable}
        cursorColor={PRIMARY_RED}
      />
    </View>
  );
};

export default FormInput;

import {
  KeyboardAvoidingView,
  ScrollView,
  ScrollViewProps,
  ViewStyle,
} from 'react-native';
import React from 'react';
import { IS_IOS } from '@/src/utils/common';

type Props = {
  children: React.ReactNode;
  inputFixedToBottom?: boolean;
  keyboardShouldPersistTaps?: ScrollViewProps['keyboardShouldPersistTaps'];
  scrollViewContainerStyle?: ViewStyle;
  keyboardOffset?: number;
  scrollViewRef?: React.RefObject<ScrollView>;
};

const BEHAVIOR = IS_IOS ? 'padding' : 'height';

const CustomKeyboardView: React.FC<Props> = ({
  children,
  inputFixedToBottom,
  keyboardShouldPersistTaps = undefined,
  scrollViewContainerStyle,
  keyboardOffset,
  scrollViewRef,
}) => {
  let keyboardVerticalOffset = 0;
  let contentContainerStyle = {};

  if (inputFixedToBottom) {
    keyboardVerticalOffset = 90;
    contentContainerStyle = { flex: 1 };
  }

  if (scrollViewContainerStyle) {
    contentContainerStyle = {
      ...contentContainerStyle,
      ...scrollViewContainerStyle,
    };
  }

  if (keyboardOffset) {
    keyboardVerticalOffset = keyboardOffset;
  }

  return (
    <KeyboardAvoidingView
      behavior={BEHAVIOR}
      style={{ flex: 1 }}
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <ScrollView
        style={{ flex: 1 }}
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={contentContainerStyle}
        ref={scrollViewRef}
        keyboardShouldPersistTaps={keyboardShouldPersistTaps}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CustomKeyboardView;

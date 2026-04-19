import React from 'react';
import { Text, View } from 'react-native';
import styles from './Message.styles';

const Message = ({ sender, text }: any) => {
  return (
    <View
      style={[
        styles.messageContainer,
        sender === 'me' ? styles.messageRight : styles.messageLeft,
      ]}
    >
      <Text
        style={[
          styles.messageText,
          sender === 'me' ? styles.messageRightText : styles.messageLeftText,
        ]}
      >
        {text}
      </Text>
    </View>
  );
};

export default Message;

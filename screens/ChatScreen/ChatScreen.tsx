import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import Message from '@/components/Message/Message';
import React, { useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  View,
} from 'react-native';
import styles from './ChatScreen.styles';



const ChatScreen = () => {
  const [messages, setMessages] = useState<any[]>([
    { id: '1', text: 'Hi there!', sender: 'other' },
    { id: '2', text: 'Hello! How are you?', sender: 'me' },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage: any = {
      id: Date.now().toString(),
      text: input.trim(),
      sender: 'me',
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput('');
  };

  const renderItem = ({ item }: { item: any }) => (
    <Message sender={item.sender} text={item.text} />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={80}
      >
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.messagesList}
        />

        <View style={styles.inputContainer}>
          <Input
            placeholder='Type a message...'
            value={input}
            onChangeText={setInput}
            fullWidth={true}
          />
          <Button onPress={sendMessage}>Send</Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

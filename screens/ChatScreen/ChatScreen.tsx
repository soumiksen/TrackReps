import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import Message from '@/components/Message/Message';
import { getGeminiMsg } from '@/services/gemini';
import { useNavigation } from '@react-navigation/native';
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
  const navigation = useNavigation();

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage: any = {
      id: Date.now().toString(),
      text: input.trim(),
      sender: 'me',
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput('');

    const receiveMessageFromAI = await getGeminiMsg(input.trim());

    const newMessageAI: any = {
      id: Date.now().toString(),
      text: receiveMessageFromAI.text,
      sender: 'other',
      action: receiveMessageFromAI.hasAction
        ? {
            label: 'Generate Workout Plan',
            type: 'GENERATE_WORKOUT_PLAN',
            payload: await receiveMessageFromAI.actionData,
          }
        : null,
    };
    console.log('THIS: ', await receiveMessageFromAI.actionData);
    setMessages((prev) => [...prev, newMessageAI]);
  };

  const handleActionPress = (type: string, payload?: any) => {
    if (type === 'GENERATE_WORKOUT_PLAN') {
      navigation.navigate('routine/add', {
        payload: JSON.stringify(payload),
        hasPayload: true,
      });
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={{ marginBottom: 8 }}>
      <Message sender={item.sender} text={item.text} />
      {item.action && (
        <View style={styles.inlineButtonContainer}>
          <Button
            onPress={() =>
              handleActionPress(item.action.type, item.action?.payload)
            }
          >
            {item.action.label}
          </Button>
        </View>
      )}
    </View>
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

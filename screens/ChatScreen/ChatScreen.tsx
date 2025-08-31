import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import Message from '@/components/Message/Message';
import { getGeminiMsg } from '@/services/gemini';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';

import Container from '@/components/Container/Container';
import GradientBackground from '@/components/GradientBackground/GradientBackground';
import IconButton from '@/components/IconButton/IconButton';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { FlatList, KeyboardAvoidingView, Platform, View } from 'react-native';
import styles from './ChatScreen.styles';
import TypingIndicator from '@/components/Animations/TypingIndicator';

const ChatScreen = () => {
  const [messages, setMessages] = useState<any[]>([
    {
      id: '1',
      text: 'Hi! I am Reppy, your own AI gym assistant. How may I help you today?',
      sender: 'other',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const navigation = useNavigation();
  const tabBarHeight = useBottomTabBarHeight();
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage: any = {
      id: Date.now().toString(),
      text: input.trim(),
      sender: 'me',
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput('');
    setIsTyping(true);

    const receiveMessageFromAI = await getGeminiMsg(input.trim());
    setIsTyping(false);

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
    <View style={{marginTop: 16}}>
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
    <GradientBackground>
      <Container mode='chat' style={{ paddingBottom: tabBarHeight / 2 }}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={0}
        >
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.messagesList}
            keyboardShouldPersistTaps='handled'
          />
          {isTyping && (<TypingIndicator/>)}
          <View style={styles.inputContainer}>
            <Input
              placeholder='Type a message...'
              value={input}
              onChangeText={setInput}
              fullWidth
            />
            <IconButton
              style={{ marginLeft: 8 }}
              onPress={sendMessage}
              name='paper-plane'
            />
          </View>
        </KeyboardAvoidingView>
      </Container>
    </GradientBackground>
  );
};

export default ChatScreen;

import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';

const TypingIndicator = () => {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const createAnimation = (dot: Animated.Value, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(dot, {
            toValue: -6,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.delay(100),
        ])
      ).start();
    };

    createAnimation(dot1, 0);
    createAnimation(dot2, 150);
    createAnimation(dot3, 300);
  }, [dot1, dot2, dot3]);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingHorizontal: 10,
        paddingVertical: 16,
        backgroundColor: 'white',
        borderRadius: 10,
        alignSelf: 'flex-start',
        marginTop: 16,
        marginLeft: 16,
      }}
    >
      {[dot1, dot2, dot3].map((dot, i) => (
        <Animated.View
          key={i}
          style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: '#568FF8', // iOS blue
            marginHorizontal: 3,
            transform: [{ translateY: dot }],
          }}
        />
      ))}
    </View>
  );
};

export default TypingIndicator;

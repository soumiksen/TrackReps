import React, { ReactNode } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const { height: screenHeight } = Dimensions.get('window');

const SlideUpCard = ({
  visible,
  children,
}: {
  visible: boolean;
  children: ReactNode;
}) => {
  const translateY = useSharedValue(screenHeight);

  React.useEffect(() => {
    translateY.value = withTiming(visible ? 0 : screenHeight, {
      duration: 300,
    });
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white', // or whatever background you want
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '80%', // limits height if you want
    elevation: 10, // for Android shadow
    shadowColor: '#000', // for iOS shadow
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});

export default SlideUpCard;

import React, { ReactNode, useEffect, useState } from 'react';
import { View, LayoutChangeEvent } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const ExpandingButtonRow = ({
  showMenu,
  btn1,
  btn2,
}: {
  showMenu: boolean;
  btn1: ReactNode;
  btn2: ReactNode;
}) => {
  const [rowWidth, setRowWidth] = useState(0);
  const leftWidth = useSharedValue(0);

  const onLayout = (e: LayoutChangeEvent) => {
    const { width } = e.nativeEvent.layout;
    setRowWidth(width);
    leftWidth.value = width / 2; // start at half width
  };

  useEffect(() => {
    if (rowWidth === 0) return; // wait until layout measured

    if (showMenu) {
      leftWidth.value = withTiming(rowWidth, { duration: 500 });
    } else {
      leftWidth.value = withTiming(rowWidth / 2 - 5, { duration: 500 }); // -5 for gap
    }
  }, [showMenu, rowWidth]);

  const leftStyle = useAnimatedStyle(() => ({
    width: leftWidth.value,
  }));

  return (
    <View
      onLayout={onLayout}
      style={{
        flexDirection: 'row',
        width: '100%',
        gap: showMenu ? 0 : 10,
      }}
    >
      <Animated.View style={leftStyle}>{btn1}</Animated.View>
      {!showMenu && <View style={{ flex: 1 }}>{btn2}</View>}
    </View>
  );
};

export default ExpandingButtonRow;

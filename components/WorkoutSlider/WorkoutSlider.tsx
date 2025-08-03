import React from 'react';
import { FlatList, View } from 'react-native';
import WorkoutCard from '../WorkoutCard/WorkoutCard';
import styles from './WorkoutSlider.styles';

const CardSlider = ({ data, mode }: any) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        snapToAlignment='start'
        decelerationRate='fast'
        snapToInterval={300}
        renderItem={({ item }) => (
          <WorkoutCard
            title={item.title}
            time='1h 50m'
            volume='1000lbs'
            list={item.list}
            id={item.id}
            mode={mode}
          />
        )}
        contentContainerStyle={styles.content}
        ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
      />
    </View>
  );
};

export default CardSlider;

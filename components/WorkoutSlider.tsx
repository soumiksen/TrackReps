import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import WorkoutCard from './WorkoutCard';

const CardSlider = ({ data }) => {
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
            time={item.time}
            volume={item.volume}
            list={item.list}
          />
        )}
        contentContainerStyle={styles.content}
        ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
  content: {},
});

export default CardSlider;

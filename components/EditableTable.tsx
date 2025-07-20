import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

export default function EditableTable() {
  const [sets, setSets] = useState([
    { set: 1, reps: '', lbs: '' }
  ]);

  const handleAddSet = () => {
    setSets(prev => [
      ...prev,
      { set: prev.length + 1, reps: '', lbs: '' }
    ]);
  };

  const handleUpdateValue = (index, field, value) => {
    const updatedSets = [...sets];
    updatedSets[index][field] = value;
    setSets(updatedSets);
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.set}</Text>
      <TextInput
        style={[styles.cell, styles.input]}
        keyboardType="numeric"
        value={item.reps}
        onChangeText={(text) => handleUpdateValue(index, 'reps', text)}
        placeholder="Reps"
      />
      <TextInput
        style={[styles.cell, styles.input]}
        keyboardType="numeric"
        value={item.lbs}
        onChangeText={(text) => handleUpdateValue(index, 'lbs', text)}
        placeholder="Lbs"
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.row, styles.header]}>
        <Text style={styles.headerText}>Set</Text>
        <Text style={styles.headerText}>Reps</Text>
        <Text style={styles.headerText}>Lbs</Text>
      </View>

      {/* Rows */}
      <FlatList
        data={sets}
        keyExtractor={(item) => item.set.toString()}
        renderItem={renderItem}
      />

      {/* Add Set Button */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddSet}>
        <Text style={styles.addButtonText}>+ Add Set</Text>
      </TouchableOpacity>
    </View>
  );
}


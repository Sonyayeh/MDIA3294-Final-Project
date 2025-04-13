// Import react and useState from react
import React, { useState } from 'react';
// Import View, TextInput, FlatList, and StyleSheet from react-native
import { View, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
// Import Text, Button, and Icon from react-native-elements
import { Text, Button, Icon } from '@rneui/themed';

// ShoppingList
// A component that displays a shopping list
// It allows users to add new items, mark items as completed, and delete items
// It uses the useState hook to manage the list of items and the input value
// It uses FlatList to render the list of items
export default function ShoppingList() {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // Add a new item to the list
  const addItem = () => {
    if (inputValue.trim() !== '') {
      setItems((prevItems) => [
        ...prevItems,
        { id: Date.now().toString(), text: inputValue, completed: false },
      ]);
      setInputValue('');
    }
  };

  // Delete an item from the list
  const deleteItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Toggle item completion
  const toggleComplete = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <View style={styles.container}>
      {/* Input Field */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new item..."
          value={inputValue}
          onChangeText={setInputValue}
        />
        <Button title="Add" onPress={addItem} buttonStyle={styles.addButton} />
      </View>

      {/* Shopping List */}
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <TouchableOpacity onPress={() => toggleComplete(item.id)}>
              <Icon
                name={item.completed ? 'check-circle' : 'circle'}
                type="font-awesome"
                color={item.completed ? '#4CAF50' : '#ccc'}
                size={24}
                containerStyle={styles.icon}
              />
            </TouchableOpacity>
            <Text
              style={[
                styles.itemText,
                item.completed && styles.completedText,
              ]}
            >
              {item.text}
            </Text>
            <TouchableOpacity onPress={() => deleteItem(item.id)}>
              <Icon
                name="trash"
                type="font-awesome"
                color="#e76f51"
                size={24}
                containerStyle={styles.icon}
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F0F8FF',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#22577a',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  itemText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#4CAF50',
  },
  icon: {
    marginHorizontal: 10,
  },
});
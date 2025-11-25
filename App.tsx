import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

type Todo = {
  text: string;
  completed: boolean;
};

const STORAGE_KEY = 'todos';

export default function App() {

  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        if (json) setTodos(JSON.parse(json));
      } catch (e) { }
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (todo.trim() === "") return;
    setTodos([...todos, { text: todo, completed: false }]);
    setTodo('');
  };

  const toggleTodo = (index: number) => {
    const updated = [...todos];
    updated[index].completed = !updated[index].completed;
    setTodos(updated);
  };

  return (
    <View style={styles.container}>
      <Text>TodoList:</Text>

      <TextInput
        placeholder='Enter task'
        value={todo}
        onChangeText={setTodo}
        style={styles.input}
      />

      <Button title="Save" onPress={addTodo}/>

      <FlatList
        data={todos}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Text
            onPress={() => toggleTodo(index)}
            style={[
              styles.todoItem,
              item.completed && {
                textDecorationLine: 'line-through',
                textDecorationStyle: 'solid',
              }
            ]}
          >
            {index + 1}. {item.text}
          </Text>
        )}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: '80%',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  todoItem: {
    fontSize: 25,
    marginVertical: 5,
  }
});

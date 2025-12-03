import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList,TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useTodos, Todo } from './hooks/useTodos';

export default function App() {
  const [todo, setTodo] = useState<string>('')
  const { todos, addTodo, toggleTodo, removeTodo } = useTodos()

  const handleAdd = () => {
    addTodo(todo)
    setTodo('')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Simple Todo</Text>

      <TextInput
        placeholder="Add a new task"
        value={todo}
        onChangeText={setTodo}
        style={styles.input}
      />

      <Button title="Add" onPress={handleAdd} />

      <FlatList<Todo>
        style={{ width: '100%' }}
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.todoRow}>
            <TouchableOpacity onPress={() => toggleTodo(item.id)}>
              <Text
                style={[
                  styles.todoItem,
                  item.completed && {
                    textDecorationLine: 'line-through',
                    textDecorationStyle: 'solid',
                  },
                ]}
              >
                {index + 1}. {item.text}
              </Text>
            </TouchableOpacity>
            <Button title="Delete" onPress={() => removeTodo(item.id)} />
          </View>
        )}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: '80%',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  todoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    marginVertical: 6,
    paddingVertical: 4,
  },
  todoItem: {
    fontSize: 18,
    maxWidth: '80%',
  },
});

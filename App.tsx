import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet } from "react-native";

import useTodos from "./components/useTodos";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";


export default function App() {
  const { todo, todos, setTodo, addTodo, toggleTodo } = useTodos();

  return (
    <View style={styles.container}>
      <Text>Todo List</Text>

      <TodoInput
        value={todo}
        onChangeText={setTodo}
        onSubmit={addTodo}
      />

      <TodoList todos={todos} onToggle={toggleTodo} />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

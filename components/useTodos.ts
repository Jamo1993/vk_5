import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "todos";

export type Todo = {
  text: string;
  completed: boolean;
};

export default function useTodos() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    (async () => {
      const json = await AsyncStorage.getItem(STORAGE_KEY);
      if (json) setTodos(JSON.parse(json));
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!todo.trim()) return;
    setTodos([...todos, { text: todo, completed: false }]);
    setTodo("");
  };

  const toggleTodo = (index: number) => {
    const updated = [...todos];
    updated[index].completed = !updated[index].completed;
    setTodos(updated);
  };

  return { todo, todos, setTodo, addTodo, toggleTodo };
}

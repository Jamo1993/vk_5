import { useReducer } from 'react';

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
}

type Action =
  | { type: 'ADD'; text: string }
  | { type: 'TOGGLE'; id: string }
  | { type: 'REMOVE'; id: string }

function todosReducer(state: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case 'ADD':
      return [
        ...state,
        {
          id: Date.now().toString(),
          text: action.text,
          completed: false,
        },
      ]

    case 'TOGGLE':
      return state.map(todo =>
        todo.id === action.id
          ? { ...todo, completed: !todo.completed }
          : todo
      );

    case 'REMOVE':
      return state.filter(todo => todo.id !== action.id)

    default:
      return state;
  }
}

export function useTodos() {
  const [todos, dispatch] = useReducer(todosReducer, [])

  const addTodo = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    dispatch({ type: 'ADD', text: trimmed })
  }

  const toggleTodo = (id: string) => {
    dispatch({ type: 'TOGGLE', id })
  }

  const removeTodo = (id: string) => {
    dispatch({ type: 'REMOVE', id })
  }

  return { todos, addTodo, toggleTodo, removeTodo };
}

import { useState, useEffect } from 'react';
import { Todo, FilterType, SortType } from '../types/todo';

const STORAGE_KEY = 'react-todo-list';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<SortType>('date');
  const [searchTerm, setSearchTerm] = useState('');

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem(STORAGE_KEY);
    if (savedTodos) {
      try {
        const parsedTodos = JSON.parse(savedTodos).map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt)
        }));
        setTodos(parsedTodos);
      } catch (error) {
        console.error('Error loading todos from localStorage:', error);
      }
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string, priority: Todo['priority'] = 'medium', category: string = 'General') => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: text.trim(),
      completed: false,
      createdAt: new Date(),
      priority,
      category
    };
    setTodos(prev => [newTodo, ...prev]);
  };

  const toggleTodo = (id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const editTodo = (id: string, newText: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, text: newText.trim() } : todo
      )
    );
  };

  const clearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  };

  // Filter and sort todos
  const filteredAndSortedTodos = todos
    .filter(todo => {
      // Apply filter
      if (filter === 'active') return !todo.completed;
      if (filter === 'completed') return todo.completed;
      return true;
    })
    .filter(todo => {
      // Apply search
      if (!searchTerm) return true;
      return todo.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
             todo.category.toLowerCase().includes(searchTerm.toLowerCase());
    })
    .sort((a, b) => {
      // Apply sorting
      switch (sortBy) {
        case 'alphabetical':
          return a.text.localeCompare(b.text);
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'date':
        default:
          return b.createdAt.getTime() - a.createdAt.getTime();
      }
    });

  const stats = {
    total: todos.length,
    completed: todos.filter(todo => todo.completed).length,
    active: todos.filter(todo => !todo.completed).length
  };

  return {
    todos: filteredAndSortedTodos,
    filter,
    setFilter,
    sortBy,
    setSortBy,
    searchTerm,
    setSearchTerm,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    stats
  };
}
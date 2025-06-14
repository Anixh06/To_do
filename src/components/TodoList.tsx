import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Todo } from '../types/todo';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

export function TodoList({ todos, onToggle, onDelete, onEdit }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-12 text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-gray-300 mb-4" />
        <h3 className="text-xl font-medium text-gray-500 mb-2">No tasks found</h3>
        <p className="text-gray-400">Add a new task to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
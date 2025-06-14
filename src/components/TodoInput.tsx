import React, { useState } from 'react';
import { Plus, AlertCircle } from 'lucide-react';
import { Todo } from '../types/todo';

interface TodoInputProps {
  onAddTodo: (text: string, priority: Todo['priority'], category: string) => void;
}

export function TodoInput({ onAddTodo }: TodoInputProps) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Todo['priority']>('medium');
  const [category, setCategory] = useState('General');
  const [error, setError] = useState('');

  const categories = ['General', 'Work', 'Personal', 'Shopping', 'Health'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!text.trim()) {
      setError('Task cannot be empty');
      return;
    }
    
    if (text.trim().length < 3) {
      setError('Task must be at least 3 characters long');
      return;
    }

    if (text.trim().length > 100) {
      setError('Task cannot exceed 100 characters');
      return;
    }

    onAddTodo(text, priority, category);
    setText('');
    setError('');
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    if (error) setError('');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={text}
            onChange={handleTextChange}
            placeholder="What needs to be done?"
            className={`w-full px-4 py-3 text-lg border-2 rounded-lg focus:outline-none focus:ring-2 transition-colors ${
              error 
                ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
            }`}
            maxLength={100}
          />
          {error && (
            <div className="flex items-center mt-2 text-red-600">
              <AlertCircle size={16} className="mr-1" />
              <span className="text-sm">{error}</span>
            </div>
          )}
          <div className="text-right text-xs text-gray-400 mt-1">
            {text.length}/100
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-32">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as Todo['priority'])}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="flex-1 min-w-32">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              disabled={!text.trim() || !!error}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              <Plus size={18} />
              Add Task
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
import React, { useState } from 'react';
import { Check, X, Edit2, Save, XCircle } from 'lucide-react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [error, setError] = useState('');

  const priorityColors = {
    high: 'border-l-red-500 bg-red-50',
    medium: 'border-l-yellow-500 bg-yellow-50',
    low: 'border-l-green-500 bg-green-50'
  };

  const priorityBadgeColors = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800'
  };

  const handleEdit = () => {
    if (!editText.trim()) {
      setError('Task cannot be empty');
      return;
    }
    
    if (editText.trim().length < 3) {
      setError('Task must be at least 3 characters long');
      return;
    }

    if (editText.trim().length > 100) {
      setError('Task cannot exceed 100 characters');
      return;
    }

    onEdit(todo.id, editText);
    setIsEditing(false);
    setError('');
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
    setError('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-md border-l-4 p-4 transition-all hover:shadow-lg ${priorityColors[todo.priority]} ${todo.completed ? 'opacity-75' : ''}`}>
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggle(todo.id)}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
            todo.completed
              ? 'bg-green-500 border-green-500 text-white'
              : 'border-gray-300 hover:border-green-500'
          }`}
        >
          {todo.completed && <Check size={14} />}
        </button>

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="space-y-2">
              <input
                type="text"
                value={editText}
                onChange={(e) => {
                  setEditText(e.target.value);
                  if (error) setError('');
                }}
                onKeyDown={handleKeyPress}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  error 
                    ? 'border-red-300 focus:ring-red-200' 
                    : 'border-gray-200 focus:ring-blue-200'
                }`}
                maxLength={100}
                autoFocus
              />
              {error && (
                <p className="text-red-600 text-sm">{error}</p>
              )}
              <div className="text-right text-xs text-gray-400">
                {editText.length}/100
              </div>
            </div>
          ) : (
            <div>
              <p className={`text-lg ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                {todo.text}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityBadgeColors[todo.priority]}`}>
                  {todo.priority}
                </span>
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                  {todo.category}
                </span>
                <span className="text-xs text-gray-500">
                  {todo.createdAt.toLocaleDateString()}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1">
          {isEditing ? (
            <>
              <button
                onClick={handleEdit}
                disabled={!!error || !editText.trim()}
                className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors disabled:opacity-50"
              >
                <Save size={16} />
              </button>
              <button
                onClick={handleCancel}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XCircle size={16} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                disabled={todo.completed}
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={() => onDelete(todo.id)}
                className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
              >
                <X size={16} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
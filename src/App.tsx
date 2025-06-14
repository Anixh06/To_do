import React from 'react';
import { CheckSquare } from 'lucide-react';
import { useTodos } from './hooks/useTodos';
import { TodoInput } from './components/TodoInput';
import { TodoFilters } from './components/TodoFilters';
import { TodoList } from './components/TodoList';

function App() {
  const {
    todos,
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
  } = useTodos();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CheckSquare className="h-10 w-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-800">Todo List</h1>
          </div>
          <p className="text-gray-600 text-lg">Stay organized and get things done</p>
        </div>

        {/* Todo Input */}
        <TodoInput onAddTodo={addTodo} />

        {/* Filters */}
        <TodoFilters
          filter={filter}
          setFilter={setFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onClearCompleted={clearCompleted}
          stats={stats}
        />

        {/* Todo List */}
        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500">
          <p>Built with React, TypeScript, and Tailwind CSS</p>
          <p className="text-sm mt-2">Data is automatically saved to your browser's local storage</p>
        </div>
      </div>
    </div>
  );
}

export default App;
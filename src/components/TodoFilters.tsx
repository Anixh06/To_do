import React from 'react';
import { Search, Filter, SortAsc, Trash2 } from 'lucide-react';
import { FilterType, SortType } from '../types/todo';

interface TodoFiltersProps {
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
  sortBy: SortType;
  setSortBy: (sort: SortType) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onClearCompleted: () => void;
  stats: {
    total: number;
    completed: number;
    active: number;
  };
}

export function TodoFilters({
  filter,
  setFilter,
  sortBy,
  setSortBy,
  searchTerm,
  setSearchTerm,
  onClearCompleted,
  stats
}: TodoFiltersProps) {
  const filterButtons: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'completed', label: 'Completed' }
  ];

  const sortOptions: { key: SortType; label: string }[] = [
    { key: 'date', label: 'Date Created' },
    { key: 'priority', label: 'Priority' },
    { key: 'alphabetical', label: 'Alphabetical' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
          <div className="text-sm text-blue-600">Total</div>
        </div>
        <div className="text-center p-3 bg-yellow-50 rounded-lg">
          <div className="text-2xl font-bold text-yellow-600">{stats.active}</div>
          <div className="text-sm text-yellow-600">Active</div>
        </div>
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
          <div className="text-sm text-green-600">Completed</div>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-gray-600" />
          <div className="flex bg-gray-100 rounded-lg p-1">
            {filterButtons.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  filter === key
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <SortAsc size={18} className="text-gray-600" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortType)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            >
              {sortOptions.map(({ key, label }) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>

          {stats.completed > 0 && (
            <button
              onClick={onClearCompleted}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 size={16} />
              Clear Completed
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  priority: 'low' | 'medium' | 'high';
  category: string;
}

export type FilterType = 'all' | 'active' | 'completed';
export type SortType = 'date' | 'priority' | 'alphabetical';
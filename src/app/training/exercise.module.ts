

export interface Exercise {
  id: string;
  name: string;
  duration: number;
  calories: number;
  date?: Date | null;
  state?: 'Completed' | 'Cancelled' | null;
}

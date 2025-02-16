export type Ticket = {
  priority: number;
  workflow: number;
  title: string;
  description: string;
  notes?: string;
  id: string;
};

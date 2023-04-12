export interface Task
{
  id?: number;
  name: string;
  description: string;
  user?: string;
  idCategory?: string,
  category: any;
}

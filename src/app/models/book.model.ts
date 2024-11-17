export interface Book {
  id: string;
  name: string;
  recipes: { id: string; title: string }[];
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  date: Date;
  category: string;
  comments?: Comment[];
  ratings?: number[];
  averageRating?: number;
}

export interface Comment {
  text: string;
  author: string;
}

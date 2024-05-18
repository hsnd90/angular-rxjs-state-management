export interface Category {
  _id?: string;
  Name: string;
  Parent?: Category;
}

export interface Categories {
  categories: Category[];
}

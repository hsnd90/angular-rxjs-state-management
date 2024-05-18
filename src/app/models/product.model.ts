import { Category } from './category.model';

export interface Product {
  _id?: string;
  id?: number;
  Name: string;
  Code: string;
  UnitPrice: number;
  Category: Category | any;
  QuantitySold?: number;
}

import { Product } from './product.model';

export interface Basket {
  productid: number;
  quantity: number;
  product?: Product;
}

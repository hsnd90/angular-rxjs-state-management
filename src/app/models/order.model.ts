import { Basket } from './basket.model';
import { Product } from './product.model';

export interface Order {
  id?: number;
  address: string;
  totalPrice: number;
  baskets: Basket[];
}

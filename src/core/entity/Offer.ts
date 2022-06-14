import { v4 as uuidv4 } from 'uuid';
import { Product } from './Product';

export class Offer {
  readonly id: string;

  product: Product;
  quantity: number;
  affectedProduct: Product;
  discountApplied: number;

  constructor(product: Omit<Offer, 'id'>, id?: string) {
    Object.assign(this, product);

    if (!id) {
      this.id = uuidv4();
    }
  }
}

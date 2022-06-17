export class Offer {
  productName: string;
  discount: number;
  quantity?: number;
  affectedProductName?: string;

  constructor(offer: Offer) {
    Object.assign(this, offer);
  }
}

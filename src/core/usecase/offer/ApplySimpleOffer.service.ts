import { Service } from "typedi";
import { IOfferStrategy } from "../../../adapters/offer/ports/IOfferStrategy";
import { Offer } from "../../entity/Offer";
import { Order } from "../../entity/Order";
import { OrderEvent } from "../../entity/OrderEvent";
import { OrderItem } from "../../entity/OrderItem";

@Service()
export class ApplySimpleOffer implements IOfferStrategy {
  execute(order: Order, offers: Offer[]): number {
    const { orderItems } = order;
    return offers.reduce((totalDiscount, offer) => {
      return totalDiscount + this.getTotalOrderDiscount(orderItems, offer);
    }, 0);
  }

  private getTotalOrderDiscount(orderItems: OrderItem[], offer: Offer) {
    return orderItems.reduce((productDiscount, orderItem) => {
      const { product, quantity } = orderItem;
      if (product.name === offer.productName) {
        const productPriceWithDiscount = product.price * offer.discount;
        const totalProductPriceWithDiscount =
          productDiscount + productPriceWithDiscount * quantity;
        OrderEvent.getInstance().addDiscount(
          product.name,
          offer.discount,
          totalProductPriceWithDiscount
        );
        return totalProductPriceWithDiscount;
      }
      return productDiscount;
    }, 0);
  }
}

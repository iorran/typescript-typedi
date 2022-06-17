import { Service } from "typedi";
import { IOfferStrategy } from "../../../adapters/offer/ports/IOfferStrategy";
import { Offer } from "../../entity/Offer";
import { Order } from "../../entity/Order";
import { OrderEvent } from "../../entity/OrderEvent";

@Service()
export class ApplyComplexOffer implements IOfferStrategy {
  execute(order: Order, offers: Offer[]): number {
    let convertedSimpleOffers: Record<number, Offer> = {};
    const { orderItems } = order;

    offers.forEach((offer) => {
      orderItems.forEach((orderItem) => {
        const { quantity, product } = orderItem;
        const offersAvailable = Math.floor(quantity / offer.quantity);
        if (product.name === offer.productName && offersAvailable > 0) {
          convertedSimpleOffers = {
            ...convertedSimpleOffers,
            [offersAvailable]: new Offer({
              discount: offer.discount,
              productName: offer.affectedProductName,
            }),
          };
        }
      });
    });

    return Object.entries(convertedSimpleOffers).reduce<number>(
      (discount, convertedSimpleOffer) => {
        const [limit, offer] = convertedSimpleOffer;
        return (
          (discount || 0) +
          orderItems.reduce<number>((productDiscount, orderItem) => {
            const { product } = orderItem;
            if (product.name === offer.productName) {
              const productPriceWithDiscount = product.price * offer.discount;
              const totalProductPriceWithDiscount =
                productDiscount + productPriceWithDiscount * Number(limit);
              OrderEvent.getInstance().addDiscount(
                product.name,
                offer.discount,
                totalProductPriceWithDiscount
              );
              return totalProductPriceWithDiscount;
            }
            return productDiscount;
          }, 0)
        );
      },
      0
    );
  }
}

import { Service } from "typedi";
import { Offer } from "../../../core/entity/Offer";
import { IOfferRepository } from "../../../core/usecase/offer/ports/IOfferRepository";

const offers: Offer[] = [
  {
    productName: "Apples",
    discount: 0.1,
  },
  {
    productName: "Soup",
    quantity: 2,
    discount: 0.5,
    affectedProductName: "Bread",
  },
];

@Service()
export class InMemoryOfferRepository implements IOfferRepository {
  findAllByProductNamesIn(productNames: string[]): Offer[] {
    return offers.filter((offer) => productNames.includes(offer.productName));
  }
}

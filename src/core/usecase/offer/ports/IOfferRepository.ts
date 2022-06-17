import { Offer } from "../../../entity/Offer";

export interface IOfferRepository {
  findAllByProductNamesIn(productNames: string[]): Offer[];
}

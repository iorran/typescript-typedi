import { Offer } from "../../../core/entity/Offer";
import { Order } from "../../../core/entity/Order";

export interface IOfferStrategy {
  execute(order: Order, offers: Offer[]): number;
}

import { Order } from "../../../core/entity/Order";

export interface IOfferApplierService {
  execute(order: Order): number;
}

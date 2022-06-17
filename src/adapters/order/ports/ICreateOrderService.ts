import { Order } from "../../../core/entity/Order";

export interface ICreateOrderService {
  execute(products: string[]): Order;
}

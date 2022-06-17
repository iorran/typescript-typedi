import { Service } from "typedi";
import { ICreateOrderService } from "../../../adapters/order/ports/ICreateOrderService";
import { Order } from "../../entity/Order";
import { OrderEvent } from "../../entity/OrderEvent";
import { ApplyOfferService } from "../offer/OfferApplier.service";
import { FindAvailableProductsService } from "../product/FindAvailableProducts.service";

@Service()
export class CreateOrderService implements ICreateOrderService {
  constructor(
    protected findAvailableProductsService: FindAvailableProductsService,
    protected offerApplierService: ApplyOfferService
  ) {}

  execute(items: string[]): Order {
    const productsFound = this.findAvailableProductsService.execute(items);

    const order = new Order(items, productsFound);

    order.total = this.offerApplierService.execute(order);

    OrderEvent.getInstance().closeOrder(order);

    return order;
  }
}

import { Service } from "typedi";
import { CreateOrderValidator } from "../../../adapters/order/validators/CreateOrder.validator";
import { OrderEvent } from "../../../core/entity/OrderEvent";
import { CreateOrderService } from "../../../core/usecase/order/CreateOrder.service";

@Service()
export class OrderController {
  constructor(protected createOrderService: CreateOrderService) {}

  createOrder(items: string) {
    try {
      const products = CreateOrderValidator.validate(items);
      this.createOrderService.execute(products);
      OrderEvent.getInstance().print();
    } catch (error) {
      console.log(error.message);
    }
  }
}

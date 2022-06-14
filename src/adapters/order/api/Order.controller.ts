import { Service } from "typedi";
import { CreateOrderService } from "../../../core/usecase/order/CreateOrder.service"; 
import { CreateOrderValidator } from "../../../adapters/order/validators/CreateOrder.validator";

@Service()
export class OrderController {
  constructor(protected createOrderService: CreateOrderService) {} 
  
  createOrder(items: string) {  
    try{
      const products = CreateOrderValidator.validate(items)
      this.createOrderService.execute(products)   
    } catch (error) {
      console.log(error.message)
    } 
  }
}

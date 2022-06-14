import { ICreateOrderService } from "src/adapters/order/ports/ICreateOrderService";
import { Service } from "typedi"; 

@Service()
export class CreateOrderService implements ICreateOrderService { 

  execute(products: string[]): string { 
    return "ola"
  }  
}

import { Service } from "typedi";
import readline from 'readline';
import { OrderController } from "./adapters/order/api/Order.controller";

@Service()
export class App {
    constructor(protected orderController: OrderController) {} 

    async start() {
        function waitForProducts(query: string): Promise<string> {
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
            });
        
            return new Promise(resolve => rl.question(query, (input: string) => {
                rl.close();
                resolve(input);
            }))
        }
    
        while(true) { 
            const input = await waitForProducts("PriceBasket "); 
            
            this.orderController.createOrder(input) 
        }
    }
}
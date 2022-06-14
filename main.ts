import 'reflect-metadata';
import { Container } from 'typedi';    

import { App } from './src/App'
 
async function bootstrap() {
    const app = Container.get(App)
    app.start()
}
bootstrap();
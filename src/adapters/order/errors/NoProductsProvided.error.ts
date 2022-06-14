export class NoProductsProvidedError extends Error {
    constructor(){
        super("You must provide at least one product")
    }
}
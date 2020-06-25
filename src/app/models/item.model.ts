import { Product } from './product.model'

export class Item {
    product: Product
    quantity: number
    price: number

    constructor(product: Product, quantity: number, price: number)
    {
        this.product = product
        this.quantity = quantity
        this.price = this.product.price * this.quantity
    }
}
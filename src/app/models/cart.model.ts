import { Item } from './item.model'

export class Cart {
    items: Item[]
    itemCount: number
    totalPrice: number

    constructor()
    {
        this.items = []
        this.itemCount = 0
        this.totalPrice = 0
    }
}
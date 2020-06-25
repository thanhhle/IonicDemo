import { Item } from './item.model'
import { BehaviorSubject } from 'rxjs'

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
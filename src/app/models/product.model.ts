export class Product
{
    model: string
    name: string   
    imageURL: string
    price: number
    
    constructor(model: string, name: string, imageURL: string, price: number)
    {
        this.model = model
        this.name = name  
        this.imageURL = imageURL
        this.price = price
    }
}
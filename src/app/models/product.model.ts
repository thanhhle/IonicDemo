export class Product
{
    model: string
    name: string   
    imageURL: string
    description: string
    price: number
    
    constructor(model: string, name: string, imageURL: string, description: string, price: number)
    {
        this.model = model
        this.name = name  
        this.imageURL = imageURL
        this.description = description
        this.price = price
    }
}
export class Product
{
    name: string   
    imageURL: string
    description: string
    price: number
    
    constructor(name: string, imageURL: string, description: string, price: number)
    {
        this.name = name  
        this.imageURL = imageURL
        this.description = description
        this.price = price
    }
}
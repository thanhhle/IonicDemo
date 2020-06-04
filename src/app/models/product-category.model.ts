export class ProductCategory {
    name: string
    path: string
    titleImageURL: string
    
    constructor(name: string, path: string, titleImageURL: string)
    {
        this.name = name
        this.path = path
        this.titleImageURL = titleImageURL
    }
}
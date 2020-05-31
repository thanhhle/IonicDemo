export class BeautyTip {
    id: string
    author: string
    title: string
    description: string
    createdDate: Date
    lastUpdatedDate: Date

    constructor(id: string, author: string, title: string, description: string, createdDate?: Date, lastUpdatedDate?: Date)
    {
        this.id = id
        this.author = author
        this.title = title
        this.description = description
        this.createdDate = createdDate ? createdDate : new Date()
        this.lastUpdatedDate = lastUpdatedDate ? lastUpdatedDate : new Date()
    }
}
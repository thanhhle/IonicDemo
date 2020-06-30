export class User {
    uid: string
    email: string
    role: string
    firstName: string
    lastName: string
    createdDate: Date
    lastSignInDate: Date
    lastActiveDate: Date
    beautyTipIDs: string[]

    constructor(uid: string, email: string, firstName: string, lastName: string, role?: string, createdDate?: Date, lastSignInDate?: Date, lastActiveDate?: Date, beautyTipIDs?: string[])
    {
        this.uid = uid
        this.email = email
        this.firstName = firstName
        this.lastName = lastName
        this.role = role ? role : 'user'
        this.createdDate = createdDate ? createdDate : new Date()
        this.lastSignInDate = lastSignInDate ? lastSignInDate : new Date()
        this.lastActiveDate = lastActiveDate ? lastActiveDate : new Date()
        this.beautyTipIDs = beautyTipIDs ? beautyTipIDs : []
    }
}

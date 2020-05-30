import * as firebase from 'firebase/app';
import 'firebase/firestore';

export class BeautyTip {
    id: string
    author: string
    title: string
    description: string
    createdDate: Date
    lastEditDate: Date

    constructor
    (
        id: string,
        author: string,
        title: string,
        description: string,
        createdDate: Date,
        lastEditDate: Date
    ){}

    toString(): string
    {
        return this.id + this.author
    } 
}

/*
const beautyTipConverter = {
    toFirestore(beautyTip: BeautyTip): firebase.firestore.DocumentData 
    {
        return 
        {
            id: beautyTip.id,
            author: beautyTip.author,
            title: beautyTip.title,
            description: beautyTip.description,
            createdDate: beautyTip.createdDate,
            lastEditDate: beautyTip.lastEditDate,
        }
    },

    fromFirestore
    (
        snapshot: firebase.firestore.QueryDocumentSnapshot,
        options: firebase.firestore.SnapshotOptions
    ): BeautyTip
    {
        const data = snapshot.data(options)!
        return new BeautyTip(data.id, data.author, data.title, data.description, data.createdDate, data.lastEditDate)
    }
}
*/
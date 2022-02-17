export type Book = {
    _id:string,
    name:string,
    author:{name:string,country:string,intro:string},
    publisher:string,
    producer:string,
    intro:string,
    cover:string,
    ISBN:string,
    publishTime:string,
    translator:string,
    series:string,
    rate:number

}
export type Author = {
    name:string,
    country:string,
    intro:string,
    _id:string,
    nobel:number,
    photo:string,
    birthday:string,
    deathday:string,
    books:Array<Book>
}
export type User = {
    userName:string,
    avatar:string,
    background:string,
    signature:string,
    city:string,
    gender:number,
    province:string
}